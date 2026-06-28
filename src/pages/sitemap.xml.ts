import { allSeoUrls, siteUrl } from "../data/seo-pages";

export const GET = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSeoUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}/${url}</loc>
    <changefreq>${url ? "monthly" : "weekly"}</changefreq>
    <priority>${url ? "0.8" : "1.0"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
