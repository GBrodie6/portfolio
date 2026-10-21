"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "@/lib/env";
import { afterIdle } from "@/lib/idle";

/**
 * A line of very large text, sourced facts only, that drifts sideways as the
 * page scrolls past it. Static with reduced motion. Decorative, since every
 * item is stated elsewhere on the page.
 */
export default function TextBand({ items, direction = -1 }: { items: string[]; direction?: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    let tw: gsap.core.Tween | undefined;
    const cancel = afterIdle(() => {
    tw = gsap.fromTo(
      el.firstElementChild,
      { xPercent: direction < 0 ? 0 : -25 },
      {
        xPercent: direction < 0 ? -25 : 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
    });
    return () => {
      cancel();
      tw?.scrollTrigger?.kill();
      tw?.kill();
    };
  }, [direction]);
  const row = [...items, ...items];
  return (
    <div ref={ref} className="band" aria-hidden="true">
      <div className="band-row display">
        {row.map((t, i) => (
          <span key={i} className="band-item">
            {t}
            <span className="band-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}
