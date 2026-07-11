import { db, ensureSchema } from "../_lib/db.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);
  try {
    await ensureSchema();
    const sql = db();
    const rows = await sql`SELECT key, value FROM cms_entries WHERE status = 'published'`;
    response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return response.status(200).json({ entries: Object.fromEntries(rows.map((row) => [row.key, row.value])) });
  } catch (error) {
    return fail(response, error);
  }
}
