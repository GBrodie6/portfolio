"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MILESTONES, MILESTONES_HEAD } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { initGsap, EASE, observeOnce, revealGroup } from "@/components/anim";
import SplitHeading from "@/components/SplitHeading";
import Contours from "@/components/Contours";

export default function Milestones() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    initGsap();
    const cleanups: Array<() => void> = [];

    const head = el.querySelector(".section-head");
    if (head) cleanups.push(revealGroup(head));

    const line = el.querySelector(".ms-line-fill");
    const list = el.querySelector(".ms-list");
    if (line && list) {
      cleanups.push(
        observeOnce(list, () => {
          gsap.to(line, { scaleY: 1, duration: 1.1, ease: "power2.out" });
        })
      );
    }

    el.querySelectorAll<HTMLElement>(".ms-item").forEach((item) => {
      cleanups.push(
        observeOnce(item, () => {
          gsap.fromTo(
            item,
            { x: 18, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.7, ease: EASE }
          );
        })
      );
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={scope}
      id="milestones"
      className="relative overflow-hidden border-b border-line py-24 sm:py-32"
    >
      <Contours className="contours-ms" cx="12%" cy="70%" parallax={44} />
      <div className="wrap relative z-[1]">
        <div className="section-head mb-12 max-w-[640px] sm:mb-16">
          <p className="eyebrow mb-4" data-reveal>
            {MILESTONES_HEAD.eyebrow}
          </p>
          <SplitHeading
            text={MILESTONES_HEAD.heading}
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.01em]"
          />
        </div>
        <ol className="ms-list relative max-w-[720px]">
          <span className="ms-line" aria-hidden="true">
            <span className="ms-line-fill" />
          </span>
          {MILESTONES.map((m, i) => (
            <li key={i} className="ms-item" data-reveal>
              <span className="ms-node" aria-hidden="true" />
              <div>
                {m.year && <span className="ms-year">{m.year}</span>}
                <p className="text-[1.02rem] leading-snug text-ink">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
