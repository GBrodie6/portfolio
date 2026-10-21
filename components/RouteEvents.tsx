"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { routeDone } from "@/lib/transition";
import { getLenis, scrollToId } from "@/lib/lenis";

/** After each route change: finish any view transition, reset scroll, re-measure. */
export default function RouteEvents() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const hash = window.location.hash.slice(1);
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    if (!getLenis()) window.scrollTo(0, 0);
    // Resolve the view transition now: rendering (and rAF) is paused while
    // the browser waits for this, so it must not wait for a frame.
    routeDone();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) window.setTimeout(() => scrollToId(hash), 60);
    });
  }, [pathname]);
  return null;
}
