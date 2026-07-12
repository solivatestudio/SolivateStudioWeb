import crypto from "node:crypto";
import { db, ensureSchema } from "./_lib/db.js";
import { turnstileToken, verifyTurnstile } from "./_lib/turnstile.js";

const RESEND_API_URL = "https://api.resend.com/emails";
const FALLBACK_TO_EMAIL = "solivatestudio@gmail.com";
const FALLBACK_FROM_EMAIL = "Solivate Studio <onboarding@resend.dev>";
const PROJECT_TYPES = new Set(["Redesign website", "Website baru", "Event / undangan digital", "Sistem custom"]);

const clean = (value) => String(value ?? "").trim();
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
const getEmailFromContact = (value) => {
  const match = value.match(/[^\s<>()]+@[^\s<>()]+\.[^\s<>()]+/);
  return match?.[0] || "";
};
const getIp = (request) =>
  String(request.headers["x-forwarded-for"] || request.headers["x-real-ip"] || "")
    .split(",")[0]
    .trim() || "unknown";
const hashIp = (request) =>
  crypto
    .createHash("sha256")
    .update(`${process.env.TRACKING_SALT || process.env.SESSION_SECRET || "solivate"}:${getIp(request)}`)
    .digest("hex");
const wordCount = (value) => clean(value).split(/\s+/).filter(Boolean).length;
const hasContactMethod = (value) => {
  const text = clean(value);
  const hasEmail = /[^\s<>()]+@[^\s<>()]+\.[^\s<>()]+/.test(text);
  const digits = text.replace(/\D/g, "");
  return hasEmail || digits.length >= 9;
};
const looksRandom = (value, { minWords = 2, maxSingleToken = 18 } = {}) => {
  const text = clean(value);
  const compact = text.replace(/[^a-zA-Z]/g, "");
  if (compact.length >= maxSingleToken && wordCount(text) < minWords) return true;
  const longTokens = text.split(/\s+/).filter((token) => /[a-zA-Z]{18,}/.test(token));
  if (longTokens.length) return true;
  const vowels = (compact.match(/[aeiouAEIOU]/g) || []).length;
  if (compact.length >= 16 && vowels / Math.max(compact.length, 1) < 0.18) return true;
  return false;
};
const validateHumanSubmission = (payload) => {
  if (clean(payload.website) || clean(payload.company)) return "Submission rejected.";
  const startedAt = Number(payload.startedAt || 0);
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < 1500 || elapsed > 1000 * 60 * 60 * 3) {
    return "Please refresh the page and submit again.";
  }
  const name = clean(payload.name);
  const contact = clean(payload.contact);
  const projectType = clean(payload.projectType);
  const brief = clean(payload.brief);
  if (!hasContactMethod(contact)) return "Please enter a valid email or WhatsApp number.";
  if (!PROJECT_TYPES.has(projectType)) return "Please select a valid project type.";
  if (looksRandom(name, { minWords: 1, maxSingleToken: 15 })) return "Please enter a real name.";
  if (brief.length < 25 || wordCount(brief) < 4 || looksRandom(brief, { minWords: 4, maxSingleToken: 22 })) {
    return "Please write a clearer project brief.";
  }
  return "";
};

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return response
      .status(500)
      .json({ message: "Resend API key is not configured." });
  }

  const payload =
    typeof request.body === "object" && request.body ? request.body : {};
  const turnstile = await verifyTurnstile(turnstileToken(payload), request);
  if (!turnstile.ok) {
    return response.status(400).json({ message: turnstile.message });
  }

  const name = clean(payload.name);
  const contact = clean(payload.contact);
  const projectType = clean(payload.projectType);
  const brief = clean(payload.brief);

  if (!name || !contact || !projectType || !brief) {
    return response
      .status(400)
      .json({ message: "Please complete all required fields." });
  }

  const validationError = validateHumanSubmission(payload);
  if (validationError) {
    return response.status(400).json({ message: validationError });
  }

  if (
    name.length > 120 ||
    contact.length > 160 ||
    projectType.length > 120 ||
    brief.length > 4000
  ) {
    return response
      .status(400)
      .json({ message: "Submitted content is too long." });
  }

  await ensureSchema();
  const sql = db();
  const ipHash = hashIp(request);
  const [limits] = await Promise.all([
    sql`SELECT
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 hour')::int AS hour_count,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day')::int AS day_count
      FROM contact_submissions
      WHERE ip_hash = ${ipHash}`,
    sql`DELETE FROM contact_submissions WHERE created_at < NOW() - INTERVAL '14 days'`
  ]);
  if (Number(limits[0]?.hour_count || 0) >= 2 || Number(limits[0]?.day_count || 0) >= 5) {
    return response.status(429).json({ message: "Too many submissions. Please try again later." });
  }

  const submittedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeContact = escapeHtml(contact);
  const safeProjectType = escapeHtml(projectType);
  const safeBrief = escapeHtml(brief);
  const replyEmail = getEmailFromContact(contact);

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px;color:#023E8A">Brief baru dari website Solivate Studio</h2>
      <p style="margin:0 0 20px;color:#4b5563">Ada pesan baru dari contact section website.</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:700;width:140px">Nama</td><td style="padding:8px 0">${safeName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Kontak</td><td style="padding:8px 0">${safeContact}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Jenis Proyek</td><td style="padding:8px 0">${safeProjectType}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Waktu</td><td style="padding:8px 0">${submittedAt}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f3f4f6">
        <strong>Brief proyek</strong>
        <p style="white-space:pre-wrap;margin:10px 0 0">${safeBrief}</p>
      </div>
    </div>
  `;

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || FALLBACK_FROM_EMAIL,
      to: [process.env.RESEND_TO_EMAIL || FALLBACK_TO_EMAIL],
      reply_to: replyEmail || undefined,
      subject: `Brief baru Solivate Studio - ${projectType}`,
      html,
      text: [
        "Brief baru dari website Solivate Studio",
        `Nama: ${name}`,
        `Kontak: ${contact}`,
        `Jenis Proyek: ${projectType}`,
        `Waktu: ${submittedAt}`,
        "",
        brief,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text();
    console.error("Resend email failed:", detail);
    return response.status(502).json({ message: "Email failed to send." });
  }

  await sql`INSERT INTO contact_submissions (ip_hash, contact) VALUES (${ipHash}, ${contact.slice(0, 180)})`;

  if (replyEmail) {
    const autoReplyHtml = `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.7;color:#111827">
        <h2 style="margin:0 0 16px;color:#023E8A">Brief kamu sudah diterima.</h2>
        <p>Halo ${safeName}, terima kasih sudah menghubungi Solivate Studio.</p>
        <p>Brief untuk <strong>${safeProjectType}</strong> sudah masuk ke tim kami. Kami akan meninjau kebutuhan, scope, dan catatan yang kamu kirim, lalu segera menghubungi kamu untuk langkah berikutnya.</p>
        <div style="margin:20px 0;padding:16px;border-radius:12px;background:#f3f4f6">
          <strong>Ringkasan brief:</strong>
          <p style="white-space:pre-wrap;margin:10px 0 0">${safeBrief}</p>
        </div>
        <p style="margin-top:22px;color:#4b5563">Jika ada tambahan informasi, kamu bisa langsung membalas email ini.</p>
        <p style="margin:24px 0 0;font-weight:700;color:#023E8A">Solivate Studio</p>
      </div>
    `;

    const autoReplyResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || FALLBACK_FROM_EMAIL,
        to: [replyEmail],
        reply_to: process.env.RESEND_TO_EMAIL || FALLBACK_TO_EMAIL,
        subject: "Brief kamu sudah diterima - Solivate Studio",
        html: autoReplyHtml,
        text: [
          `Halo ${name},`,
          "",
          "Terima kasih sudah menghubungi Solivate Studio.",
          `Brief untuk ${projectType} sudah masuk ke tim kami.`,
          "Kami akan meninjau kebutuhan, scope, dan catatan yang kamu kirim, lalu segera menghubungi kamu untuk langkah berikutnya.",
          "",
          "Ringkasan brief:",
          brief,
          "",
          "Solivate Studio",
        ].join("\n"),
      }),
    });

    if (!autoReplyResponse.ok) {
      const detail = await autoReplyResponse.text();
      console.error("Contact auto-reply failed:", detail);
    }
  }

  return response.status(200).json({ ok: true });
}
