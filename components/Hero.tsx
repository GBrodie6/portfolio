"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { HERO } from "@/lib/content";
import { INTRO, REDUCED } from "@/lib/env";
import { initGsap, EASE } from "@/components/anim";
import Contours from "@/components/Contours";

const WORDS = HERO.headline.split(" ");

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (REDUCED) return;
      initGsap();
      const q = gsap.utils.selector(scope);
      const delay = INTRO ? 0.65 : 0.12;

      // Pre-hide the schematic (the copy is hidden via the [data-hero] CSS guard).
      gsap.set(q(".sch-svg"), { autoAlpha: 0 });
      gsap.set(q(".sch-line"), { strokeDashoffset: 64 });
      gsap.set(q(".sch-node"), { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".sch-label"), { autoAlpha: 0, y: 6 });

      const tl = gsap.timeline({ delay, defaults: { ease: EASE } });

      tl.fromTo(q(".hero-eyebrow"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 })
        .fromTo(
          q(".hero-word"),
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.055 },
          "-=0.25"
        )
        .fromTo(q(".hero-lede"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.5")
        .fromTo(q(".hero-ctas"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.45")
        // schematic draws in alongside the headline
        .to(q(".sch-svg"), { autoAlpha: 1, duration: 0.5 }, 0.15)
        .to(q(".sch-line"), { strokeDashoffset: 0, duration: 1.0, ease: "power2.out", stagger: 0.16 }, 0.3)
        .to(q(".sch-node"), { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(2)" }, 0.9)
        .to(q(".sch-label"), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 1.05);
    },
    { scope }
  );

  return (
    <header
      ref={scope}
      id="top"
      className="relative overflow-hidden border-b border-line pt-32 sm:pt-40"
    >
      <Contours cx="90%" cy="24%" parallax={-38} className="contours-hero" />
      <div className="wrap relative z-[1] grid items-center gap-10 pb-20 sm:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hero-eyebrow eyebrow mb-5" data-hero>
            {HERO.eyebrow}
          </p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.3rem,5.4vw,3.7rem)] font-bold leading-[1.03] tracking-[-0.02em] text-ink">
            {WORDS.map((w, i) => (
              <Fragment key={i}>
                <span className="hero-word inline-block" data-hero>
                  {w}
                </span>
                {i < WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </h1>
          <p
            className="hero-lede mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink-soft"
            data-hero
          >
            {HERO.lede}
          </p>
          <div className="hero-ctas mt-8 flex flex-wrap gap-3.5" data-hero>
            <a href="#work" className="btn btn-primary">
              See the work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
          <svg
            className="sch-svg h-auto w-full overflow-visible"
            viewBox="0 0 400 240"
            role="img"
            aria-label="Schematic linking civil engineering, robotics, and software"
          >
            <path className="sch-line" d="M200,54 L64,186" />
            <path className="sch-line" d="M64,186 L336,186" />
            <path className="sch-line" d="M336,186 L200,54" />
            <circle className="sch-node accent" cx="200" cy="54" r="5" />
            <circle className="sch-node" cx="64" cy="186" r="5" />
            <circle className="sch-node" cx="336" cy="186" r="5" />
            <text className="sch-label" x="200" y="38" textAnchor="middle">
              CIVIL
            </text>
            <text className="sch-label" x="64" y="208" textAnchor="middle">
              ROBOTICS
            </text>
            <text className="sch-label" x="336" y="208" textAnchor="middle">
              SOFTWARE
            </text>
          </svg>
        </div>
      </div>
    </header>
  );
}
