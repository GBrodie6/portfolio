// Dev-only: render public/og-image.png (1200x630) from an HTML template using
// the site's design tokens and fonts. Run with: node scripts/og.mjs
import { chromium } from "playwright";

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@500&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #F2F5EE; color: #16201A; font-family: "IBM Plex Sans", sans-serif;
    background-image:
      linear-gradient(rgba(51,96,127,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(51,96,127,0.07) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .frame { position: absolute; inset: 36px; border: 1px solid #CBD2C1; border-radius: 14px; }
  .copy { position: absolute; left: 84px; top: 0; bottom: 0; width: 600px;
    display: flex; flex-direction: column; justify-content: center; }
  .badge { display: inline-block; align-self: flex-start; margin-bottom: 30px;
    padding: 9px 16px; border: 1.5px solid #1F5D42; border-radius: 999px;
    font: 500 15px "IBM Plex Mono", monospace; letter-spacing: 0.1em; color: #1F5D42; }
  h1 { font: 700 104px/0.95 "Space Grotesk", sans-serif; letter-spacing: -0.03em; }
  p { margin-top: 28px; max-width: 520px; font-size: 27px; line-height: 1.35; color: #3a463e; }
  svg { position: absolute; right: 70px; top: 165px; width: 440px; height: 300px; overflow: visible; }
  .l { fill: none; stroke: #1F5D42; stroke-width: 2.2; stroke-dasharray: 3 7; stroke-linecap: round; }
  .t { font: 500 12px "IBM Plex Mono", monospace; fill: #3a463e; letter-spacing: 0.1em; }
</style></head>
<body>
  <div class="frame"></div>
  <div class="copy">
    <span class="badge">ENGINEERING · ROBOTICS · SOFTWARE</span>
    <h1>Griffin<br>Brodie</h1>
    <p>Civil engineering applicant, class of 2027. Madison, CT.</p>
  </div>
  <svg viewBox="0 0 400 240">
    <path class="l" d="M200,54 L64,186" />
    <path class="l" d="M64,186 L336,186" />
    <path class="l" d="M336,186 L200,54" />
    <circle cx="200" cy="54" r="6" fill="#C97A2B" />
    <circle cx="64" cy="186" r="6" fill="#16201A" />
    <circle cx="336" cy="186" r="6" fill="#16201A" />
    <text class="t" x="200" y="36" text-anchor="middle">CIVIL</text>
    <text class="t" x="64" y="212" text-anchor="middle">ROBOTICS</text>
    <text class="t" x="336" y="212" text-anchor="middle">SOFTWARE</text>
  </svg>
</body></html>`;

const browser = await chromium.launch(
  process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {}
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og-image.png" });
await browser.close();
console.log("wrote public/og-image.png");
