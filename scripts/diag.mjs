import { chromium } from "playwright";
const URL = "https://griffinbrodie.vercel.app";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(URL, { waitUntil: "load" });
await page.mouse.move(640, 450);
// Scroll until the Work section top is near the middle of the viewport.
for (let i = 0; i < 60; i++) {
  const top = await page.evaluate(() => document.querySelector("#work").getBoundingClientRect().top);
  if (top < 300) break;
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(90);
}
await page.waitForTimeout(800);

const res = await page.evaluate(() => new Promise((resolve) => {
  const inner = document.querySelector(".card-shot-inner");
  const shot = document.querySelector(".card-shot");
  const innerRect = inner.getBoundingClientRect();
  const out = { innerTop: Math.round(innerRect.top), innerW: Math.round(innerRect.width), clip: getComputedStyle(inner).clipPath };
  let done = 0;
  const mk = (el, key) => new IntersectionObserver((es) => {
    out[key] = { isIntersecting: es[0].isIntersecting, ratio: +es[0].intersectionRatio.toFixed(2) };
    if (++done === 2) resolve(out);
  }, { threshold: 0, rootMargin: "0px 0px -12% 0px" }).observe(el);
  mk(inner, "innerIO");
  mk(shot, "shotIO");
  setTimeout(() => resolve({ ...out, note: "timeout", done }), 1500);
}));
console.log(JSON.stringify(res, null, 2));
await browser.close();
