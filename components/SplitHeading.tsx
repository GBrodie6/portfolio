"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { REDUCED } from "@/lib/env";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Giant section heading revealed by line and character behind a line mask.
 * SplitText keeps real spaces between words, so word spacing is unchanged.
 * Without JS or with reduced motion it is a plain, visible heading.
 */
export default function SplitHeading({
  as: Tag = "h2",
  id,
  className = "",
  children,
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  children: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayout(() => {
    const el = ref.current;
    if (!el || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines,words,chars",
        mask: "lines",
        linesClass: "sh-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            yPercent: 110,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.018,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
    }, el);
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={ref} id={id} className={`split-heading display text-display ${className}`}>
      {children}
    </Tag>
  );
}
