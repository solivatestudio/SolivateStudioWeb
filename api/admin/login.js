import { createSession, sessionCookie, verifyPassword } from "../_lib/auth.js";
import { jsonBody, methodNotAllowed, fail } from "../_lib/http.js";

export default async function handler(request, response) {
  if (request.method !== "POST") return methodNotAllowed(response, ["POST"]);
  try {
    const { username = "", password = "" } = jsonBody(request);
    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    if (String(username).trim() !== expectedUser || !verifyPassword(String(password))) {
      return response.status(401).json({ message: "Username atau password salah." });
    }
    response.setHeader("Set-Cookie", sessionCookie(createSession(expectedUser)));
    return response.status(200).json({ ok: true, username: expectedUser });
  } catch (error) {
    return fail(response, error);
  }
}
