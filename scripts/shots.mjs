// Dev-only: capture a screenshot of each live project and write an optimized
// webp into public/work/. Run with: node scripts/shots.mjs [name ...]
// (pass names to capture only those sites)
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const sites = [
  { name: "golftradr", url: "https://golftradr.com" },
  { name: "gripfitr", url: "https://gripfitr.com" },
  { name: "shoreline", url: "https://shoreline-golf.com" },
  { name: "tripleg", url: "https://triple-g-landscaping.com" },
  { name: "paige", url: "https://paigegrendi-babysitting.vercel.app" },
  { name: "wikidash", url: "https://wikidash3.higgsfield.app" },
];
const only = process.argv.slice(2);

await mkdir("public/work", { recursive: true });
const browser = await chromium.launch(
  process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {}
);

for (const s of sites) {
  if (only.length && !only.includes(s.name)) continue;
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true,
  });
  try {
    await page.goto(s.url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(3800); // let fonts + hero animation settle
    const buf = await page.screenshot({
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    await sharp(buf)
      .resize(1200, 750, { fit: "cover", position: "top" })
      .webp({ quality: 80 })
      .toFile(`public/work/${s.name}.webp`);
    console.log("OK", s.name);
  } catch (e) {
    console.error("FAIL", s.name, e.message);
  }
  await page.close();
}

await browser.close();
console.log("done");
