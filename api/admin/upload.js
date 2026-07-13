import { requireAdmin } from "../_lib/auth.js";
import { fail, methodNotAllowed } from "../_lib/http.js";
import { UTApi, UTFile } from "uploadthing/server";

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

    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);

    const file = new UTFile(chunks, filename, {
      type: contentType,
      customId: `cms/${Date.now()}-${filename}`,
    });
    const uploaded = await new UTApi().uploadFiles(file);

    if (uploaded.error) {
      throw new Error(uploaded.error.message || "Upload gagal.");
    }

    return response.status(200).json({
      url: uploaded.data?.ufsUrl,
      key: uploaded.data?.key,
    });
  } catch (error) {
    if (String(error?.message || "").includes("UPLOADTHING_TOKEN")) {
      return response
        .status(503)
        .json({
          message: "UPLOADTHING_TOKEN belum dikonfigurasi di Vercel.",
        });
    }
    return fail(response, error);
  }
}
