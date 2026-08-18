"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { INTRO } from "@/lib/env";
import { initGsap, EASE } from "@/components/anim";

export default function LoadIn() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const de = document.documentElement;
    const finish = () => {
      de.classList.remove("intro");
      try {
        sessionStorage.setItem("gb_seen", "1");
      } catch {}
    };

    if (!INTRO || !el) {
      finish();
      return;
    }

    initGsap();
    const mark = el.querySelector(".loadin-mark");
    const tl = gsap.timeline({ onComplete: finish });
    tl.fromTo(
      mark,
      { autoAlpha: 0, y: 12, filter: "blur(6px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: EASE }
    ).to(
      el,
      { yPercent: -100, duration: 0.55, ease: EASE },
      0.52
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="loadin" aria-hidden="true">
      <span className="loadin-mark font-mono text-sm tracking-[0.14em] text-ink">
        GRIFFIN<span className="text-green">·</span>BRODIE
      </span>
    </div>
  );
}
