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
      start_date DATE,
      deadline DATE,
      budget NUMERIC(14, 2) NOT NULL DEFAULT 0,
      operational_cost NUMERIC(14, 2) NOT NULL DEFAULT 0,
      pic_fee NUMERIC(14, 2) NOT NULL DEFAULT 0,
      payment_status TEXT NOT NULL DEFAULT 'unpaid',
      payment_received NUMERIC(14, 2) NOT NULL DEFAULT 0,
      scope TEXT NOT NULL DEFAULT '',
      features TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS finance_entries (
      id TEXT PRIMARY KEY,
      project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
      entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
      type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
      category TEXT NOT NULL DEFAULT 'General',
      description TEXT NOT NULL,
      amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
      payment_status TEXT NOT NULL DEFAULT 'paid',
      proof_url TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS project_milestones (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      due_date DATE,
      status TEXT NOT NULL DEFAULT 'pending',
      amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS project_documents (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      document_type TEXT NOT NULL DEFAULT 'other',
      file_url TEXT NOT NULL DEFAULT '',
      amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'draft',
      issued_date DATE,
      notes TEXT NOT NULL DEFAULT '',
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
      sql`CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      ip_hash TEXT NOT NULL,
      contact TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      sql`CREATE TABLE IF NOT EXISTS project_invoice_items (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      description TEXT NOT NULL DEFAULT '',
      quantity NUMERIC(10, 2) NOT NULL DEFAULT 1,
      unit_price NUMERIC(14, 2) NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    ]);
    await Promise.all([
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS start_date DATE`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS operational_cost NUMERIC(14, 2) NOT NULL DEFAULT 0`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS pic_fee NUMERIC(14, 2) NOT NULL DEFAULT 0`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid'`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS payment_received NUMERIC(14, 2) NOT NULL DEFAULT 0`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS scope TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS features TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS pricing_model TEXT NOT NULL DEFAULT 'fixed'`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type TEXT NOT NULL DEFAULT 'other'`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_contact TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_address TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE project_documents ADD COLUMN IF NOT EXISTS notes_data JSONB`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES projects(id) ON DELETE SET NULL`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS client_name TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS client_contact TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS client_address TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS description_detail TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS proof_url TEXT NOT NULL DEFAULT ''`,
      sql`ALTER TABLE finance_entries ADD COLUMN IF NOT EXISTS invoice_doc_id TEXT`,
    ]);
    await Promise.all([
      sql`CREATE INDEX IF NOT EXISTS traffic_events_created_at_idx ON traffic_events (created_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS traffic_events_session_idx ON traffic_events (session_hash, created_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS cms_resources_type_idx ON cms_resources (resource_type, sort_order, updated_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS finance_entries_project_idx ON finance_entries (project_id, entry_date DESC)`,
      sql`CREATE INDEX IF NOT EXISTS project_milestones_project_idx ON project_milestones (project_id, due_date ASC)`,
      sql`CREATE INDEX IF NOT EXISTS project_documents_project_idx ON project_documents (project_id, issued_date DESC)`,
      sql`CREATE INDEX IF NOT EXISTS contact_submissions_ip_idx ON contact_submissions (ip_hash, created_at DESC)`,
      sql`CREATE INDEX IF NOT EXISTS project_invoice_items_project_idx ON project_invoice_items (project_id, sort_order)`,
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
