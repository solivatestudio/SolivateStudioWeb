import { CAMPAIGN_DEFAULTS, CAMPAIGN_KEY, normalizeCampaign } from "../_lib/campaign.js";
import { requireAdmin } from "../_lib/auth.js";
import { audit, db, ensureSchema } from "../_lib/db.js";
import { fail, jsonBody, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  const session = requireAdmin(request, response);
  if (!session) return;
  if (!["GET", "PUT"].includes(request.method)) return methodNotAllowed(response, ["GET", "PUT"]);

  try {
    await ensureSchema();
    const sql = db();

    if (request.method === "GET") {
      const [row] = await sql`SELECT value, updated_at FROM cms_entries WHERE key = ${CAMPAIGN_KEY} LIMIT 1`;
      return response.status(200).json({
        campaign: normalizeCampaign(row?.value || CAMPAIGN_DEFAULTS),
        updated_at: row?.updated_at || null,
      });
    }

    const campaign = normalizeCampaign(jsonBody(request));
    await sql`
      INSERT INTO cms_entries (key, value, status, updated_at)
      VALUES (${CAMPAIGN_KEY}, ${JSON.stringify(campaign)}, 'published', NOW())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, status = 'published', updated_at = NOW()
    `;
    await audit(session.username, "update", "cms_campaign", CAMPAIGN_KEY);
    return response.status(200).json({ ok: true, campaign });
  } catch (error) {
    return fail(response, error);
  }
}
