"use client";

import { useEffect } from "react";
import { REDUCED } from "@/lib/env";

/**
 * Lightweight scroll parallax for background decor ([data-parallax] = px of
 * travel). Uses window scroll (Lenis drives it) + rAF, no ScrollTrigger, and
 * is disabled entirely under reduced motion.
 */
export default function Parallax() {
  useEffect(() => {
    if (REDUCED) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!els.length) return;

    const measure = (el: HTMLElement) => ({
      el,
      range: parseFloat(el.dataset.parallax || "40"),
      start: el.getBoundingClientRect().top + window.scrollY,
      h: el.offsetHeight,
    });
    let items = els.map(measure);

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      const sy = window.scrollY;
      for (const it of items) {
        const progress = (sy + vh - it.start) / (vh + it.h);
        const clamped = Math.max(0, Math.min(1, progress));
        const y = (clamped - 0.5) * it.range;
        it.el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => {
      items.forEach((it) => (it.el.style.transform = ""));
      items = els.map(measure);
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      items.forEach((it) => (it.el.style.transform = ""));
    };
  }, []);

  return null;
}
