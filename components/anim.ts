"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

let ready = false;

/** Register the signature cubic-bezier once (client-only). */
export function initGsap() {
  if (ready || typeof window === "undefined") return;
  gsap.registerPlugin(CustomEase);
  // cubic-bezier(0.22, 1, 0.36, 1) — a real curve, not a default ease.
  CustomEase.create("gb", "M0,0 C0.22,1 0.36,1 1,1");
  ready = true;
}

export const EASE = "gb";

/**
 * Run `cb` once, when `el` first intersects the viewport (or immediately if it
 * is already in view). IntersectionObserver fires reliably regardless of page
 * scrollability, so content can never get stuck hidden.
 */
export function observeOnce(el: Element, cb: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    cb();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          cb();
          io.disconnect();
          return;
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Staggered reveal of a group's [data-reveal] items when the group enters view. */
export function revealGroup(group: Element) {
  initGsap();
  const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length) return () => {};
  return observeOnce(group, () => {
    gsap.fromTo(
      items,
      { y: 22, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: 0.09 }
    );
  });
}
