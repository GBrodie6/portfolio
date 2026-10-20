"use client";

import { useEffect, useRef } from "react";
import { LEADERSHIP, LEADERSHIP_HEAD } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { revealGroup } from "@/components/anim";
import SplitHeading from "@/components/SplitHeading";

export default function Leadership() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    const cleanups: Array<() => void> = [];
    const head = el.querySelector(".section-head");
    const grid = el.querySelector(".lead-grid");
    if (head) cleanups.push(revealGroup(head));
    if (grid) cleanups.push(revealGroup(grid));
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={scope}
      id="leadership"
      className="border-b border-line py-24 sm:py-32"
    >
      <div className="wrap">
        <div className="section-head mb-12 max-w-[640px] sm:mb-16">
          <p className="eyebrow mb-4" data-reveal>
            {LEADERSHIP_HEAD.eyebrow}
          </p>
          <SplitHeading
            text={LEADERSHIP_HEAD.heading}
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.01em]"
          />
        </div>
        <div className="lead-grid grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((b) => (
            <div key={b.title} className="border-t border-line pt-5" data-reveal>
              <h3 className="mb-2 font-display text-[1.1rem] font-semibold">
                {b.title}
              </h3>
              <p className="text-[0.95rem] text-ink-soft">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
