import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const targets = [
  { slug: "hammaddanfulanah", url: "https://hammaddanfulanah.solivate.com/" },
  { slug: "weddingpro", url: "https://weddingpro.solivate.com/" },
  { slug: "hbd-matt", url: "https://hbd-matt.solivate.com/" },
  { slug: "smk01", url: "https://smk01.solivate.com/" },
  { slug: "pedulisesama", url: "https://pedulisesama.solivate.com/" },
  { slug: "cpxindo", url: "https://cpxindo.id/" },
  { slug: "shofifrozen", url: "https://shofifrozen.com/" },
  { slug: "spectrasec", url: "https://spectrasec.xyz/" },
];

const outputDir = path.join(process.cwd(), "public", "images");

const dismissOverlays = async (page) => {
  const candidates = [
    "button:has-text('Accept')",
    "button:has-text('Setuju')",
    "button:has-text('OK')",
    "button:has-text('Tutup')",
    "button:has-text('Close')",
    "[aria-label='Close']",
  ];
  for (const selector of candidates) {
    const button = page.locator(selector).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 1000 }).catch(() => {});
    }
  }
};

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const target of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 45000 });
    await dismissOverlays(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1800);
    const imagePath = path.join(outputDir, `${target.slug}.png`);
    const meta = await page.evaluate(() => {
      const pick = (selector) => document.querySelector(selector)?.textContent?.trim() || "";
      return {
        title: document.title || "",
        h1: pick("h1"),
        h2: pick("h2"),
      };
    });
    await page.screenshot({
      path: imagePath,
      type: "png",
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
    console.log(`captured ${target.slug} | ${meta.title} | ${meta.h1 || meta.h2}`);
  } catch (error) {
    console.error(`failed ${target.slug}: ${error.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
