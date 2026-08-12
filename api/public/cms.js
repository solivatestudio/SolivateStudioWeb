import { CAMPAIGN_DEFAULTS, CAMPAIGN_KEY, normalizeCampaign } from "../_lib/campaign.js";
import { db, ensureSchema } from "../_lib/db.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);
  try {
    await ensureSchema();
    const sql = db();
    const rows = await sql`SELECT key, value FROM cms_entries WHERE status = 'published'`;
    const entries = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    response.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response.status(200).json({
      entries,
      campaign: normalizeCampaign(entries[CAMPAIGN_KEY] || CAMPAIGN_DEFAULTS)
    });
  } catch (error) {
    return fail(response, error);
  }
}
