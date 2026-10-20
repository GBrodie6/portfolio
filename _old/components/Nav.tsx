"use client";

import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/content";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
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

    const ids = ["engineering", "work", "leadership", "about", "contact"];
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

  return (
    <header
      ref={navRef}
      className="nav-bar fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95"
    >
      <div className="wrap flex items-center justify-between py-3.5">
        <a
          href="#top"
          className="font-display text-[1.05rem] font-bold text-ink no-underline"
        >
          Griffin Brodie
        </a>

        <nav className="hidden items-center gap-6 sm:flex md:gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`nav-link text-sm no-underline transition-colors ${
                active === n.href.slice(1)
                  ? "is-active text-green-deep"
                  : "text-ink-soft hover:text-green-deep"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-green px-4 py-2 text-[0.82rem] font-medium text-paper no-underline transition-colors hover:bg-green-deep"
          >
            Get in touch
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-line px-3 py-1.5 text-sm text-ink sm:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
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
            className="text-[0.95rem] text-ink-soft no-underline"
          >
            {n.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="w-fit rounded-full bg-green px-4 py-2 text-sm text-paper no-underline"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
