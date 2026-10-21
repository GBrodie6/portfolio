"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "@/lib/env";
import { afterIdle } from "@/lib/idle";

/**
 * Graphite ground for the Engineering chapter. A fixed layer behind the bridge
 * whose clip edge follows the section's edges as it scrolls, so Concrete turns
 * to Graphite with a moving wipe. Over the same scroll range the bridge colors
 * cross to their on-dark values while the edge passes the bridge. All values
 * come from scroll progress.
 */
export default function ChapterWipe({ target }: { target: string }) {
  const ground = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ground.current;
    const sec = document.querySelector<HTMLElement>(target);
    if (!el || !sec || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const css = getComputedStyle(root);
    const v = (n: string) => css.getPropertyValue(n).trim();
    const light = {
      "--scene-structure": v("--c-graphite"),
      "--scene-cable": v("--c-blue"),
      "--scene-terrain": v("--c-graphite"),
      "--scene-water": v("--c-blue"),
      "--scene-ground": v("--c-concrete"),
    };
    const dark = {
      "--scene-structure": v("--c-chalk"),
      "--scene-cable": v("--c-spillway"),
      "--scene-terrain": v("--c-chalk"),
      "--scene-water": v("--c-spillway"),
      "--scene-ground": v("--c-graphite"),
    };

    let H = 0;
    let vh = 0;
    let ctx: gsap.Context | undefined;
    const cancel = afterIdle(() => {
    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        onRefresh: () => {
          H = sec.offsetHeight;
          vh = window.innerHeight;
        },
        onUpdate: (self) => {
          const top = vh - self.progress * (H + vh);
          const t = Math.min(vh, Math.max(0, top));
          const b = Math.min(vh, Math.max(0, vh - (top + H)));
          el.style.clipPath = `inset(${t}px 0 ${b}px 0)`;
        },
      });
      // The bridge sits in the lower part of the screen, so its colors cross
      // over while the wipe edge passes through that band, both ways.
      gsap.fromTo(root, light, {
        ...dark,
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top 55%", scrub: true },
      });
      gsap.fromTo(root, dark, {
        ...light,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: sec, start: "bottom bottom", end: "bottom 55%", scrub: true },
      });
    });
    });
    return () => {
      cancel();
      ctx?.revert();
      el.style.clipPath = "";
    };
  }, [target]);

  return <div ref={ground} className="chapter-ground" aria-hidden="true" />;
}
