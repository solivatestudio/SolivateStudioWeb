import {
  CMS_RESOURCE_TYPES,
  seedCmsResourceDefaults,
} from "../_lib/cms-defaults.js";
import { db, ensureSchema } from "../_lib/db.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);

  try {
    await ensureSchema();
    const sql = db();
    const requested = String(request.query?.type || "").trim();
    const types = CMS_RESOURCE_TYPES.has(requested)
      ? [requested]
      : [...CMS_RESOURCE_TYPES];

    await Promise.all(types.map((type) => seedCmsResourceDefaults(sql, type)));

    const rows = await sql`
      SELECT resource_type, id, sort_order, data, is_published, updated_at
      FROM cms_resources
      WHERE is_published = TRUE AND resource_type = ANY(${types})
      ORDER BY resource_type ASC, sort_order ASC, created_at ASC
    `;

    const resources = Object.fromEntries(types.map((type) => [type, []]));
    rows.forEach((row) => {
      resources[row.resource_type]?.push({
        id: row.id,
        sort_order: row.sort_order,
        data: row.data,
        updated_at: row.updated_at,
      });
    });

    response.setHeader(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=300",
    );
    return response.status(200).json({ resources });
  } catch (error) {
    return fail(response, error);
  }
}
