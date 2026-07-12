const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileToken(payload) {
  return String(payload?.turnstileToken || payload?.["cf-turnstile-response"] || "").trim();
}

export function requestIp(request) {
  return String(request.headers["x-forwarded-for"] || request.headers["x-real-ip"] || "")
    .split(",")[0]
    .trim();
}

export async function verifyTurnstile(token, request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return process.env.NODE_ENV === "production"
      ? { ok: false, message: "Turnstile is not configured." }
      : { ok: true, skipped: true };
  }
  if (!token) return { ok: false, message: "Please complete the verification." };

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  const ip = requestIp(request);
  if (ip) body.set("remoteip", ip);

  const verification = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = await verification.json().catch(() => ({}));
  return result.success
    ? { ok: true }
    : { ok: false, message: "Verification failed. Please try again." };
}
