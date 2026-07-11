import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

try { process.loadEnvFile?.(".env.local"); } catch {}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const match = html.match(/<script type="application\/json" id="i18n-data">([\s\S]*?)<\/script>/);
if (!match) throw new Error("Homepage translation data was not found. Run npm run build first.");

const translations = JSON.parse(match[1]);
const sql = neon(process.env.DATABASE_URL);

await sql`CREATE TABLE IF NOT EXISTS cms_entries (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`;

let inserted = 0;
for (const [key, copy] of Object.entries(translations)) {
  for (const locale of ["id", "en"]) {
    const cmsKey = `copy:${key}:${locale}`;
    const result = await sql`INSERT INTO cms_entries (key, value, status, updated_at)
      VALUES (${cmsKey}, ${JSON.stringify(copy[locale] || "")}, 'published', NOW())
      ON CONFLICT (key) DO NOTHING
      RETURNING key`;
    inserted += result.length;
  }
}

console.log(`CMS ready: ${Object.keys(translations).length * 2} fields, ${inserted} new values inserted.`);
