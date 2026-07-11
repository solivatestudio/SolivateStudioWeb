import { requireAdmin } from "../_lib/auth.js";
import { methodNotAllowed } from "../_lib/http.js";

export default function handler(request, response) {
  if (request.method !== "GET") return methodNotAllowed(response, ["GET"]);
  const session = requireAdmin(request, response);
  if (!session) return;
  return response.status(200).json({ username: session.username });
}
