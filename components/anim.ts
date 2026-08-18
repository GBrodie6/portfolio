"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let ready = false;

/** Register plugins + build the signature cubic-bezier once (client-only). */
export function initGsap() {
  if (ready || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // cubic-bezier(0.22, 1, 0.36, 1) — a real curve, not a default ease.
  CustomEase.create("gb", "M0,0 C0.22,1 0.36,1 1,1");
  ready = true;
}

export const EASE = "gb";

/** Staggered scroll-reveal for a group of [data-reveal] items. */
export function staggerIn(
  items: Element[] | NodeListOf<Element>,
  trigger: Element,
  start = "top 82%"
) {
  initGsap();
  return gsap.fromTo(
    items,
    { y: 22, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: EASE,
      stagger: 0.09,
      scrollTrigger: { trigger, start },
    }
  );
}
