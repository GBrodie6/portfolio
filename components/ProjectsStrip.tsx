"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { afterIdle } from "@/lib/idle";
import SplitHeading from "@/components/SplitHeading";
import TransitionLink from "@/components/TransitionLink";

const vt = (name: string) => ({ viewTransitionName: name }) as CSSProperties;

/**
 * Desktop: the section pins and vertical scroll drives the cards sideways
 * while the bridge keeps building behind. Each screenshot is revealed with a
 * clip as its card enters, and drifts a few percent for parallax. Phones (and
 * reduced motion, and no JS) get a plain vertical stack.
 */
export default function ProjectsStrip() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const cancel = afterIdle(() => {

    mm.add("(min-width: 1024px)", () => {
      el.classList.add("is-pinned");
      const stage = el.querySelector<HTMLElement>(".strip-stage")!;
      const track = el.querySelector<HTMLElement>(".strip-track")!;
      const dist = () => Math.max(0, track.scrollWidth - stage.clientWidth);
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      el.querySelectorAll<HTMLElement>(".card").forEach((card) => {
        const shot = card.querySelector(".card-shot");
        const img = card.querySelector(".card-img");
        gsap.fromTo(
          shot,
          { clipPath: "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 98%", end: "left 60%", scrub: true },
          }
        );
        gsap.fromTo(
          img,
          { xPercent: -3 },
          {
            xPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          }
        );
      });
      ScrollTrigger.refresh();
      return () => el.classList.remove("is-pinned");
    });

    mm.add("(max-width: 1023px)", () => {
      el.querySelectorAll<HTMLElement>(".card-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          { yPercent: 3, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    });

    });

    // Touch: a tap gives the same expanded state as hover, briefly.
    const onTouch = (e: TouchEvent) => {
      const card = (e.target as HTMLElement).closest(".card");
      if (!card) return;
      card.classList.add("is-touched");
      window.setTimeout(() => card.classList.remove("is-touched"), 700);
    };
    el.addEventListener("touchstart", onTouch, { passive: true });

    return () => {
      cancel();
      mm.revert();
      el.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <section ref={root} id="projects" className="strip" aria-labelledby="projects-h">
      <div className="strip-stage">
        <div className="wrap strip-head">
          <div className="panel">
            <SplitHeading id="projects-h">Projects</SplitHeading>
          </div>
        </div>
        <ul className="strip-track wrap">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="card">
              <TransitionLink href={`/projects/${p.slug}`} className="card-shot-link" tabIndex={-1} aria-hidden="true">
                <div className="card-shot" style={vt(`shot-${p.slug}`)}>
                  <Image
                    src={p.shot}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 92vw, 52vw"
                    className="card-img"
                    priority={i < 2}
                  />
                </div>
              </TransitionLink>
              <div className="card-body">
                <h3 className="card-title display" style={vt(`title-${p.slug}`)}>
                  <TransitionLink href={`/projects/${p.slug}`}>{p.title}</TransitionLink>
                </h3>
                <p className="card-line">{p.line}</p>
                <a className="card-live text-link" href={p.url} target="_blank" rel="noopener">
                  Visit {p.host}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
