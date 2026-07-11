export function jsonBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function methodNotAllowed(response, methods) {
  response.setHeader("Allow", methods.join(", "));
  return response.status(405).json({ message: "Method not allowed." });
}

export function fail(response, error) {
  console.error(error);
  const missingConfig = String(error?.message || "").includes("not configured");
  return response.status(missingConfig ? 503 : 500).json({
    message: missingConfig ? error.message : "Unexpected server error."
  });
}
