"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REDUCED } from "@/lib/env";

/**
 * A number that counts up once when it enters view. The final value is in the
 * markup, so it reads correctly without JS, with reduced motion, and for
 * screen readers (the animated text is aria-hidden).
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) =>
    prefix + v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const final = fmt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: value,
          duration: 1.1,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = fmt(obj.v);
          },
        });
      },
    });
    return () => st.kill();
  }, [value, decimals, prefix, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}
