// Dev-only: capture a screenshot of each live project and write an optimized
// webp into public/work/. Run with: node scripts/shots.mjs [name ...]
// (pass names to capture only those sites)
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const sites = [
  { name: "golftradr", url: "https://golftradr.com" },
  { name: "gripfitr", url: "https://gripfitr.com" },
  // `blur`: regions (in the 1200x750 output) blurred so no phone number
  // appears in any screenshot on the site.
  {
    name: "shoreline",
    url: "https://shoreline-golf.com",
    blur: [{ left: 1016, top: 22, width: 98, height: 24 }],
  },
  {
    name: "tripleg",
    url: "https://triple-g-landscaping.com",
    blur: [
      { left: 988, top: 20, width: 96, height: 26 },
      { left: 316, top: 512, width: 108, height: 30 },
    ],
  },
  { name: "paige", url: "https://paigegrendi-babysitting.vercel.app" },
  { name: "wikidash", url: "https://wikidash3.higgsfield.app" },
];
const only = process.argv.slice(2);

/** Blurred patches of `img` for each region, ready for sharp.composite. */
export async function blurred(img, regions) {
  return Promise.all(
    regions.map(async (r) => ({
      input: await sharp(img).extract(r).blur(6).toBuffer(),
      left: r.left,
      top: r.top,
    }))
  );
}

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
    const shot = await sharp(buf)
      .resize(1200, 750, { fit: "cover", position: "top" })
      .toBuffer();
    await sharp(shot)
      .composite(await blurred(shot, s.blur || []))
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
