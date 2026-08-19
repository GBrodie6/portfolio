"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { REDUCED } from "@/lib/env";
import { initGsap, EASE, observeOnce } from "@/components/anim";

/**
 * An <h2> that reveals word-by-word (staggered rise + fade, matching the hero
 * headline treatment) when it scrolls into view.
 */
export default function SplitHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = ref.current;
    if (!el) return;
    initGsap();
    const words = el.querySelectorAll<HTMLElement>(".sh-word");
    return observeOnce(el, () => {
      gsap.fromTo(
        words,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: EASE, stagger: 0.05 }
      );
    });
  }, [text]);

  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="sh-word">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </h2>
  );
}
