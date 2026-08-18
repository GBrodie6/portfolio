"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV } from "@/lib/content";
import { REDUCED, FINE_POINTER } from "@/lib/env";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 12);
      if (y > lastY && y > 240 && !open) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const ids = ["engineering", "work", "about", "contact"];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [open]);

  useEffect(() => {
    if (REDUCED || !FINE_POINTER) return;
    const el = ctaRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="nav-bar fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur"
    >
      <div className="wrap flex items-center justify-between py-3.5">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-[0.08em] text-ink no-underline"
        >
          GRIFFIN<span className="text-green">·</span>BRODIE
        </a>

        <nav className="hidden items-center gap-6 sm:flex md:gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`nav-link font-mono text-xs tracking-[0.08em] no-underline transition-colors ${
                active === n.href.slice(1)
                  ? "is-active text-green-deep"
                  : "text-ink-soft hover:text-green-deep"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            ref={ctaRef}
            href="#contact"
            className="rounded-full bg-green px-4 py-2 font-mono text-[0.72rem] tracking-[0.06em] text-paper no-underline transition-colors hover:bg-green-deep"
          >
            Get in touch
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-ink sm:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      <div
        className={`${
          open ? "flex" : "hidden"
        } flex-col gap-3 border-t border-line bg-paper px-6 pb-6 pt-3 sm:hidden`}
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="font-mono text-sm tracking-[0.06em] text-ink-soft no-underline"
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="w-fit rounded-full bg-green px-4 py-2 font-mono text-xs text-paper no-underline"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
