"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV } from "@/lib/content";
import { getLenis, scrollToId } from "@/lib/lenis";
import BridgeMark from "@/components/BridgeMark";

/**
 * Minimal top bar: hides on scroll down, returns on scroll up, and switches to
 * Chalk while it sits over the Graphite Engineering chapter. On phones the
 * links open in a full-screen menu that slides in with staggered links.
 */
export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      el.classList.toggle("is-hidden", y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chalk over the Engineering chapter (home page only).
  useEffect(() => {
    const el = bar.current;
    const sec = document.getElementById("engineering");
    if (!el || !sec || !home) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: sec,
      start: () => `top top+=${el.offsetHeight / 2}`,
      end: () => `bottom top+=${el.offsetHeight / 2}`,
      toggleClass: { targets: el, className: "is-dark" },
    });
    return () => {
      st.kill();
      el.classList.remove("is-dark");
    };
  }, [home]);

  // Menu: lock scroll, move focus in, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("menu-open");
    const links = menu.current?.querySelectorAll<HTMLElement>("a, button");
    links?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && links && links.length) {
        const first = links[0];
        const lastEl = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.classList.remove("menu-open");
      button.current?.focus();
    };
  }, [open]);

  const jump = (id: string) => (e: MouseEvent) => {
    setOpen(false);
    if (!home) return; // the Link goes to /#id
    e.preventDefault();
    window.setTimeout(() => scrollToId(id), open ? 220 : 0);
  };

  return (
    <>
      <header ref={bar} className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="nav-brand" onClick={home ? jump("top") : undefined}>
            <BridgeMark className="mark" />
            <span className="display">Griffin Brodie</span>
          </Link>
          <nav aria-label="Sections" className="nav-links">
            {NAV.map((n) => (
              <Link key={n.id} href={`/#${n.id}`} className="nav-link" onClick={jump(n.id)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            ref={button}
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div
        ref={menu}
        id="site-menu"
        className={`menu on-dark ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <div className="wrap menu-top">
          <span className="display nav-brand-text">Griffin Brodie</span>
          <button type="button" className="nav-menu-btn" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <ul className="wrap menu-links">
          {NAV.map((n, i) => (
            <li key={n.id} style={{ ["--i" as string]: i }}>
              <Link href={`/#${n.id}`} className="display menu-link" onClick={jump(n.id)}>
                {n.label}
              </Link>
            </li>
          ))}
          <li style={{ ["--i" as string]: NAV.length }}>
            <Link href="/robotics" className="display menu-link" onClick={() => setOpen(false)}>
              Robotics
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
