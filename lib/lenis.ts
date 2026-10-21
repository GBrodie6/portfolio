import type Lenis from "lenis";

// One Lenis instance for the app, set by SmoothScroll. Null with reduced motion.
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Scroll to an element id (or the top) with Lenis, or natively without it. */
export function scrollToId(id: string | null) {
  const el = id ? document.getElementById(id) : null;
  const nav = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
  if (instance) {
    instance.scrollTo(el ?? 0, { offset: el ? -nav : 0, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else if (el) {
    el.scrollIntoView({ block: "start" });
  } else {
    window.scrollTo(0, 0);
  }
}
