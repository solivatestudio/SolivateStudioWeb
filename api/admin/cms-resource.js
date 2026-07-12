import crypto from "node:crypto";
import {
  CMS_RESOURCE_TYPES,
  normalizeCmsResource,
  seedCmsResourceDefaults,
} from "../_lib/cms-defaults.js";
import { requireAdmin } from "../_lib/auth.js";
import { audit, db, ensureSchema } from "../_lib/db.js";
import { fail, jsonBody, methodNotAllowed } from "../_lib/http.js";

const cleanId = (value) =>
  String(value ?? "")
    .trim()
    .slice(0, 120);

export default async function handler(request, response) {
  const session = requireAdmin(request, response);
  if (!session) return;
  if (!["GET", "POST", "PUT", "DELETE"].includes(request.method)) {
    return methodNotAllowed(response, ["GET", "POST", "PUT", "DELETE"]);
  }

  try {
    await ensureSchema();
    const sql = db();
    const type = String(request.query?.type || "").trim();
    if (!CMS_RESOURCE_TYPES.has(type)) {
      return response
        .status(400)
        .json({ message: "Resource CMS tidak valid." });
    }

    await seedCmsResourceDefaults(sql, type);

    if (request.method === "GET") {
      const items = await sql`
        SELECT id, sort_order, data, is_published, created_at, updated_at
        FROM cms_resources
        WHERE resource_type = ${type}
        ORDER BY sort_order ASC, created_at ASC
      `;
      return response.status(200).json({ items });
    }

    const body = jsonBody(request);
    const id = cleanId(body.id) || crypto.randomUUID();

    if (request.method === "DELETE") {
      await sql`DELETE FROM cms_resources WHERE id = ${id} AND resource_type = ${type}`;
      await audit(session.username, "delete", `cms_${type}`, id);
      return response.status(200).json({ ok: true });
    }

    const normalized = normalizeCmsResource(type, body.data || {});
    const sortOrder = Number.isFinite(Number(body.sort_order))
      ? Number(body.sort_order)
      : 0;
    const published = body.is_published !== false;

    await sql`
      INSERT INTO cms_resources (id, resource_type, sort_order, data, is_published)
      VALUES (${id}, ${type}, ${sortOrder}, ${JSON.stringify(normalized)}, ${published})
      ON CONFLICT (id) DO UPDATE SET
        sort_order = EXCLUDED.sort_order,
        data = EXCLUDED.data,
        is_published = EXCLUDED.is_published,
        updated_at = NOW()
      WHERE cms_resources.resource_type = ${type}
    `;

    await audit(
      session.username,
      request.method === "POST" ? "create" : "update",
      `cms_${type}`,
      id,
    );
    return response.status(200).json({ ok: true, id });
  } catch (error) {
    return fail(response, error);
  }
}
