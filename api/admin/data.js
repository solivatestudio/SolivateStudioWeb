import crypto from "node:crypto";
import { requireAdmin } from "../_lib/auth.js";
import { audit, db, ensureSchema } from "../_lib/db.js";
import { fail, jsonBody, methodNotAllowed } from "../_lib/http.js";

const clean = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const number = (value, fallback = 0) => (Number.isFinite(Number(value)) ? Number(value) : fallback);
const dateOrNull = (value) => (clean(value, 20) ? clean(value, 20) : null);
const PROJECT_STATUSES = new Set(["planning", "active", "review", "completed", "on-hold", "pending"]);
const PAYMENT_STATUSES = new Set(["paid", "dp", "unpaid", "pending", "overdue"]);
const MILESTONE_STATUSES = new Set(["pending", "on-progress", "completed", "late"]);
const DOCUMENT_TYPES = new Set(["invoice", "mou", "receipt", "operational", "contract", "other"]);
const DOCUMENT_STATUSES = new Set(["draft", "pending", "sent", "paid", "signed", "archived"]);
const PRICING_MODELS = new Set(["fixed", "line_items"]);
const PROJECT_TYPES = new Set(["umkm", "masjid", "event", "wedding", "company", "other"]);

const invoiceId = (projectId) => `invoice-${projectId}`;
const idrFormat = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value || 0));
const dateCompact = () => {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
};
const invoiceNumber = (project) => {
  const compact = dateCompact();
  const short = String(project.id || "").replace(/-/g, "").slice(0, 6).toUpperCase();
  return `INV-${compact}-${short}`;
};
const buildInvoicePayload = async (sql, project, milestones, lineItems) => {
  const items = (lineItems || []).slice().sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
  const itemRows = items.map((item) => ({
    description: clean(item.description, 200) || "Item",
    quantity: Number(item.quantity || 1),
    unit_price: Number(item.unit_price || 0),
    subtotal: Number(item.quantity || 1) * Number(item.unit_price || 0)
  }));
  const lineItemsTotal = itemRows.reduce((total, item) => total + item.subtotal, 0);
  const milestoneTotal = (milestones || []).reduce((total, item) => total + Number(item.amount || 0), 0);
  const model = project.pricing_model === "line_items" ? "line_items" : "fixed";
  const subtotal = model === "line_items" ? lineItemsTotal : Number(project.budget || 0);
  const total = subtotal;
  const [incomeRows] = await sql`SELECT COALESCE(SUM(amount), 0) AS received FROM finance_entries WHERE project_id = ${project.id} AND type = 'income'`;
  const received = Number(incomeRows?.received || 0);
  const status = total > 0 && received >= total ? "paid" : (received > 0 ? "dp" : "pending");
  const dueDate = (milestones || []).map((m) => m.due_date).filter(Boolean).sort().pop() || project.deadline || null;
  return {
    invoice_number: invoiceNumber(project),
    issued_date: new Date().toISOString().slice(0, 10),
    due_date: dueDate,
    currency: "IDR",
    project: {
      id: project.id,
      name: project.name,
      type: project.project_type || "other",
      pricing_model: model,
      scope: project.scope || "",
      features: project.features || "",
      notes: project.notes || ""
    },
    client: {
      name: project.client || "Client",
      contact: project.client_contact || "",
      address: project.client_address || ""
    },
    provider: {
      name: "Solivate Studio",
      email: process.env.CONTACT_EMAIL || "hello@solivate.com",
      phone: process.env.CONTACT_PHONE || "+62 812-0000-0000",
      website: "https://solivate.com",
      address: process.env.CONTACT_ADDRESS || "Indonesia"
    },
    line_items: itemRows,
    milestones: (milestones || []).map((m) => ({
      title: m.title,
      amount: Number(m.amount || 0),
      due_date: m.due_date || null,
      status: m.status || "pending"
    })),
    subtotal,
    line_items_total: lineItemsTotal,
    milestone_total: milestoneTotal,
    total,
    received,
    balance: Math.max(0, total - received),
    status
  };
};
const legacyInvoiceText = (project, milestones, lineItems, payload) => {
  const lines = [
    `Invoice: ${payload.invoice_number}`,
    `Client: ${project.client || "Internal"}`,
    `Project: ${project.name}`,
    `Scope: ${project.scope || "-"}`,
    "",
    "Fitur / deliverables:",
    project.features || "-",
    ""
  ];
  if (project.pricing_model === "line_items" && lineItems?.length) {
    lines.push("Item / fitur:");
    lineItems.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.description} - ${item.quantity} x ${idrFormat(item.unit_price)} = ${idrFormat(Number(item.quantity || 1) * Number(item.unit_price || 0))}`);
    });
    lines.push("");
  }
  lines.push("Termin pembayaran:");
  if (milestones?.length) {
    milestones.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.title} - ${idrFormat(item.amount)}${item.due_date ? ` - due ${item.due_date}` : ""}`);
    });
  } else {
    lines.push(`1. Total project - ${idrFormat(project.budget || 0)}`);
  }
  lines.push("");
  lines.push(`Total invoice: ${idrFormat(payload.total)}`);
  return lines.join("\n");
};
async function syncInvoice(sql, projectId) {
  const [project] = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
  if (!project) return;
  const [milestones, lineItems, incomeRows] = await Promise.all([
    sql`SELECT * FROM project_milestones WHERE project_id = ${projectId} ORDER BY due_date NULLS LAST, created_at ASC`,
    sql`SELECT * FROM project_invoice_items WHERE project_id = ${projectId} ORDER BY sort_order ASC, created_at ASC`,
    sql`SELECT COALESCE(SUM(amount), 0) AS received FROM finance_entries WHERE project_id = ${projectId} AND type = 'income'`
  ]);
  const payload = await buildInvoicePayload(sql, project, milestones, lineItems);
  const milestoneTotal = milestones.reduce((total, item) => total + Number(item.amount || 0), 0);
  const amount = payload.total;
  const received = Number(incomeRows[0]?.received || 0);
  const invoiceStatus = amount > 0 && received >= amount ? "paid" : "pending";
  const legacyText = legacyInvoiceText(project, milestones, lineItems, payload);
  await sql`INSERT INTO project_documents (id, project_id, title, document_type, file_url, amount, status, issued_date, notes, notes_data)
    VALUES (${invoiceId(projectId)}, ${projectId}, ${`Invoice - ${project.name}`}, 'invoice', '', ${amount}, ${invoiceStatus}, CURRENT_DATE, ${legacyText}, ${JSON.stringify(payload)})
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      amount = EXCLUDED.amount,
      notes = EXCLUDED.notes,
      notes_data = EXCLUDED.notes_data,
      issued_date = COALESCE(project_documents.issued_date, EXCLUDED.issued_date),
      status = CASE WHEN project_documents.status = 'archived' THEN project_documents.status ELSE EXCLUDED.status END,
      updated_at = NOW()`;
  if (milestoneTotal > 0 && amount !== milestoneTotal) {
    return;
  }
}
async function syncProjectPayment(sql, projectId) {
  if (!projectId) return;
  const [project] = await sql`SELECT budget FROM projects WHERE id = ${projectId}`;
  if (!project) return;
  const [income] = await sql`SELECT COALESCE(SUM(amount), 0) AS received
    FROM finance_entries
    WHERE project_id = ${projectId} AND type = 'income'`;
  const received = Number(income?.received || 0);
  const target = Number(project.budget || 0);
  const paymentStatus = received <= 0 ? "unpaid" : (target > 0 && received >= target ? "paid" : "dp");
  await sql`UPDATE projects
    SET payment_received = ${received}, payment_status = ${paymentStatus}, updated_at = NOW()
    WHERE id = ${projectId}`;
  await syncInvoice(sql, projectId);
}

async function getOverview(sql) {
  const [projects, finance, traffic, trafficTrend, financeTrend, outstanding, overdue, monthlyProfit] = await Promise.all([
    sql`SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status IN ('planning', 'active', 'review', 'pending'))::int AS active,
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
      GROUP BY month ORDER BY month`,
    sql`SELECT id, name, client, budget, payment_received, payment_status,
      GREATEST(budget - payment_received, 0) AS outstanding
      FROM projects
      WHERE payment_status IN ('dp', 'unpaid', 'pending', 'overdue') OR payment_received < budget
      ORDER BY outstanding DESC, deadline NULLS LAST
      LIMIT 8`,
    sql`SELECT project.name, project.client, milestone.title, milestone.due_date, milestone.status
      FROM project_milestones milestone
      JOIN projects project ON project.id = milestone.project_id
      WHERE milestone.status != 'completed' AND milestone.due_date < CURRENT_DATE
      ORDER BY milestone.due_date ASC
      LIMIT 8`,
    sql`SELECT
      COALESCE(SUM(budget), 0) AS booked,
      COALESCE(SUM(payment_received), 0) AS received,
      COALESCE(SUM(operational_cost + pic_fee), 0) AS planned_cost,
      COALESCE(SUM(payment_received - operational_cost - pic_fee), 0) AS projected_profit
      FROM projects
      WHERE date_trunc('month', COALESCE(start_date, created_at::date)) = date_trunc('month', CURRENT_DATE)`
  ]);
  return {
    projects: projects[0],
    finance: finance[0],
    traffic: traffic[0],
    trafficTrend,
    financeTrend,
    outstanding,
    overdue,
    monthlyProfit: monthlyProfit[0]
  };
}

async function getProjects(sql) {
  const rows = await sql`
    SELECT project.*,
      COALESCE(SUM(finance.amount) FILTER (WHERE finance.type = 'income'), 0) AS income_total,
      COALESCE(SUM(finance.amount) FILTER (WHERE finance.type = 'expense'), 0) AS expense_total
    FROM projects project
    LEFT JOIN finance_entries finance ON finance.project_id = project.id
    GROUP BY project.id
    ORDER BY
      CASE project.status WHEN 'active' THEN 1 WHEN 'review' THEN 2 WHEN 'planning' THEN 3 WHEN 'pending' THEN 4 ELSE 5 END,
      project.deadline NULLS LAST,
      project.updated_at DESC
  `;
  const [milestones, documents, lineItems] = await Promise.all([
    sql`SELECT * FROM project_milestones ORDER BY due_date NULLS LAST, created_at ASC`,
    sql`SELECT * FROM project_documents ORDER BY issued_date DESC NULLS LAST, created_at DESC`,
    sql`SELECT * FROM project_invoice_items ORDER BY sort_order ASC, created_at ASC`
  ]);
  const byProject = (items) => items.reduce((map, item) => {
    map[item.project_id] ||= [];
    map[item.project_id].push(item);
    return map;
  }, {});
  const milestoneMap = byProject(milestones);
  const documentMap = byProject(documents);
  const lineItemMap = byProject(lineItems);
  return rows.map((project) => {
    const plannedCost = Number(project.operational_cost || 0) + Number(project.pic_fee || 0);
    const actualExpense = Number(project.expense_total || 0);
    const received = Number(project.payment_received || 0) || Number(project.income_total || 0);
    const items = lineItemMap[project.id] || [];
    const lineItemsTotal = items.reduce((total, item) => total + Number(item.quantity || 1) * Number(item.unit_price || 0), 0);
    const pricingModel = project.pricing_model === "line_items" ? "line_items" : "fixed";
    const effectiveBudget = pricingModel === "line_items" ? lineItemsTotal : Number(project.budget || 0);
    return {
      ...project,
      milestones: milestoneMap[project.id] || [],
      documents: documentMap[project.id] || [],
      line_items: items,
      line_items_total: lineItemsTotal,
      effective_budget: effectiveBudget,
      planned_cost: plannedCost,
      actual_expense: actualExpense,
      profit_plan: effectiveBudget - plannedCost,
      profit_actual: received - actualExpense,
      outstanding: Math.max(0, effectiveBudget - received)
    };
  });
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
      if (resource === "projects") return response.status(200).json({ items: await getProjects(sql) });
      if (resource === "project") {
        const projectId = clean(request.query?.id, 80);
        if (!projectId) return response.status(400).json({ message: "id wajib diisi." });
        const [project] = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
        if (!project) return response.status(404).json({ message: "Project tidak ditemukan." });
        const [milestones, lineItems, documents] = await Promise.all([
          sql`SELECT * FROM project_milestones WHERE project_id = ${projectId} ORDER BY due_date NULLS LAST, created_at ASC`,
          sql`SELECT * FROM project_invoice_items WHERE project_id = ${projectId} ORDER BY sort_order ASC, created_at ASC`,
          sql`SELECT * FROM project_documents WHERE project_id = ${projectId} ORDER BY issued_date DESC NULLS LAST, created_at DESC`
        ]);
        return response.status(200).json({ project, milestones, line_items: lineItems, documents });
      }
      if (resource === "regenerate_invoice") {
        const projectId = clean(request.query?.project_id, 80);
        if (!projectId) return response.status(400).json({ message: "project_id wajib diisi." });
        await syncInvoice(sql, projectId);
        await audit(session.username, "regenerate", "invoice", projectId);
        return response.status(200).json({ ok: true });
      }
      if (resource === "invoice") {
        const projectId = clean(request.query?.project_id, 80);
        if (!projectId) return response.status(400).json({ message: "project_id wajib diisi." });
        const [project] = await sql`SELECT * FROM projects WHERE id = ${projectId}`;
        if (!project) return response.status(404).json({ message: "Project tidak ditemukan." });
        const [milestones, lineItems, documents] = await Promise.all([
          sql`SELECT * FROM project_milestones WHERE project_id = ${projectId} ORDER BY due_date NULLS LAST, created_at ASC`,
          sql`SELECT * FROM project_invoice_items WHERE project_id = ${projectId} ORDER BY sort_order ASC, created_at ASC`,
          sql`SELECT * FROM project_documents WHERE project_id = ${projectId} ORDER BY issued_date DESC NULLS LAST, created_at DESC`
        ]);
        const [invoiceDoc] = await sql`SELECT * FROM project_documents WHERE id = ${invoiceId(projectId)}`;
        const payload = await buildInvoicePayload(sql, project, milestones, lineItems);
        return response.status(200).json({
          project,
          milestones,
          line_items: lineItems,
          documents,
          invoice: invoiceDoc || null,
          payload
        });
      }
      if (resource === "finance") {
        const rows = await sql`SELECT finance.*, project.name AS project_name
          FROM finance_entries finance
          LEFT JOIN projects project ON project.id = finance.project_id
          ORDER BY finance.entry_date DESC, finance.created_at DESC LIMIT 250`;
        const totals = await sql`SELECT
          COALESCE(SUM(amount) FILTER (WHERE type = 'income'), 0) AS income,
          COALESCE(SUM(amount) FILTER (WHERE type = 'expense'), 0) AS expense
          FROM finance_entries`;
        const projects = await sql`SELECT id, name, client FROM projects ORDER BY updated_at DESC LIMIT 200`;
        return response.status(200).json({ items: rows, totals: totals[0], projects });
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
      const status = PROJECT_STATUSES.has(body.status) ? body.status : "planning";
      const paymentStatus = PAYMENT_STATUSES.has(body.payment_status) ? body.payment_status : "unpaid";
      const pricingModel = PRICING_MODELS.has(body.pricing_model) ? body.pricing_model : "fixed";
      const projectType = PROJECT_TYPES.has(body.project_type) ? body.project_type : "other";
      await sql`INSERT INTO projects (
          id, name, client, status, progress, start_date, deadline, budget,
          operational_cost, pic_fee, payment_status, payment_received, scope, features, notes,
          pricing_model, project_type, client_contact, client_address
        )
        VALUES (
          ${id}, ${name}, ${clean(body.client, 160)}, ${status},
          ${Math.min(100, Math.max(0, number(body.progress)))}, ${dateOrNull(body.start_date)},
          ${dateOrNull(body.deadline)}, ${Math.max(0, number(body.budget))},
          ${Math.max(0, number(body.operational_cost))}, ${Math.max(0, number(body.pic_fee))},
          ${paymentStatus}, ${Math.max(0, number(body.payment_received))}, ${clean(body.scope, 3000)},
          ${clean(body.features, 3000)}, ${clean(body.notes, 2000)},
          ${pricingModel}, ${projectType},
          ${clean(body.client_contact, 200)}, ${clean(body.client_address, 500)}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, client = EXCLUDED.client, status = EXCLUDED.status,
          progress = EXCLUDED.progress, start_date = EXCLUDED.start_date, deadline = EXCLUDED.deadline,
          budget = EXCLUDED.budget, operational_cost = EXCLUDED.operational_cost, pic_fee = EXCLUDED.pic_fee,
          payment_status = EXCLUDED.payment_status, payment_received = EXCLUDED.payment_received,
          scope = EXCLUDED.scope, features = EXCLUDED.features, notes = EXCLUDED.notes,
          pricing_model = EXCLUDED.pricing_model, project_type = EXCLUDED.project_type,
          client_contact = EXCLUDED.client_contact, client_address = EXCLUDED.client_address,
          updated_at = NOW()`;
      if (Array.isArray(body.line_items)) {
        await sql`DELETE FROM project_invoice_items WHERE project_id = ${id}`;
        for (let index = 0; index < body.line_items.length; index += 1) {
          const item = body.line_items[index] || {};
          const description = clean(item.description, 240);
          if (!description) continue;
          const itemId = clean(item.id, 80) || crypto.randomUUID();
          await sql`INSERT INTO project_invoice_items (id, project_id, description, quantity, unit_price, sort_order)
            VALUES (${itemId}, ${id}, ${description},
              ${Math.max(0, number(item.quantity, 1))},
              ${Math.max(0, number(item.unit_price))},
              ${index})`;
        }
      }
      await syncInvoice(sql, id);
      await audit(session.username, request.method === "POST" ? "create" : "update", "project", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "invoice_items") {
      const projectId = clean(body.project_id, 80);
      if (request.method === "GET") {
        if (!projectId) return response.status(400).json({ message: "project_id wajib diisi." });
        const rows = await sql`SELECT * FROM project_invoice_items WHERE project_id = ${projectId} ORDER BY sort_order ASC, created_at ASC`;
        return response.status(200).json({ items: rows });
      }
      if (request.method === "DELETE") {
        const id = clean(body.id, 80);
        if (!id) return response.status(400).json({ message: "id wajib diisi." });
        const [existing] = await sql`SELECT project_id FROM project_invoice_items WHERE id = ${id}`;
        await sql`DELETE FROM project_invoice_items WHERE id = ${id}`;
        if (existing?.project_id) await syncInvoice(sql, existing.project_id);
        await audit(session.username, "delete", "invoice_item", id);
        return response.status(200).json({ ok: true });
      }
      if (!projectId) return response.status(400).json({ message: "project_id wajib diisi." });
      const description = clean(body.description, 240);
      if (!description) return response.status(400).json({ message: "Deskripsi item wajib diisi." });
      const id = clean(body.id, 80) || crypto.randomUUID();
      const [sortRow] = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM project_invoice_items WHERE project_id = ${projectId}`;
      const sortOrder = number(body.sort_order, Number(sortRow?.next ?? 0));
      await sql`INSERT INTO project_invoice_items (id, project_id, description, quantity, unit_price, sort_order)
        VALUES (${id}, ${projectId}, ${description},
          ${Math.max(0, number(body.quantity, 1))},
          ${Math.max(0, number(body.unit_price))},
          ${sortOrder})
        ON CONFLICT (id) DO UPDATE SET description = EXCLUDED.description,
          quantity = EXCLUDED.quantity, unit_price = EXCLUDED.unit_price,
          sort_order = EXCLUDED.sort_order, updated_at = NOW()`;
      await syncInvoice(sql, projectId);
      await audit(session.username, request.method === "POST" ? "create" : "update", "invoice_item", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "milestones") {
      const id = clean(body.id, 80) || crypto.randomUUID();
      if (request.method === "DELETE") {
        const [existing] = await sql`SELECT project_id FROM project_milestones WHERE id = ${id}`;
        await sql`DELETE FROM project_milestones WHERE id = ${id}`;
        if (existing?.project_id) await syncInvoice(sql, existing.project_id);
        await audit(session.username, "delete", "milestone", id);
        return response.status(200).json({ ok: true });
      }
      const title = clean(body.title, 180);
      const projectId = clean(body.project_id, 80);
      if (!title || !projectId) return response.status(400).json({ message: "Project dan judul termin wajib diisi." });
      const status = MILESTONE_STATUSES.has(body.status) ? body.status : "pending";
      await sql`INSERT INTO project_milestones (id, project_id, title, due_date, status, amount, notes)
        VALUES (${id}, ${projectId}, ${title}, ${dateOrNull(body.due_date)}, ${status}, ${Math.max(0, number(body.amount))}, ${clean(body.notes, 1000)})
        ON CONFLICT (id) DO UPDATE SET project_id = EXCLUDED.project_id, title = EXCLUDED.title,
          due_date = EXCLUDED.due_date, status = EXCLUDED.status, amount = EXCLUDED.amount,
          notes = EXCLUDED.notes, updated_at = NOW()`;
      await syncInvoice(sql, projectId);
      await audit(session.username, request.method === "POST" ? "create" : "update", "milestone", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "documents") {
      const id = clean(body.id, 80) || crypto.randomUUID();
      if (request.method === "DELETE") {
        await sql`DELETE FROM project_documents WHERE id = ${id}`;
        await audit(session.username, "delete", "document", id);
        return response.status(200).json({ ok: true });
      }
      const title = clean(body.title, 180);
      const projectId = clean(body.project_id, 80);
      if (!title || !projectId) return response.status(400).json({ message: "Project dan judul dokumen wajib diisi." });
      const type = DOCUMENT_TYPES.has(body.document_type) ? body.document_type : "other";
      const status = DOCUMENT_STATUSES.has(body.status) ? body.status : "draft";
      await sql`INSERT INTO project_documents (id, project_id, title, document_type, file_url, amount, status, issued_date, notes)
        VALUES (${id}, ${projectId}, ${title}, ${type}, ${clean(body.file_url, 800)}, ${Math.max(0, number(body.amount))}, ${status}, ${dateOrNull(body.issued_date)}, ${clean(body.notes, 1000)})
        ON CONFLICT (id) DO UPDATE SET project_id = EXCLUDED.project_id, title = EXCLUDED.title,
          document_type = EXCLUDED.document_type, file_url = EXCLUDED.file_url, amount = EXCLUDED.amount,
          status = EXCLUDED.status, issued_date = EXCLUDED.issued_date, notes = EXCLUDED.notes,
          updated_at = NOW()`;
      await audit(session.username, request.method === "POST" ? "create" : "update", "document", id);
      return response.status(200).json({ ok: true, id });
    }

    if (resource === "finance") {
      const id = clean(body.id, 80) || crypto.randomUUID();
      if (request.method === "DELETE") {
        const [existing] = await sql`SELECT project_id FROM finance_entries WHERE id = ${id}`;
        await sql`DELETE FROM finance_entries WHERE id = ${id}`;
        if (existing?.project_id) await syncProjectPayment(sql, existing.project_id);
        await audit(session.username, "delete", "finance", id);
        return response.status(200).json({ ok: true });
      }
      const type = body.type === "expense" ? "expense" : "income";
      const description = clean(body.description, 240);
      if (!description) return response.status(400).json({ message: "Deskripsi wajib diisi." });
      const paymentStatus = ["paid", "pending", "overdue", "dp"].includes(body.payment_status) ? body.payment_status : "paid";
      const projectId = clean(body.project_id, 80) || null;
      const [existing] = await sql`SELECT project_id FROM finance_entries WHERE id = ${id}`;
      await sql`INSERT INTO finance_entries (id, project_id, entry_date, type, category, description, amount, payment_status)
        VALUES (${id}, ${projectId}, ${dateOrNull(body.entry_date) || new Date().toISOString().slice(0, 10)}, ${type}, ${clean(body.category, 100) || "General"}, ${description}, ${Math.max(0, number(body.amount))}, ${paymentStatus})
        ON CONFLICT (id) DO UPDATE SET project_id = EXCLUDED.project_id, entry_date = EXCLUDED.entry_date,
          type = EXCLUDED.type, category = EXCLUDED.category, description = EXCLUDED.description,
          amount = EXCLUDED.amount, payment_status = EXCLUDED.payment_status, updated_at = NOW()`;
      if (existing?.project_id && existing.project_id !== projectId) await syncProjectPayment(sql, existing.project_id);
      if (projectId) await syncProjectPayment(sql, projectId);
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
