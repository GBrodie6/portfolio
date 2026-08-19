"use client";

import { useEffect, useRef } from "react";
import { ENGINEERING } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { revealGroup, observeOnce } from "@/components/anim";
import SplitHeading from "@/components/SplitHeading";

export default function Engineering() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    const cleanups: Array<() => void> = [];
    const head = el.querySelector(".section-head");
    const grid = el.querySelector(".eng-grid");
    if (head) cleanups.push(revealGroup(head));
    if (grid) cleanups.push(revealGroup(grid));
    const bp = el.querySelector(".blueprint");
    if (bp) cleanups.push(observeOnce(el, () => bp.classList.add("in")));
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={scope}
      id="engineering"
      className="relative overflow-hidden border-b border-line py-24 sm:py-32"
    >
      <div className="blueprint" aria-hidden="true" data-parallax="70" />
      <div className="wrap relative z-[1]">
        <div className="section-head mb-12 max-w-[640px] sm:mb-16">
          <p className="eyebrow mb-4" data-reveal>
            ENGINEERING
          </p>
          <SplitHeading
            text="How I actually build"
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.01em]"
          />
          <p className="mt-4 max-w-[52ch] text-ink-soft" data-reveal>
            The parts of the work that don&apos;t show up in a screenshot.
          </p>
        </div>
        <div className="eng-grid grid gap-8 md:grid-cols-3">
          {ENGINEERING.map((b) => (
            <div key={b.title} className="border-t border-line pt-5" data-reveal>
              <h3 className="mb-2.5 font-display text-[1.15rem] font-semibold">
                {b.title}
              </h3>
              <p className="text-ink-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
