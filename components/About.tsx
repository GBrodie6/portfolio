"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ABOUT, STATS } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { revealGroup, observeOnce } from "@/components/anim";

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    const cleanups: Array<() => void> = [];
    const head = el.querySelector(".section-head");
    const body = el.querySelector(".about-body");
    if (head) cleanups.push(revealGroup(head));
    if (body) cleanups.push(revealGroup(body));

    el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
      cleanups.push(
        observeOnce(n, () => {
          const to = parseFloat(n.dataset.count || "0");
          const dec = parseInt(n.dataset.decimals || "0", 10);
          const suffix = n.dataset.suffix || "";
          const obj = { v: 0 };
          gsap.to(obj, {
            v: to,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              n.textContent = obj.v.toFixed(dec) + suffix;
            },
          });
        })
      );
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <section
      ref={scope}
      id="about"
      className="border-b border-line py-24 sm:py-32"
    >
      <div className="wrap">
        <div className="section-head mb-12 max-w-[640px] sm:mb-16">
          <p className="eyebrow mb-4" data-reveal>
            ABOUT
          </p>
          <h2
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            data-reveal
          >
            {ABOUT.heading}
          </h2>
        </div>
        <div className="about-body grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`max-w-[58ch] text-ink-soft ${i > 0 ? "mt-4" : ""}`}
                data-reveal
              >
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="stat" data-reveal>
                <span
                  className="font-mono text-[0.95rem] tracking-[0.02em] text-green-deep"
                  data-count={s.count?.to}
                  data-decimals={s.count?.decimals}
                  data-suffix={s.count?.suffix}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
