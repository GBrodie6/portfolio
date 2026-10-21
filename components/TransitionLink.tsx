"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { REDUCED } from "@/lib/env";
import { waitForRoute } from "@/lib/transition";

type StartVT = (cb: () => Promise<void>) => unknown;

/**
 * A Link that, where the browser supports view transitions, morphs shared
 * elements (the project screenshot and title carry matching
 * view-transition-names on both pages) in about 450 ms. Elsewhere, and with
 * reduced motion, it is a normal link.
 */
export default function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const start = (document as Document & { startViewTransition?: StartVT }).startViewTransition;
    if (e.defaultPrevented || REDUCED || !start || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    start.call(document, () => {
      const done = waitForRoute();
      router.push(String(href));
      return done;
    });
  };
  return <Link href={href} onClick={go} {...rest} />;
}
