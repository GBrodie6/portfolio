// Evaluated once, client-side, after the pre-hydration script has set the
// html classes. Safe to import anywhere; on the server these are all false.

export const INTRO =
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("intro");

export const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const FINE_POINTER =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
