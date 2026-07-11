import { clearSessionCookie } from "../_lib/auth.js";
import { methodNotAllowed } from "../_lib/http.js";

export default function handler(request, response) {
  if (request.method !== "POST") return methodNotAllowed(response, ["POST"]);
  response.setHeader("Set-Cookie", clearSessionCookie());
  return response.status(200).json({ ok: true });
}
