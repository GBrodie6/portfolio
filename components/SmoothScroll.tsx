"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "@/lib/env";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href") || "";
      if (hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
      } else {
        (el as HTMLElement).scrollIntoView({ block: "start" });
      }
    };

    // Reduced motion: no smooth scroll, native anchor jumps only.
    if (REDUCED) {
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    }

    lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", () => ScrollTrigger.update());
    const raf = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", onClick);

    // Re-measure once web fonts have loaded (they shift layout), so scroll
    // reveals for content that is already in view fire at correct positions.
    const refresh = () => ScrollTrigger.refresh();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
