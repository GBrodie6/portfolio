"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "@/lib/env";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Lenis is the only source of smoothing: it drives ScrollTrigger.update from
 * the GSAP ticker, and the scene's timeline is scrubbed with no extra lag.
 * Touch scrolling stays native. Reduced motion: no Lenis, native anchors.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href") || "";
      const el = hash === "#top" ? document.body : document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(hash === "#top" ? 0 : (el as HTMLElement), {
          offset: -72,
          duration: 1.2,
          easing: easeInOutCubic,
        });
      } else {
        (el as HTMLElement).scrollIntoView({ block: "start" });
      }
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    if (REDUCED) return () => document.removeEventListener("click", onClick);

    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ autoRaf: false, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
