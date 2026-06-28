import type { APIRoute } from "astro";

export const prerender = false;

const RESEND_API_URL = "https://api.resend.com/emails";
const FALLBACK_TO_EMAIL = "solivatestudio@gmail.com";
const FALLBACK_FROM_EMAIL = "Solivate Studio <onboarding@resend.dev>";

const clean = (value: unknown) => String(value ?? "").trim();
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json({ message: "Resend API key is not configured." }, { status: 500 });
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name);
  const contact = clean(payload.contact);
  const projectType = clean(payload.projectType);
  const brief = clean(payload.brief);

  if (!name || !contact || !projectType || !brief) {
    return Response.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (name.length > 120 || contact.length > 160 || projectType.length > 120 || brief.length > 4000) {
    return Response.json({ message: "Submitted content is too long." }, { status: 400 });
  }

  const submittedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta"
  }).format(new Date());
  const safeName = escapeHtml(name);
  const safeContact = escapeHtml(contact);
  const safeProjectType = escapeHtml(projectType);
  const safeBrief = escapeHtml(brief);

  const emailHtml = `
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

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || FALLBACK_FROM_EMAIL,
      to: [process.env.RESEND_TO_EMAIL || FALLBACK_TO_EMAIL],
      reply_to: contact.includes("@") ? contact : undefined,
      subject: `Brief baru Solivate Studio - ${projectType}`,
      html: emailHtml,
      text: [
        "Brief baru dari website Solivate Studio",
        `Nama: ${name}`,
        `Kontak: ${contact}`,
        `Jenis Proyek: ${projectType}`,
        `Waktu: ${submittedAt}`,
        "",
        brief
      ].join("\n")
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend email failed:", detail);
    return Response.json({ message: "Email failed to send." }, { status: 502 });
  }

  return Response.json({ ok: true });
};
