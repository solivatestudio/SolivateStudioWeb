import { CAMPAIGN_DEFAULTS, CAMPAIGN_KEY, normalizeCampaign } from "../_lib/campaign.js";
import { db, ensureSchema } from "../_lib/db.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);
  try {
    await ensureSchema();
    const sql = db();
    const [row] = await sql`SELECT value FROM cms_entries WHERE key = ${CAMPAIGN_KEY} AND status = 'published' LIMIT 1`;
    response.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response.status(200).json({ campaign: normalizeCampaign(row?.value || CAMPAIGN_DEFAULTS) });
  } catch (error) {
    return fail(response, error);
  }
}
