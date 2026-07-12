import { neon } from "@neondatabase/serverless";

let client;
let schemaPromise;

export function db() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
  client ||= neon(process.env.DATABASE_URL);
  return client;
}

export function ensureSchema() {
  if (schemaPromise) return schemaPromise;
  const sql = db();
  schemaPromise = (async () => {
    await Promise.all([
      sql`CREATE TABLE IF NOT EXISTS cms_entries (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      status TEXT NOT NULL DEFAULT 'published',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      client TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'planning',
      progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
      deadline DATE,
      budget NUMERIC(14, 2) NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS finance_entries (
      id TEXT PRIMARY KEY,
      entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
      type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
      category TEXT NOT NULL DEFAULT 'General',
      description TEXT NOT NULL,
      amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
      payment_status TEXT NOT NULL DEFAULT 'paid',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS performance_metrics (
      metric_key TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      value NUMERIC(14, 2) NOT NULL DEFAULT 0,
      target NUMERIC(14, 2) NOT NULL DEFAULT 0,
      unit TEXT NOT NULL DEFAULT '',
      period TEXT NOT NULL DEFAULT 'current',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS traffic_events (
      id BIGSERIAL PRIMARY KEY,
      event_type TEXT NOT NULL DEFAULT 'pageview',
      session_hash TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id BIGSERIAL PRIMARY KEY,
      admin_username TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS cms_resources (
      id TEXT PRIMARY KEY,
      resource_type TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    ]);
    await Promise.all([
      sql`CREATE INDEX IF NOT EXISTS traffic_events_created_at_idx ON traffic_events (created_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS traffic_events_session_idx ON traffic_events (session_hash, created_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS cms_resources_type_idx ON cms_resources (resource_type, sort_order, updated_at DESC)`,
    ]);
  })().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });
  return schemaPromise;
}

export async function audit(username, action, entityType, entityId = "") {
  const sql = db();
  await sql`INSERT INTO admin_audit_logs (admin_username, action, entity_type, entity_id)
    VALUES (${username}, ${action}, ${entityType}, ${entityId})`;
}
