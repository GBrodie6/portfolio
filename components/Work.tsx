"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { WORK } from "@/lib/content";
import { REDUCED, FINE_POINTER } from "@/lib/env";
import { staggerIn } from "@/components/anim";

export default function Work() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (REDUCED) return;
      const el = scope.current;
      if (!el) return;
      const head = el.querySelector(".section-head");
      const grid = el.querySelector(".work-grid");
      if (head) staggerIn(head.querySelectorAll("[data-reveal]"), head);
      if (grid) staggerIn(grid.querySelectorAll("[data-reveal]"), grid);

      if (!FINE_POINTER || !grid) return;
      const cards = grid.querySelectorAll<HTMLElement>(".card");
      const cleanups: Array<() => void> = [];
      cards.forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rx((0.5 - py) * 6);
          ry((px - 0.5) * 8);
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      id="work"
      className="border-b border-line py-24 sm:py-32"
    >
      <div className="wrap">
        <div className="section-head mb-12 max-w-[720px] sm:mb-16">
          <p className="eyebrow mb-4" data-reveal>
            SELECTED WORK
          </p>
          <h2
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.01em]"
            data-reveal
          >
            Five things I&apos;ve built and actually shipped, front end to backend.
          </h2>
        </div>
        <div
          className="work-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1100px" }}
        >
          {WORK.map((p) => (
            <article
              key={p.title}
              className="card card-spot flex flex-col gap-3.5"
              data-reveal
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-[1.25rem] font-semibold">
                  {p.title}
                </h3>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="whitespace-nowrap border-b border-green-deep pb-px font-mono text-[0.7rem] tracking-[0.06em] text-green-deep no-underline"
                  >
                    VISIT ↗
                  </a>
                )}
              </div>
              <p className="text-[0.95rem] text-ink-soft">{p.body}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
