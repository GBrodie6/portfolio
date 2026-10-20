"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildScene, viewDims, trussStart, TRAVEL, type Line } from "@/lib/scene";
import { REDUCED } from "@/lib/env";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const INK = "#16201A";
const PINE = "#1F5D42";
const BLUE = "#33607F";
const AMBER = "#C97A2B";
const PAPER = "#F2F5EE";
const PAPER_ALT = "#E7EBE1";

/** A path drawn in by stroke-dashoffset; static markup shows it finished. */
function Draw({ l, cls, ...rest }: { l: Line; cls: string } & React.SVGProps<SVGPathElement>) {
  return (
    <path
      d={l.d}
      className={cls}
      data-len={l.len}
      data-x={l.x0}
      data-x1={l.x1}
      strokeDasharray={`${l.len} ${l.len}`}
      fill="none"
      {...rest}
    />
  );
}

/**
 * Fixed full-screen drafting illustration behind the page. Three layers pan
 * at 0.15x / 0.5x / 1x while a single paused timeline, scrubbed by one
 * ScrollTrigger over the whole document, builds the bridge. Every visual
 * state is a pure function of scroll progress.
 */
export default function Scene() {
  const root = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ VW: 1600, VH: 1000, k: 1600 / 1440, ready: false });
  const sc = useMemo(() => buildScene(view.VW, view.VH), [view.VW, view.VH]);

  // Measure before first paint, then re-measure on (debounced) resize. Small
  // height-only changes (mobile URL bar) are ignored.
  useIsoLayout(() => {
    const el = root.current;
    if (!el) return;
    let lastW = 0;
    let lastH = 0;
    let timer = 0;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w === lastW && Math.abs(h - lastH) < 150) return;
      lastW = w;
      lastH = h;
      const d = viewDims(w, h);
      setView({ ...d, k: d.VW / w, ready: true });
    };
    measure();
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  // Build the master timeline (rebuilt whenever the geometry changes).
  useIsoLayout(() => {
    const el = root.current;
    if (!el || !view.ready || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);

    const { front } = sc;
    const xL = front.abutments[0].x;
    const xR = front.abutments[1].x;
    const VW = sc.VW;
    const num = (e: Element, a: string) => Number(e.getAttribute(a));
    // Progress at which an x position reaches the right side of the view.
    const enters = (x: number) => (x - 0.92 * VW) / (3 * VW);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      const draw = (e: Element, at: number, dur: number) => {
        const len = Number(e.getAttribute("data-len"));
        tl.fromTo(e, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: dur }, at);
      };
      const rise = (e: Element, at: number, dur: number) => {
        const origin = e.getAttribute("data-origin") || "0 0";
        tl.fromTo(e, { scaleY: 0, svgOrigin: origin }, { scaleY: 1, svgOrigin: origin, duration: dur }, at);
      };

      // Camera: three layers, linear over the whole page.
      tl.fromTo(q(".layer-back"), { xPercent: 0 }, { xPercent: TRAVEL.back, duration: 1 }, 0);
      tl.fromTo(q(".layer-mid"), { xPercent: 0 }, { xPercent: TRAVEL.mid, duration: 1 }, 0);
      tl.fromTo(q(".layer-front"), { xPercent: 0 }, { xPercent: TRAVEL.front, duration: 1 }, 0);

      // 0.00-0.10 terrain contours, valley, water, ground.
      q(".s-contour").forEach((e, i) => draw(e, i * 0.008, 0.06));
      q(".s-ridge").forEach((e, i) => draw(e, 0.01 + i * 0.015, 0.07));
      q(".s-water").forEach((e, i) => draw(e, 0.02 + i * 0.01, 0.06));
      q(".s-ground").forEach((e) => draw(e, 0, 0.09));
      tl.fromTo(q(".s-ground-fill"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.02);

      // 0.08-0.30 abutments and piers rise, left to right.
      q(".s-rise").forEach((e) => {
        const x = Number((e.getAttribute("data-origin") || "0").split(" ")[0]);
        rise(e, Math.min(0.22, Math.max(0.08, enters(x))), 0.08);
      });

      // 0.25-0.55 truss members, staggered left to right by position.
      const WEB = 0.035;
      const ts = (x: number) => trussStart(x, VW, xL, xR);
      q(".s-web").forEach((e) => draw(e, ts(num(e, "data-x")), WEB));
      q(".s-chord").forEach((e) => {
        const a = ts(num(e, "data-x"));
        draw(e, a, ts(num(e, "data-x1")) - a + WEB);
      });

      // 0.45-0.60 deck and railing.
      q(".s-deck").forEach((e, i) => draw(e, 0.45 + i * 0.01, 0.15 - i * 0.01));

      // 0.55-0.72 dimensions and annotations.
      q(".s-dim").forEach((e, i) => draw(e, 0.55 + i * 0.05, 0.1));
      tl.fromTo(q(".s-dim-mark"), { opacity: 0 }, { opacity: 1, duration: 0.06, stagger: 0.02 }, 0.6);

      // 0.70-0.95 vehicles cross at different speeds.
      q(".s-vehicle").forEach((e) => {
        const from = num(e, "data-from");
        const to = num(e, "data-to");
        const at = num(e, "data-at");
        tl.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.004 }, at);
        tl.fromTo(e, { x: from }, { x: to, duration: 0.95 - at }, at);
      });

      // 0.95-1.00 survey flag on the far bank.
      q(".s-flag").forEach((e) => rise(e, 0.95, 0.05));

      // Initialise every tween now so nothing measures during scroll.
      tl.progress(1).progress(0);

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        animation: tl,
      });
    }, el);

    el.classList.add("is-live");
    ScrollTrigger.refresh();
    return () => {
      ctx.revert();
    };
  }, [sc, view.ready]);

  const sw = 1.1 * view.k;
  const { front, mid, back, S, VH } = sc;

  return (
    <div ref={root} className="scene" aria-hidden="true">
      <div className="layer layer-back" style={{ width: "145%" }}>
        <svg viewBox={`0 0 ${back.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <defs>
            <pattern id="s-grid" width={40 * S} height={40 * S} patternUnits="userSpaceOnUse">
              <path d={`M${40 * S},0H0V${40 * S}`} fill="none" stroke={BLUE} strokeOpacity="0.09" strokeWidth={sw * 0.8} />
            </pattern>
          </defs>
          <rect x="0" y="0" width={back.W} height={VH} fill="url(#s-grid)" />
          <g className="scene-build" stroke={PINE} strokeOpacity="0.22" strokeWidth={sw}>
            {back.contours.map((l, i) => (
              <Draw key={i} l={l} cls="s-contour" />
            ))}
          </g>
        </svg>
      </div>

      <div className="layer layer-mid" style={{ width: "250%" }}>
        <svg viewBox={`0 0 ${mid.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <g className="scene-build" strokeWidth={sw}>
            {mid.ridges.map((l, i) => (
              <Draw key={i} l={l} cls="s-ridge" stroke={PINE} strokeOpacity={0.28 - i * 0.08} />
            ))}
            {mid.water.map((l, i) => (
              <Draw key={i} l={l} cls="s-water" stroke={BLUE} strokeOpacity="0.36" />
            ))}
          </g>
        </svg>
      </div>

      <div className="layer layer-front" style={{ width: "400%" }}>
        <svg viewBox={`0 0 ${front.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <defs>
            <pattern
              id="s-hatch"
              width={9 * S}
              height={9 * S}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width={9 * S} height={9 * S} fill={PAPER} />
              <path d={`M0,0V${9 * S}`} stroke={PINE} strokeOpacity="0.2" strokeWidth={sw} />
            </pattern>
          </defs>
          <g className="scene-build">
            <path className="s-ground-fill" d={front.groundFill} fill="url(#s-hatch)" />
            <Draw l={front.ground} cls="s-ground" stroke={PINE} strokeOpacity="0.4" strokeWidth={sw * 1.2} />

            <g stroke={INK} strokeOpacity="0.4" strokeWidth={sw} fill={PAPER}>
              {[front.abutments[0], ...front.piers, front.abutments[1]].map((b, i) => (
                <path
                  key={i}
                  className="s-rise"
                  d={b.d}
                  data-origin={`${b.x} ${b.base}`}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {front.vehicles.map((v, i) => (
              <g
                key={i}
                className="s-vehicle"
                data-from={v.from}
                data-to={v.to}
                data-at={v.at}
                transform={`translate(${v.rest} 0)`}
                stroke={INK}
                strokeOpacity="0.45"
                strokeWidth={sw}
                fill={PAPER_ALT}
              >
                <path d={v.body} />
                {v.wheels.map((w, j) => (
                  <circle key={j} cx={w.cx} cy={w.cy} r={w.r} fill={PAPER} />
                ))}
              </g>
            ))}

            <g stroke={INK} strokeOpacity="0.4" strokeWidth={sw * 1.15} strokeLinejoin="round">
              {front.webs.map((l, i) => (
                <Draw key={i} l={l} cls="s-web" />
              ))}
              {front.chords.map((l, i) => (
                <Draw key={i} l={l} cls="s-chord" />
              ))}
            </g>
            <g stroke={INK} strokeWidth={sw}>
              {front.deck.map((l, i) => (
                <Draw key={i} l={l} cls="s-deck" strokeOpacity={i === 2 ? 0.28 : 0.4} />
              ))}
            </g>

            <g stroke={INK} strokeOpacity="0.3" strokeWidth={sw}>
              {front.dims.lines.map((l, i) => (
                <Draw key={i} l={l} cls="s-dim" />
              ))}
              <path className="s-dim-mark" d={front.dims.ticks} />
              <path className="s-dim-mark" d={front.dims.amberTick} stroke={AMBER} strokeOpacity="0.9" strokeWidth={sw * 1.4} />
            </g>
            <g fill={INK} fillOpacity="0.5" fontSize={13 * view.k} fontFamily="var(--font-plex-sans), sans-serif">
              {front.dims.labels.map((t, i) => (
                <text key={i} className="s-dim-mark" x={t.x} y={t.y} textAnchor={i < 2 ? "middle" : "start"}>
                  {t.text}
                </text>
              ))}
            </g>

            <g className="s-flag" data-origin={`${front.flag.x} ${front.flag.base}`}>
              <path d={front.flag.pole} stroke={INK} strokeOpacity="0.5" strokeWidth={sw} />
              <path d={front.flag.cloth} fill={AMBER} />
            </g>
          </g>
        </svg>
      </div>

      <div className="scene-scrim" />
    </div>
  );
}
