import { CMS_RESOURCE_TYPES, seedCmsResourceDefaults } from "../../api/_lib/cms-defaults.js";
import { db, ensureSchema } from "../../api/_lib/db.js";

export type PublicCmsResourceRow = {
  id: string;
  sort_order: number;
  data: Record<string, any>;
  updated_at?: string;
};

export async function getPublicCmsEntries() {
  await ensureSchema();
  const sql = db();
  const rows = (await sql`SELECT key, value FROM cms_entries WHERE status = 'published'`) as Array<{
    key: string;
    value: any;
  }>;
  return Object.fromEntries(rows.map((row) => [row.key, row.value])) as Record<string, any>;
}

export async function getPublicCmsResources(requestedTypes?: string[]) {
  await ensureSchema();
  const sql = db();
  const types = (requestedTypes?.length ? requestedTypes : [...CMS_RESOURCE_TYPES]).filter((type) =>
    CMS_RESOURCE_TYPES.has(type),
  );

  await Promise.all(types.map((type) => seedCmsResourceDefaults(sql, type)));

  const rows = (await sql`
    SELECT resource_type, id, sort_order, data, updated_at
    FROM cms_resources
    WHERE is_published = TRUE AND resource_type = ANY(${types})
    ORDER BY resource_type ASC, sort_order ASC, created_at ASC
  `) as Array<{
    resource_type: string;
    id: string;
    sort_order: number;
    data: Record<string, any>;
    updated_at?: string;
  }>;

  const resources = Object.fromEntries(
    types.map((type) => [type, [] as PublicCmsResourceRow[]]),
  ) as Record<string, PublicCmsResourceRow[]>;

  rows.forEach((row) => {
    resources[row.resource_type]?.push({
      id: row.id,
      sort_order: row.sort_order,
      data: row.data,
      updated_at: row.updated_at,
    });
  });

  return resources;
}
