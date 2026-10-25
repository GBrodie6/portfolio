// Geometry for BridgeScene: a cable-stayed bridge built by balanced
// cantilever. Ported from the old scroll scene (same units, layers and
// parallax rates); only the bridge itself is redrawn. Everything is computed
// once per viewport size, so nothing is measured while scrolling.
//
// Units: the visible window is VW x VH. The front layer (banks, tower, deck,
// cables) is 2.5 windows wide and pans 1.5 windows over the page. The middle
// layer moves at 0.5x and the back layer at 0.15x.

export type Line = { d: string; len: number };
export type Segment = { d: string; origin: string; at: number };
export type Cable = Line & { at: number };
export type Car = {
  body: string;
  wheels: { cx: number; cy: number; r: number; spoke: string }[];
  y: number;
  from: number;
  to: number;
};

/**
 * Share of page progress spent building. The span closes here, as the footer
 * arrives; the camera then holds and the car crosses over the rest.
 */
export const BUILD_END = 0.93;

export type Bridge = {
  VW: number;
  VH: number;
  S: number;
  front: {
    W: number;
    ground: Line;
    groundFill: string;
    abutments: string;
    tower: string;
    towerFooting: string;
    segments: Segment[];
    cables: Cable[];
    closureAt: number;
    car: Car;
    step: number;
  };
  mid: { W: number; ridges: Line[]; water: Line[] };
  back: { W: number; contours: Line[] };
};

/** xPercent of each layer at progress 1 (front pans 1.5 of its 2.5 windows). */
export const TRAVEL = {
  front: -60,
  mid: -(0.75 / 1.75) * 100,
  back: -(0.225 / 1.225) * 100,
};
/** Layer widths as a share of the viewport. */
export const LAYER_W = { front: 2.5, mid: 1.75, back: 1.225 };

type P = [number, number];
const f = (n: number) => n.toFixed(1);

function line(pts: P[]): Line {
  let d = "";
  let len = 0;
  pts.forEach(([x, y], i) => {
    d += (i ? "L" : "M") + f(x) + "," + f(y);
    if (i) len += Math.hypot(x - pts[i - 1][0], y - pts[i - 1][1]);
  });
  return { d, len: Math.ceil(len) + 1 };
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

export function buildBridge(VW: number, VH: number): Bridge {
  const S = Math.min(1.25, Math.max(0.55, Math.pow(VW / 1600, 0.6)));
  const W = 2.5 * VW;
  const deckY = VH - 300 * S;
  const dt = 12 * S;
  const bedY = deckY + 230 * S;
  const waterY = deckY + 160 * S;
  const xLB = 0.3 * VW; // back span lands on the left bank
  const xT = 0.8 * VW; // tower
  const xRB = 2.32 * VW; // main span closes at the right abutment
  const slope = 0.09 * VW;

  // ---- Ground: banks at deck level, river valley between ----
  const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
  const groundY = (x: number) => {
    if (x <= xLB) return deckY;
    if (x < xLB + slope) return deckY + (bedY - deckY) * ease((x - xLB) / slope);
    if (x <= xRB - slope) return bedY + 5 * S * Math.sin((x - xLB) / (80 * S));
    if (x < xRB) return bedY + (deckY - bedY) * ease((x - (xRB - slope)) / slope);
    return deckY;
  };
  // Bank tops are level with the deck surface, so the road runs straight on.
  const gpts: P[] = [[-20, deckY], ...sample(xLB, xRB, 150, groundY), [W + 20, deckY]];
  const ground = line(gpts);
  const groundFill =
    gpts.map(([x, y], i) => (i ? "L" : "M") + f(x) + "," + f(y)).join("") +
    `L${f(W + 20)},${f(VH + 20)}L-20,${f(VH + 20)}Z`;
  const abutments =
    rect(xLB - 40 * S, deckY + dt, xLB + 8 * S, deckY + 110 * S) +
    rect(xRB - 8 * S, deckY + dt, xRB + 40 * S, deckY + 110 * S);

  // ---- Tower: tapered shaft from the river bed, footing below ----
  const Ht = Math.min(deckY - 0.12 * VH, 520 * S);
  const topY = deckY - Ht;
  const wb = 17 * S;
  const wt = 8 * S;
  const tower =
    `M${f(xT - wb)},${f(bedY)}L${f(xT - wt)},${f(topY + 14 * S)}L${f(xT - wt)},${f(topY)}` +
    `L${f(xT + wt)},${f(topY)}L${f(xT + wt)},${f(topY + 14 * S)}L${f(xT + wb)},${f(bedY)}Z` +
    rect(xT - 30 * S, deckY + dt, xT + 30 * S, deckY + dt + 9 * S);
  const towerFooting = rect(xT - 44 * S, bedY, xT + 44 * S, bedY + 16 * S);

  // ---- Deck segments and stay cables, balanced cantilever ----
  // Main span length grows linearly with page progress, so its tip stays at
  // about 80% of the screen while the camera pans. The back span grows in
  // step with it until it lands on the left bank.
  const Nm = Math.max(14, Math.round((xRB - xT) / (0.055 * VW)));
  const slM = (xRB - xT) / Nm;
  const Nb = Math.max(4, Math.round((xT - xLB) / slM));
  const slB = (xT - xLB) / Nb;
  const step = BUILD_END / Nm;
  const segments: Segment[] = [];
  const cables: Cable[] = [];
  const anchorY = (k: number, n: number) => topY + 12 * S + (1 - k / n) * 0.36 * Ht;

  for (let i = 0; i < Nm; i++) {
    const at = i * step;
    const x0 = xT + i * slM;
    const x1 = x0 + slM;
    segments.push({ d: rect(x0, deckY, x1 + 0.5, deckY + dt), origin: `${f(x0)} ${f(deckY)}`, at });
    cables.push({ ...line([[xT + wt * 0.6, anchorY(i + 1, Nm)], [x1 - 2 * S, deckY]]), at: at + step * 0.45 });
    if (i < Nb) {
      const b0 = xT - i * slB;
      const b1 = b0 - slB;
      segments.push({ d: rect(b1 - 0.5, deckY, b0, deckY + dt), origin: `${f(b0)} ${f(deckY)}`, at });
      cables.push({ ...line([[xT - wt * 0.6, anchorY(i + 1, Nb)], [b1 + 2 * S, deckY]]), at: at + step * 0.45 });
    }
  }

  // ---- The car: crosses the finished main span after closure. Drawn about
  // a center at x = 0, y = 0 on the deck top, then moved along the deck.
  const u = S * 1.2;
  const car: Car = {
    body:
      `M${f(-30 * u)},${f(-8 * u)}V${f(-17 * u)}Q${f(-30 * u)},${f(-20 * u)} ${f(-27 * u)},${f(-20 * u)}` +
      `H${f(-16 * u)}L${f(-9 * u)},${f(-30 * u)}H${f(12 * u)}L${f(19 * u)},${f(-20 * u)}` +
      `H${f(27 * u)}Q${f(30 * u)},${f(-20 * u)} ${f(30 * u)},${f(-17 * u)}V${f(-8 * u)}Z`,
    wheels: [-19, 19].map((x) => ({
      cx: x * u,
      cy: -5.5 * u,
      r: 5.5 * u,
      spoke: `M${f(x * u - 3.5 * u)},${f(-5.5 * u)}H${f(x * u + 3.5 * u)}`,
    })),
    y: deckY,
    // From just off the left edge of the held view to the far bank.
    from: 1.5 * VW - 40 * u,
    to: xRB + 0.08 * VW,
  };

  // ---- Middle layer: distant valley ridges and water lines ----
  const Wm = 1.75 * VW;
  const ridgeBase = (x: number) => {
    const u = x / Wm;
    return (1 - Math.pow(Math.sin(Math.PI * u), 2) * 0.6) * 100 * S + 12 * S * Math.sin(x / (160 * S));
  };
  const ridges = [0, 1].map((r) =>
    line(sample(-10, Wm + 10, 110, (x) => deckY - 50 * S - r * 46 * S - ridgeBase(x) * (1 + r * 0.35)))
  );
  const water = [0, 1, 2, 3].map((i) =>
    line(sample(-10, Wm + 10, 110, (x) => waterY + i * 14 * S + 2 * S * Math.sin(x / (40 * S) + i * 1.7)))
  );

  // ---- Back layer: distant terrain contours, nested so they never cross ----
  const Wb = 1.225 * VW;
  const relief = (x: number) => 30 * S * Math.sin(x / (230 * S)) + 14 * S * Math.sin(x / (97 * S) + 1.3);
  const contours = [0, 1, 2, 3].map((i) =>
    line(sample(-10, Wb + 10, 80, (x) => VH * 0.14 + i * 30 * S + relief(x) * (1 - i * 0.12)))
  );

  return {
    VW,
    VH,
    S,
    front: {
      W,
      ground,
      groundFill,
      abutments,
      tower,
      towerFooting,
      segments,
      cables,
      closureAt: (Nm - 1) * step,
      car,
      step,
    },
    mid: { W: Wm, ridges, water },
    back: { W: Wb, contours },
  };
}
