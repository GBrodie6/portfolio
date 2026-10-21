// Dev-only: render public/og-image.png (1200x630) in the site's brand (see
// BRAND.md). Run with: PW_EXEC=/path/to/chromium node scripts/og.mjs
import { chromium } from "playwright";

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Public+Sans:wght@400&display=block" rel="stylesheet">
<style>
  :root { --concrete:#E2E0DA; --graphite:#17191C; --blue:#1D5A9E; --steel:#5B6168; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: var(--concrete); color: var(--graphite); font-family: "Public Sans", sans-serif; }
  h1 { position: absolute; left: 64px; top: 70px; font: 900 196px/0.86 "Big Shoulders Display", sans-serif;
    text-transform: uppercase; letter-spacing: -0.01em; }
  .rule { position: absolute; left: 66px; top: 440px; width: 136px; height: 3px; background: var(--blue); }
  p { position: absolute; left: 64px; top: 462px; font-size: 30px; max-width: 600px; line-height: 1.35; }
  svg { position: absolute; right: -120px; bottom: 0; width: 700px; height: 630px; }
</style></head>
<body>
  <h1>Griffin<br>Brodie</h1>
  <span class="rule"></span>
  <p>Madison, CT, class of 2027, applying to study civil engineering.</p>
  <svg viewBox="0 0 700 630">
    <g stroke="#1D5A9E" stroke-width="1.6" fill="none">
      ${Array.from({ length: 9 }, (_, i) => `<path d="M498 ${120 + i * 14}L${520 + (i + 1) * 20} 520"/>`).join("")}
      ${Array.from({ length: 6 }, (_, i) => `<path d="M490 ${120 + i * 20}L${480 - (i + 1) * 30} 520"/>`).join("")}
    </g>
    <path d="M486 600L490 108H502L506 600Z" fill="#17191C"/>
    <rect x="290" y="520" width="410" height="10" fill="#17191C"/>
  </svg>
</body></html>`;

const browser = await chromium.launch(process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.png" });
await browser.close();
console.log("wrote public/og-image.png");
