import { put } from "@vercel/blob";
import { requireAdmin } from "../_lib/auth.js";
import { fail, methodNotAllowed } from "../_lib/http.js";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method !== "POST") return methodNotAllowed(response, ["POST"]);
  if (!requireAdmin(request, response)) return;

  try {
    const contentType = String(request.headers["content-type"] || "");
    const contentLength = Number(request.headers["content-length"] || 0);
    if (!ALLOWED_TYPES.has(contentType)) {
      return response
        .status(400)
        .json({ message: "Upload hanya menerima JPG, PNG, WebP, PDF, DOC, atau DOCX." });
    }
    if (contentLength > MAX_BYTES) {
      return response
        .status(400)
        .json({ message: "Ukuran file maksimal 4MB." });
    }

    const filename = String(request.query?.filename || "image.webp")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 90);

    const blob = await put(`cms/${Date.now()}-${filename}`, request, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });

    return response.status(200).json({ url: blob.url });
  } catch (error) {
    if (String(error?.message || "").includes("BLOB_READ_WRITE_TOKEN")) {
      return response
        .status(503)
        .json({
          message: "BLOB_READ_WRITE_TOKEN belum dikonfigurasi di Vercel.",
        });
    }
    return fail(response, error);
  }
}
