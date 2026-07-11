import crypto from "node:crypto";
import { requireAdmin } from "../_lib/auth.js";
import { audit, db, ensureSchema } from "../_lib/db.js";
import { fail, jsonBody, methodNotAllowed } from "../_lib/http.js";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

async function getOverview(sql) {
  const [projects, finance, traffic, trafficTrend, financeTrend] = await Promise.all([
    sql`SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status IN ('planning', 'active', 'review'))::int AS active,
      COALESCE(ROUND(AVG(progress)), 0)::int AS progress
      FROM projects`,
    sql`SELECT
      COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND date_trunc('month', entry_date) = date_trunc('month', CURRENT_DATE)), 0) AS income,
      COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND date_trunc('month', entry_date) = date_trunc('month', CURRENT_DATE)), 0) AS expense
      FROM finance_entries`,
    sql`SELECT
      COUNT(DISTINCT session_hash) FILTER (WHERE created_at >= NOW() - INTERVAL '5 minutes')::int AS active,
      COUNT(*) FILTER (WHERE event_type = 'pageview' AND created_at >= CURRENT_DATE)::int AS today
      FROM traffic_events`,
    sql`SELECT day::date, COALESCE(COUNT(event.id), 0)::int AS visits
      FROM generate_series(CURRENT_DATE - INTERVAL '6 days', CURRENT_DATE, INTERVAL '1 day') day
      LEFT JOIN traffic_events event ON event.event_type = 'pageview'
        AND event.created_at >= day AND event.created_at < day + INTERVAL '1 day'
      GROUP BY day ORDER BY day`,
    sql`SELECT month::date,
      COALESCE(SUM(entry.amount) FILTER (WHERE entry.type = 'income'), 0) AS income,
      COALESCE(SUM(entry.amount) FILTER (WHERE entry.type = 'expense'), 0) AS expense
      FROM generate_series(date_trunc('month', CURRENT_DATE) - INTERVAL '5 months', date_trunc('month', CURRENT_DATE), INTERVAL '1 month') month
      LEFT JOIN finance_entries entry ON entry.entry_date >= month AND entry.entry_date < month + INTERVAL '1 month'
      GROUP BY month ORDER BY month`
  ]);
  return { projects: projects[0], finance: finance[0], traffic: traffic[0], trafficTrend, financeTrend };
}

export default async function handler(request, response) {
  const session = requireAdmin(request, response);
  if (!session) return;
  if (!["GET", "POST", "PUT", "DELETE"].includes(request.method)) {
    return methodNotAllowed(response, ["GET", "POST", "PUT", "DELETE"]);
  }

  try {
    await ensureSchema();
    const sql = db();
    const resource = clean(request.query?.resource, 40);
    const body = jsonBody(request);

    if (request.method === "GET") {
      if (resource === "overview") return response.status(200).json(await getOverview(sql));
      if (resource === "cms") {
        const rows = await sql`SELECT key, value, status, updated_at FROM cms_entries ORDER BY key`;
        return response.status(200).json({ entries: Object.fromEntries(rows.map((row) => [row.key, row.value])) });
      }
      if (resource === "projects") {
        const rows = await sql`SELECT * FROM projects ORDER BY
          CASE status WHEN 'active' THEN 1 WHEN 'review' THEN 2 WHEN 'planning' THEN 3 ELSE 4 END,
          deadline NULLS LAST, updated_at DESC`;
        return response.status(200).json({ items: rows });
      }
      if (resource === "finance") {
        const rows = await sql`SELECT * FROM finance_entries ORDER BY entry_date DESC, created_at DESC LIMIT 250`;
        const totals = await sql`SELECT
          COALESCE(SUM(amount) FILTER (WHERE type = 'income'), 0) AS income,
          COALESCE(SUM(amount) FILTER (WHERE type = 'expense'), 0) AS expense
          FROM finance_entries`;
        return response.status(200).json({ items: rows, totals: totals[0] });
      }
      if (resource === "performance") {
        const rows = await sql`SELECT * FROM performance_metrics ORDER BY updated_at DESC`;
        return response.status(200).json({ items: rows });
      }
      return response.status(400).json({ message: "Unknown resource." });
    }

    if (resource === "cms" && request.method === "PUT") {
      const entries = body.entries && typeof body.entries === "object" ? body.entries : {};
      const initialize = body.initialize === true;
      for (const [key, value] of Object.entries(entries)) {
        const safeKey = clean(key, 80);
        if (!safeKey) continue;
        if (initialize) {
          await sql`INSERT INTO cms_entries (key, value, status, updated_at)
            VALUES (${safeKey}, ${JSON.stringify(value)}, 'published', NOW())
            ON CONFLICT (key) DO NOTHING`;
        } else {
          await sql`INSERT INTO cms_entries (key, value, status, updated_at)
            VALUES (${safeKey}, ${JSON.stringify(value)}, 'published', NOW())
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, status = 'published', updated_at = NOW()`;
        }
      }
      await audit(session.username, initialize ? "initialize" : "update", "cms", "homepage");
      return response.status(200).json({ ok: true });
    }

    if (resource === "projects") {
      const id = clean(body.id, 80) || crypto.randomUUID();
      if (request.method === "DELETE") {
        await sql`DELETE FROM projects WHERE id = ${id}`;
        await audit(session.username, "delete", "project", id);
        return response.status(200).json({ ok: true });
      }
      const name = clean(body.name, 160);
      if (!name) return response.status(400).json({ message: "Nama project wajib diisi." });
      const client = clean(body.client, 160);
      const status = ["planning", "active", "review", "completed", "on-hold"].includes(body.status) ? body.status : "planning";
      const progress = Math.min(100, Math.max(0, number(body.progress)));
      const deadline = body.deadline || null;
      const budget = Math.max(0, number(body.budget));
      const notes = clean(body.notes, 2000);
      await sql`INSERT INTO projects (id, name, client, status, progress, deadline, budget, notes)
        VALUES (${id}, ${name}, ${client}, ${status}, ${progress}, ${deadline}, ${budget}, ${notes})
        ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, client = EXCLUDED.client,
          status = EXCLUDED.status, progress = EXCLUDED.progress, deadline = EXCLUDED.deadline,
          budget = EXCLUDED.budget, notes = EXCLUDED.notes, updated_at = NOW()`;
      await audit(session.username, request.method === "POST" ? "create" : "update", "project", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "finance") {
      const id = clean(body.id, 80) || crypto.randomUUID();
      if (request.method === "DELETE") {
        await sql`DELETE FROM finance_entries WHERE id = ${id}`;
        await audit(session.username, "delete", "finance", id);
        return response.status(200).json({ ok: true });
      }
      const type = body.type === "expense" ? "expense" : "income";
      const description = clean(body.description, 240);
      if (!description) return response.status(400).json({ message: "Deskripsi wajib diisi." });
      const category = clean(body.category, 100) || "General";
      const amount = Math.max(0, number(body.amount));
      const paymentStatus = ["paid", "pending", "overdue"].includes(body.payment_status) ? body.payment_status : "paid";
      const entryDate = body.entry_date || new Date().toISOString().slice(0, 10);
      await sql`INSERT INTO finance_entries (id, entry_date, type, category, description, amount, payment_status)
        VALUES (${id}, ${entryDate}, ${type}, ${category}, ${description}, ${amount}, ${paymentStatus})
        ON CONFLICT (id) DO UPDATE SET entry_date = EXCLUDED.entry_date, type = EXCLUDED.type,
          category = EXCLUDED.category, description = EXCLUDED.description, amount = EXCLUDED.amount,
          payment_status = EXCLUDED.payment_status, updated_at = NOW()`;
      await audit(session.username, request.method === "POST" ? "create" : "update", "finance", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "performance" && request.method === "PUT") {
      const key = clean(body.metric_key, 80);
      const label = clean(body.label, 140);
      if (!key || !label) return response.status(400).json({ message: "Key dan label KPI wajib diisi." });
      await sql`INSERT INTO performance_metrics (metric_key, label, value, target, unit, period, updated_at)
        VALUES (${key}, ${label}, ${number(body.value)}, ${number(body.target)}, ${clean(body.unit, 30)}, ${clean(body.period, 60) || "current"}, NOW())
        ON CONFLICT (metric_key) DO UPDATE SET label = EXCLUDED.label, value = EXCLUDED.value,
          target = EXCLUDED.target, unit = EXCLUDED.unit, period = EXCLUDED.period, updated_at = NOW()`;
      await audit(session.username, "update", "performance", key);
      return response.status(200).json({ ok: true });
    }

    return response.status(400).json({ message: "Unsupported operation." });
  } catch (error) {
    return fail(response, error);
  }
}
