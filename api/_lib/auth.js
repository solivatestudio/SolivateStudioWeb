import crypto from "node:crypto";

const COOKIE_NAME = "solivate_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

function secret() {
  if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET is not configured.");
  return process.env.SESSION_SECRET;
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("base64url");
}

export function verifyPassword(password) {
  const expected = process.env.ADMIN_PASSWORD_HASH;
  if (!expected) throw new Error("ADMIN_PASSWORD_HASH is not configured.");
  if (expected.startsWith("scrypt:")) {
    const [, salt, hash] = expected.split(":");
    if (!salt || !hash) return false;
    const actual = crypto.scryptSync(password, salt, 64).toString("hex");
    return safeEqual(actual, hash);
  }
  if (expected.startsWith("sha256:")) {
    const actual = crypto.createHash("sha256").update(password).digest("hex");
    return safeEqual(actual, expected.slice(7));
  }
  return false;
}

export function createSession(username) {
  const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function sessionCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}${secure}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
}

export function readSession(request) {
  const cookie = String(request.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return null;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export function requireAdmin(request, response) {
  const session = readSession(request);
  if (!session) {
    response.status(401).json({ message: "Unauthorized." });
    return null;
  }
  return session;
}
