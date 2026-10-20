// Pure geometry for the scroll-driven bridge scene. Everything is computed once
// per viewport size, so nothing is measured from the DOM while scrolling.
//
// Units: the visible window is VW x VH user units. The front layer (bridge,
// banks, vehicles) is 4 windows wide and pans 3 windows over the page. The
// middle layer moves at 0.5x and the back layer at 0.15x.

export type Line = { d: string; len: number; x0: number; x1: number };

/** Where the truss build front is at a given progress: tracks the right side
 *  of the view until 0.45, then finishes the far spans just ahead of it. */
export function trussStart(x: number, VW: number, xL: number, xR: number) {
  const mid = 2.3 * VW;
  if (x <= mid) return 0.25 + ((x - xL) / (mid - xL)) * 0.2;
  return 0.45 + ((x - mid) / (xR - mid)) * 0.065;
}
export type Box = { d: string; x: number; base: number };
export type Vehicle = {
  body: string;
  wheels: { cx: number; cy: number; r: number }[];
  from: number;
  to: number;
  rest: number; // static position for the no-JS / reduced-motion frame
  at: number; // progress at which it enters (just off the left edge)
};

export type Scene = {
  VW: number;
  VH: number;
  S: number;
  front: {
    W: number;
    ground: Line;
    groundFill: string;
    abutments: Box[];
    piers: Box[];
    webs: Line[];
    chords: Line[];
    deck: Line[];
    dims: { lines: Line[]; ticks: string; amberTick: string; labels: { x: number; y: number; text: string }[] };
    vehicles: Vehicle[];
    flag: { pole: string; cloth: string; x: number; base: number };
  };
  mid: { W: number; ridges: Line[]; water: Line[] };
  back: { W: number; contours: Line[] };
};

/** Front layer travel as a fraction of its own width (xPercent at progress 1). */
export const TRAVEL = { front: -75, mid: -60, back: -(0.45 / 1.45) * 100 };
/** Camera progress used for the static (no-JS / reduced-motion) frame. */
export const STATIC_P = 0.45;

type P = [number, number];

const f = (n: number) => n.toFixed(1);

function line(pts: P[]): Line {
  let d = "";
  let len = 0;
  pts.forEach(([x, y], i) => {
    d += (i ? "L" : "M") + f(x) + "," + f(y);
    if (i) len += Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]);
  });
  return { d, len: Math.ceil(len) + 1, x0: pts[0][0], x1: pts[pts.length - 1][0] };
}

function sample(x0: number, x1: number, n: number, fy: (x: number) => number): P[] {
  const pts: P[] = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    pts.push([x, fy(x)]);
  }
  return pts;
}

const rect = (x0: number, y0: number, x1: number, y1: number) =>
  `M${f(x0)},${f(y0)}H${f(x1)}V${f(y1)}H${f(x0)}Z`;

export function viewDims(w: number, h: number) {
  const a = w / Math.max(h, 1);
  let VW = 1000 * a;
  let VH = 1000;
  if (VW < 700) {
    VW = 700;
    VH = 700 / a;
  }
  return { VW: Math.round(VW), VH: Math.round(VH) };
}

export function buildScene(VW: number, VH: number): Scene {
  const S = Math.min(1.25, Math.max(0.55, Math.pow(VW / 1600, 0.6)));
  const W = 4 * VW;
  const deckY = VH - 340 * S;
  const bedY = deckY + 240 * S;
  const waterY = deckY + 165 * S;
  const xL = 1.3 * VW;
  const xR = 3.55 * VW;
  const slope = 0.1 * VW;
  const dt = 12 * S;

  // ---- Ground profile: flat banks at deck level, valley between ----
  const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
  const groundY = (x: number) => {
    if (x <= xL) return deckY;
    if (x < xL + slope) return deckY + (bedY - deckY) * ease((x - xL) / slope);
    if (x <= xR - slope) return bedY + 6 * S * Math.sin((x - xL) / (90 * S));
    if (x < xR) return bedY + (deckY - bedY) * ease((x - (xR - slope)) / slope);
    return deckY;
  };
  const gpts: P[] = [
    [-20, deckY],
    ...sample(xL, xR, 160, groundY),
    [W + 20, deckY],
  ];
  const ground = line(gpts);
  const groundFill =
    gpts.map(([x, y], i) => (i ? "L" : "M") + f(x) + "," + f(y)).join("") +
    `L${f(W + 20)},${f(VH + 20)}L-20,${f(VH + 20)}Z`;

  // ---- Abutments and piers (rise from their base) ----
  const abBase = deckY + 120 * S;
  const abutments: Box[] = [
    { d: rect(xL - 8 * S, deckY + dt, xL + 46 * S, abBase), x: xL, base: abBase },
    { d: rect(xR - 46 * S, deckY + dt, xR + 8 * S, abBase), x: xR, base: abBase },
  ];
  const sw = (xR - xL) / 4;
  const pierXs = [1, 2, 3].map((k) => xL + k * sw);
  const pierBase = bedY + 14 * S;
  const piers: Box[] = pierXs.map((x) => ({
    d:
      rect(x - 24 * S, deckY + dt, x + 24 * S, deckY + dt + 12 * S) +
      rect(x - 14 * S, deckY + dt + 12 * S, x + 14 * S, bedY) +
      rect(x - 30 * S, bedY, x + 30 * S, pierBase),
    x,
    base: pierBase,
  }));

  // ---- Truss: four camelback Warren spans ----
  const th = 150 * S;
  const webs: Line[] = [];
  const chords: Line[] = [];
  for (let k = 0; k < 4; k++) {
    const x0 = xL + k * sw;
    const n = Math.max(4, Math.round(sw / (th * 1.1)));
    const pw = sw / n;
    const tops: P[] = [];
    for (let i = 0; i < n; i++) {
      const h = th * (0.7 + 0.3 * Math.sin((Math.PI * (i + 0.5)) / n));
      const t: P = [x0 + (i + 0.5) * pw, deckY - h];
      tops.push(t);
      webs.push(line([[x0 + i * pw, deckY], t, [x0 + (i + 1) * pw, deckY]]));
    }
    chords.push(line(tops));
  }

  // ---- Deck slab and railing ----
  const deck = [
    line([[xL - 70 * S, deckY], [xR + 70 * S, deckY]]),
    line([[xL - 70 * S, deckY + dt], [xR + 70 * S, deckY + dt]]),
    line([[xL, deckY - 18 * S], [xR, deckY - 18 * S]]),
  ];

  // ---- Dimensions: chain dimension over spans 2-3, clearance at pier 3 ----
  const dimY = deckY - th - 46 * S;
  const tk = 7 * S;
  const tick = (x: number, y: number) =>
    `M${f(x - tk)},${f(y + tk)}L${f(x + tk)},${f(y - tk)}`;
  const hx = pierXs[2] + 70 * S;
  const dims = {
    lines: [
      line([[pierXs[0] - 14 * S, dimY], [pierXs[2] + 14 * S, dimY]]),
      line([[hx, deckY - 10 * S], [hx, waterY + 10 * S]]),
    ],
    ticks: tick(pierXs[0], dimY) + tick(pierXs[2], dimY) + tick(hx, deckY) + tick(hx, waterY),
    amberTick: tick(pierXs[1], dimY),
    labels: [
      { x: (pierXs[0] + pierXs[1]) / 2, y: dimY - 10 * S, text: "span" },
      { x: (pierXs[1] + pierXs[2]) / 2, y: dimY - 10 * S, text: "span" },
      { x: hx + 12 * S, y: (deckY + waterY) / 2, text: "clearance" },
    ],
  };

  // ---- Vehicles (rounded body + two wheels), parked at x = 0 ----
  const vehicle = (len: number, h: number, from: number, to: number, rest: number, at = 0.7): Vehicle => {
    const r = 6 * S;
    const yb = deckY - r * 1.2;
    return {
      body: `M${f(-len / 2)},${f(yb)}V${f(yb - h + 6 * S)}Q${f(-len / 2)},${f(yb - h)} ${f(-len / 2 + 6 * S)},${f(yb - h)}H${f(len / 2 - 6 * S)}Q${f(len / 2)},${f(yb - h)} ${f(len / 2)},${f(yb - h + 6 * S)}V${f(yb)}Z`,
      wheels: [
        { cx: -len / 2 + len * 0.22, cy: deckY - r, r },
        { cx: len / 2 - len * 0.22, cy: deckY - r, r },
      ],
      from,
      to,
      rest,
      at,
    };
  };
  const vehicles = [
    // Each enters just past the right edge of the view and drives right
    // slower than the camera pans, so it stays over the open side. Later ones
    // enter further ahead and drive faster, so they never overlap.
    ...[
      [58, 20, 0.7, 1.2, 2.08],
      [84, 30, 0.75, 1.6, 2.26],
      [62, 22, 0.8, 2.0, 1.96],
    ].map(([len, h, at, speed, rest]) => {
      const from = (3 * at + 1.05) * VW;
      return vehicle(len * S, h * S, from, from + speed * (0.95 - at) * VW, rest * VW, at);
    }),
  ];

  // ---- Survey flag on the far bank ----
  const fx = 3.9 * VW;
  const flag = {
    pole: `M${f(fx)},${f(deckY)}V${f(deckY - 48 * S)}`,
    cloth: `M${f(fx)},${f(deckY - 48 * S)}L${f(fx + 20 * S)},${f(deckY - 42 * S)}L${f(fx)},${f(deckY - 36 * S)}Z`,
    x: fx,
    base: deckY,
  };

  // ---- Middle layer: distant valley ridges and water lines ----
  const Wm = 2.5 * VW;
  const ridgeBase = (x: number) => {
    const u = x / Wm;
    const valley = 1 - Math.pow(Math.sin(Math.PI * u), 2) * 0.6;
    return valley * 110 * S + 12 * S * Math.sin(x / (160 * S));
  };
  const ridges = [0, 1].map((r) =>
    line(sample(-10, Wm + 10, 120, (x) => deckY - 60 * S - r * 48 * S - ridgeBase(x) * (1 + r * 0.35)))
  );
  const water = [0, 1, 2, 3, 4].map((i) =>
    line(
      sample(-10, Wm + 10, 120, (x) =>
        waterY + i * 14 * S + 2 * S * Math.sin(x / (40 * S) + i * 1.7)
      )
    )
  );

  // ---- Back layer: distant terrain contours ----
  const Wb = 1.45 * VW;
  // Nested, never crossing: one shared profile, offset and gently scaled.
  const relief = (x: number) =>
    30 * S * Math.sin(x / (230 * S)) + 14 * S * Math.sin(x / (97 * S) + 1.3);
  const contours = [0, 1, 2, 3, 4].map((i) =>
    line(sample(-10, Wb + 10, 90, (x) => VH * 0.14 + i * 30 * S + relief(x) * (1 - i * 0.12)))
  );

  return {
    VW,
    VH,
    S,
    front: { W, ground, groundFill, abutments, piers, webs, chords, deck, dims, vehicles, flag },
    mid: { W: Wm, ridges, water },
    back: { W: Wb, contours },
  };
}
