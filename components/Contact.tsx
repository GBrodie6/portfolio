"use client";

import { useEffect, useRef } from "react";
import { CONTACT } from "@/lib/content";
import { REDUCED } from "@/lib/env";
import { revealGroup } from "@/components/anim";
import SplitHeading from "@/components/SplitHeading";

export default function Contact() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const el = scope.current;
    if (!el) return;
    const inner = el.querySelector(".contact-inner");
    if (!inner) return;
    const cleanup = revealGroup(inner);
    return () => cleanup();
  }, []);

  return (
    <section ref={scope} id="contact" className="py-24 sm:py-28">
      <div className="wrap">
        <div className="contact-inner flex flex-wrap items-end justify-between gap-8">
          <SplitHeading
            text={CONTACT.heading}
            className="max-w-[14ch] font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.01em]"
          />
          <div className="flex flex-col items-start gap-2.5 font-mono">
            {CONTACT.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="border-b border-line pb-0.5 text-[0.95rem] text-ink no-underline transition-colors hover:border-green-deep hover:text-green-deep"
                data-reveal
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-line pt-7 font-mono text-[0.72rem] text-ink-soft">
          <span>© 2026 Griffin Brodie</span>
          <span>Built from scratch. No template.</span>
        </div>
      </div>
    </section>
  );
}
