import { turnstileToken, verifyTurnstile } from "./_lib/turnstile.js";

const RESEND_API_URL = "https://api.resend.com/emails";
const FALLBACK_TO_EMAIL = "solivatestudio@gmail.com";
const FALLBACK_FROM_EMAIL = "Solivate Studio <onboarding@resend.dev>";

const clean = (value) => String(value ?? "").trim();
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const getSafeHttpUrl = (value) => {
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol)
      ? parsed.toString()
      : "";
  } catch {
    return "";
  }
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
  const email = clean(payload.email);
  const whatsapp = clean(payload.whatsapp);
  const position = clean(payload.position);
  const portfolio = clean(payload.portfolio);
  const reason = clean(payload.reason);
  const message = clean(payload.message);

  if (!name || !email || !whatsapp || !position || !portfolio || !reason) {
    return response
      .status(400)
      .json({ message: "Please complete all required fields." });
  }

  if (!isValidEmail(email)) {
    return response
      .status(400)
      .json({ message: "Please use a valid email address." });
  }

  const portfolioUrl = getSafeHttpUrl(portfolio);

  if (!portfolioUrl) {
    return response
      .status(400)
      .json({ message: "Please use a valid portfolio or CV URL." });
  }

  if (
    name.length > 120 ||
    email.length > 160 ||
    whatsapp.length > 40 ||
    position.length > 120 ||
    portfolio.length > 300 ||
    reason.length > 4000 ||
    message.length > 2000
  ) {
    return response
      .status(400)
      .json({ message: "Submitted content is too long." });
  }

  const submittedAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeWhatsapp = escapeHtml(whatsapp);
  const safePosition = escapeHtml(position);
  const safePortfolio = escapeHtml(portfolioUrl);
  const safeReason = escapeHtml(reason);
  const safeMessage = escapeHtml(message);

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px;color:#023E8A">Pendaftaran Hiring Baru - Solivate Studio</h2>
      <p style="margin:0 0 20px;color:#4b5563">Ada pendaftaran seleksi baru dari halaman hiring website.</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:700;width:160px">Nama Lengkap</td><td style="padding:8px 0">${safeName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Nomor WhatsApp</td><td style="padding:8px 0"><a href="https://wa.me/${safeWhatsapp.replace(/\D/g, "")}">${safeWhatsapp}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Posisi Dilamar</td><td style="padding:8px 0;font-weight:700;color:#00B4D8">${safePosition}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Link Portofolio / CV</td><td style="padding:8px 0"><a href="${safePortfolio}" target="_blank" rel="noopener noreferrer">${safePortfolio}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Waktu Kirim</td><td style="padding:8px 0">${submittedAt}</td></tr>
      </table>
      
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f3f4f6">
        <strong>Alasan Ingin Bergabung:</strong>
        <p style="white-space:pre-wrap;margin:10px 0 0">${safeReason}</p>
      </div>
      
      ${
        message
          ? `
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f3f4f6">
        <strong>Pesan Tambahan:</strong>
        <p style="white-space:pre-wrap;margin:10px 0 0">${safeMessage}</p>
      </div>
      `
          : ""
      }
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
      reply_to: email,
      subject: `[Recruitment] ${safeName} - ${safePosition}`,
      html,
      text: [
        "Pendaftaran Hiring Baru - Solivate Studio",
        `Nama Lengkap: ${name}`,
        `Email: ${email}`,
        `WhatsApp: ${whatsapp}`,
        `Posisi Dilamar: ${position}`,
        `Link Portofolio: ${portfolioUrl}`,
        `Waktu Kirim: ${submittedAt}`,
        "",
        `Alasan Bergabung:\n${reason}`,
        "",
        message ? `Pesan Tambahan:\n${message}` : "",
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text();
    console.error("Resend hiring email failed:", detail);
    return response.status(502).json({ message: "Email failed to send." });
  }

  const autoReplyHtml = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.7;color:#111827">
      <h2 style="margin:0 0 16px;color:#023E8A">Pendaftaran kamu sudah diterima.</h2>
      <p>Halo ${safeName}, terima kasih sudah mendaftar untuk bergabung bersama Solivate Studio.</p>
      <p>Pendaftaran kamu untuk posisi <strong>${safePosition}</strong> sudah masuk ke tim kami. Kami akan meninjau data, portfolio/CV, dan alasan kamu ingin bergabung, lalu menghubungi kandidat yang sesuai melalui WhatsApp atau email.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:18px">
        <tr><td style="padding:8px 0;font-weight:700;width:150px">Posisi</td><td style="padding:8px 0">${safePosition}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">WhatsApp</td><td style="padding:8px 0">${safeWhatsapp}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Portfolio/CV</td><td style="padding:8px 0"><a href="${safePortfolio}" target="_blank" rel="noopener noreferrer">${safePortfolio}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Waktu kirim</td><td style="padding:8px 0">${submittedAt}</td></tr>
      </table>
      <p style="margin-top:22px;color:#4b5563">Jika ada update portfolio atau informasi tambahan, kamu bisa membalas email ini.</p>
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
      to: [email],
      reply_to: process.env.RESEND_TO_EMAIL || FALLBACK_TO_EMAIL,
      subject: "Pendaftaran kamu sudah diterima - Solivate Studio",
      html: autoReplyHtml,
      text: [
        `Halo ${name},`,
        "",
        "Terima kasih sudah mendaftar untuk bergabung bersama Solivate Studio.",
        `Pendaftaran kamu untuk posisi ${position} sudah masuk ke tim kami.`,
        "Kami akan meninjau data, portfolio/CV, dan alasan kamu ingin bergabung, lalu menghubungi kandidat yang sesuai melalui WhatsApp atau email.",
        "",
        `Posisi: ${position}`,
        `WhatsApp: ${whatsapp}`,
        `Portfolio/CV: ${portfolioUrl}`,
        `Waktu kirim: ${submittedAt}`,
        "",
        "Solivate Studio",
      ].join("\n"),
    }),
  });

  if (!autoReplyResponse.ok) {
    const detail = await autoReplyResponse.text();
    console.error("Hiring auto-reply failed:", detail);
  }

  return response.status(200).json({ ok: true });
}
