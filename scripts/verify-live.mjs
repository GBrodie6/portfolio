import { chromium } from "playwright";

const OUT = process.argv[2] || "verify-work.png";
const URL = "https://griffinbrodie.vercel.app";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(URL, { waitUntil: "load" });

// Scroll through the whole page slowly so IntersectionObserver reveals fire and
// lazy images load, exactly like a real visitor.
await page.evaluate(async () => {
  const step = 400;
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});

// Wait for all work screenshots to be fully decoded.
await page.waitForFunction(() => {
  const imgs = Array.from(document.querySelectorAll('img[alt*="screenshot"]'));
  return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
}, { timeout: 20000 });

// Report their state, then screenshot just the Work section.
const info = await page.$$eval('img[alt*="screenshot"]', (imgs) =>
  imgs.map((i) => ({ alt: i.alt.split(" — ")[0], w: i.naturalWidth, h: i.naturalHeight }))
);
console.log(JSON.stringify(info, null, 0));

await page.locator("#work").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.locator("#work").screenshot({ path: OUT });
await browser.close();
console.log("saved " + OUT);
