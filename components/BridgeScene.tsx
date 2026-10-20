"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildBridge, viewDims, TRAVEL, LAYER_W, type Line } from "@/lib/bridge";
import { REDUCED } from "@/lib/env";

const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Colors come only from the scene variables in app/globals.css. SVG
// presentation attributes do not resolve var(), so they go through `style`.
const STRUCTURE = "var(--scene-structure)";
const CABLE = "var(--scene-cable)";
const TERRAIN = "var(--scene-terrain)";
const WATER = "var(--scene-water)";
const GROUND = "var(--scene-ground)";

/** A path drawn in by stroke-dashoffset; the static markup shows it finished. */
function Draw({ l, cls, ...rest }: { l: Line; cls?: string } & React.SVGProps<SVGPathElement>) {
  return (
    <path
      d={l.d}
      className={cls}
      data-len={l.len}
      strokeDasharray={`${l.len} ${l.len}`}
      fill="none"
      {...rest}
    />
  );
}

/**
 * Fixed full-screen background: a cable-stayed bridge built by balanced
 * cantilever. Three layers pan at 0.15x / 0.5x / 1x, and one paused timeline,
 * scrubbed by one ScrollTrigger over the whole document, adds each deck
 * segment and its stay cable. Every visual state is a pure function of scroll.
 */
export default function BridgeScene() {
  const root = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ VW: 1600, VH: 1000, k: 1600 / 1440, ready: false });
  const sc = useMemo(() => buildBridge(view.VW, view.VH), [view.VW, view.VH]);

  // Measure before first paint, then on debounced resize. Height-only changes
  // under 150px (mobile URL bar) are ignored.
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

  // Master timeline, rebuilt whenever the geometry changes.
  useIsoLayout(() => {
    const el = root.current;
    if (!el || !view.ready || REDUCED) return;
    gsap.registerPlugin(ScrollTrigger);
    const { step } = sc.front;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      tl.fromTo(q(".layer-back"), { xPercent: 0 }, { xPercent: TRAVEL.back, duration: 1 }, 0);
      tl.fromTo(q(".layer-mid"), { xPercent: 0 }, { xPercent: TRAVEL.mid, duration: 1 }, 0);
      tl.fromTo(q(".layer-front"), { xPercent: 0 }, { xPercent: TRAVEL.front, duration: 1 }, 0);

      // Each segment slides out from its joint, then its cable is drawn.
      q(".b-seg").forEach((e) => {
        const at = Number(e.getAttribute("data-at"));
        const origin = e.getAttribute("data-origin") || "0 0";
        tl.fromTo(e, { scaleX: 0, svgOrigin: origin }, { scaleX: 1, svgOrigin: origin, duration: step * 0.55 }, at);
      });
      q(".b-cable").forEach((e) => {
        const at = Number(e.getAttribute("data-at"));
        const len = Number(e.getAttribute("data-len"));
        tl.fromTo(e, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: step * 0.5 }, at);
      });

      tl.set({}, {}, 1); // timeline spans exactly 0..1
      tl.progress(1).progress(0); // initialise every tween now, not mid-scroll

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
    return () => ctx.revert();
  }, [sc, view.ready]);

  const sw = 1.1 * view.k;
  const { front, mid, back, S, VH } = sc;

  return (
    <div ref={root} className="scene" aria-hidden="true">
      <div className="scene-layers">
      <div className="layer layer-back" style={{ width: `${LAYER_W.back * 100}%` }}>
        <svg viewBox={`0 0 ${back.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <g style={{ stroke: TERRAIN }} strokeOpacity="0.18" strokeWidth={sw}>
            {back.contours.map((l, i) => (
              <Draw key={i} l={l} />
            ))}
          </g>
        </svg>
      </div>

      <div className="layer layer-mid" style={{ width: `${LAYER_W.mid * 100}%` }}>
        <svg viewBox={`0 0 ${mid.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <g strokeWidth={sw}>
            {mid.ridges.map((l, i) => (
              <Draw key={i} l={l} style={{ stroke: TERRAIN }} strokeOpacity={0.26 - i * 0.08} />
            ))}
            {mid.water.map((l, i) => (
              <Draw key={i} l={l} style={{ stroke: WATER }} strokeOpacity="0.45" />
            ))}
          </g>
        </svg>
      </div>

      <div className="layer layer-front" style={{ width: `${LAYER_W.front * 100}%` }}>
        <svg viewBox={`0 0 ${front.W} ${VH}`} preserveAspectRatio="xMinYMax slice">
          <defs>
            <pattern id="b-hatch" width={9 * S} height={9 * S} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width={9 * S} height={9 * S} style={{ fill: GROUND }} />
              <path d={`M0,0V${9 * S}`} style={{ stroke: TERRAIN }} strokeOpacity="0.16" strokeWidth={sw} />
            </pattern>
          </defs>
          <path d={front.groundFill} fill="url(#b-hatch)" />
          <Draw l={front.ground} style={{ stroke: TERRAIN }} strokeOpacity="0.45" strokeWidth={sw * 1.2} />
          <path d={front.abutments} style={{ fill: STRUCTURE }} fillOpacity="0.85" />
          <path d={front.towerFooting} style={{ fill: STRUCTURE }} fillOpacity="0.85" />

          <g className="scene-build">
            <g style={{ stroke: CABLE }} strokeWidth={sw * 1.1} strokeLinecap="round">
              {front.cables.map((c, i) => (
                <path
                  key={i}
                  className="b-cable"
                  d={c.d}
                  data-len={c.len}
                  data-at={c.at}
                  strokeDasharray={`${c.len} ${c.len}`}
                  fill="none"
                />
              ))}
            </g>
            <g style={{ fill: STRUCTURE }}>
              {front.segments.map((s, i) => (
                <path key={i} className="b-seg" d={s.d} data-at={s.at} data-origin={s.origin} />
              ))}
            </g>
          </g>
          <path className="tower-rise" d={front.tower} style={{ fill: STRUCTURE }} />
        </svg>
      </div>

      </div>
    </div>
  );
}
