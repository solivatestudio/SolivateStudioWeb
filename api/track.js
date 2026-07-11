import crypto from "node:crypto";
import { db, ensureSchema } from "./_lib/db.js";
import { fail, jsonBody, methodNotAllowed } from "./_lib/http.js";

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export default async function handler(request, response) {
  if (request.method !== "POST") return methodNotAllowed(response, ["POST"]);
  try {
    const body = jsonBody(request);
    const sessionId = clean(body.sessionId, 120);
    const path = clean(body.path, 500);
    if (!sessionId || !path || !path.startsWith("/")) {
      return response.status(400).json({ message: "Invalid tracking event." });
    }
    const eventType = body.type === "heartbeat" ? "heartbeat" : "pageview";
    const salt = process.env.TRACKING_SALT || process.env.SESSION_SECRET;
    if (!salt) throw new Error("TRACKING_SALT is not configured.");
    const sessionHash = crypto.createHash("sha256").update(`${salt}:${sessionId}`).digest("hex");
    let referrer = "";
    try {
      referrer = body.referrer ? new URL(body.referrer).hostname.slice(0, 180) : "";
    } catch {
      referrer = "";
    }
    const userAgent = clean(request.headers["user-agent"], 220);
    await ensureSchema();
    const sql = db();
    await sql`INSERT INTO traffic_events (event_type, session_hash, path, referrer, user_agent)
      VALUES (${eventType}, ${sessionHash}, ${path}, ${referrer}, ${userAgent})`;
    response.setHeader("Cache-Control", "no-store");
    return response.status(202).json({ ok: true });
  } catch (error) {
    return fail(response, error);
  }
}
