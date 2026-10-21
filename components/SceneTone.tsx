"use client";

import { useEffect, useLayoutEffect } from "react";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const DARK: Record<string, string> = {
  "--scene-structure": "var(--c-chalk)",
  "--scene-cable": "var(--c-spillway)",
  "--scene-terrain": "var(--c-chalk)",
  "--scene-water": "var(--c-spillway)",
  "--scene-ground": "var(--c-graphite)",
};

/** Puts a whole page on Graphite (the robotics page continues that chapter). */
export default function SceneTone() {
  useIsoLayout(() => {
    const root = document.documentElement;
    root.classList.add("page-dark");
    Object.entries(DARK).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => {
      root.classList.remove("page-dark");
      Object.keys(DARK).forEach((k) => root.style.removeProperty(k));
    };
  }, []);
  return null;
}
