"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { WORK } from "@/lib/content";
import { REDUCED, FINE_POINTER } from "@/lib/env";
import { revealGroup, observeOnce, initGsap } from "@/components/anim";
import SplitHeading from "@/components/SplitHeading";

export default function Work() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    initGsap();
    const cleanups: Array<() => void> = [];
    const head = el.querySelector(".section-head");
    const grid = el.querySelector(".work-grid");
    if (head) cleanups.push(revealGroup(head));
    if (grid) cleanups.push(revealGroup(grid));

    // Clip-path wipe on each screenshot as its card scrolls into view, driven by
    // a CSS transition + `.in` class. Observe the *unclipped* `.card-shot`: an
    // element whose clip-path collapses it to zero area never reports as
    // intersecting, so observing `.card-shot-inner` itself would never fire.
    el.querySelectorAll<HTMLElement>(".card-shot").forEach((shot) => {
      const inner = shot.querySelector<HTMLElement>(".card-shot-inner");
      if (!inner) return;
      cleanups.push(observeOnce(shot, () => inner.classList.add("in")));
    });

    // Subtle 3D tilt + a few px of image parallax on cursor.
    if (FINE_POINTER && grid) {
      grid.querySelectorAll<HTMLElement>(".card").forEach((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
        const inner = card.querySelector<HTMLElement>(".card-shot-inner");
        const ix = inner ? gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3" }) : null;
        const iy = inner ? gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3" }) : null;
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rx((0.5 - py) * 5);
          ry((px - 0.5) * 6);
          if (ix && iy) {
            ix((px - 0.5) * 10);
            iy((py - 0.5) * 8);
          }
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
        };
        const leave = () => {
          rx(0);
          ry(0);
          if (ix && iy) {
            ix(0);
            iy(0);
          }
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });
    }
    return () => cleanups.forEach((c) => c());
  }, []);

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
          <SplitHeading
            text="Five things I've built and actually shipped, front end to backend."
            className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.06] tracking-[-0.01em]"
          />
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
              {p.shot && (
                <div className="card-shot">
                  <div className="card-shot-inner">
                    <Image
                      src={p.shot}
                      alt={`${p.title} — screenshot of the live site`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              )}
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
