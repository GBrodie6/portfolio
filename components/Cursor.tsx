"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { REDUCED, FINE_POINTER } from "@/lib/env";

const INTERACTIVE = 'a, button, [role="button"], .card, .stat';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED || !FINE_POINTER) return;
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    const xTo = gsap.quickTo(el, "x", { duration: 0.32, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.32, ease: "power3" });

    let activated = false;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!activated) {
        activated = true;
        root.classList.add("has-cursor");
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement | null;
      el.classList.toggle("is-active", !!t?.closest?.(INTERACTIVE));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      root.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
