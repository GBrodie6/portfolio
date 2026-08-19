export const NAV = [
  { label: "Engineering", href: "#engineering" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export const HERO = {
  eyebrow: "MADISON, CT · JUNIOR, CIVIL ENGINEERING BOUND",
  headline: "I build things that actually have to hold up.",
  lede:
    "I'm captain of my robotics team, about to commit to Civil Engineering, and I've built two golf software products that people actually use.",
};

export const ENGINEERING = [
  {
    title: "Civil Engineering",
    body:
      "I'm 99% set on studying Civil Engineering. I designed and built a house from scratch, floor plan, structure, all of it, in an Architectural Design class.",
  },
  {
    title: "Robotics",
    body:
      "I'm captain and lead engineer on my school's robotics team. I run the design process end to end: CAD, prototyping, competition day.",
  },
  {
    title: "Systems, not just screens",
    body:
      "Once a platform touches real money, the interesting engineering stops being visible. Building GolfTradr meant adding advisory-lock payment idempotency so trades can't double-charge, SSRF protection, 3D Secure enforcement, and a Cloudflare WAF layer with bot-fight mode and rate limiting.",
  },
];

export type Project = {
  title: string;
  href?: string;
  body: string;
  tags: string[];
  shot?: string;
};

export const WORK: Project[] = [
  {
    title: "GolfTradr",
    href: "https://golftradr.com",
    shot: "/work/golftradr.webp",
    body:
      "A peer-to-peer marketplace for trading golf equipment: trade proposals, digital agreements, shipping tracking, and seller verification, built as GolfTradr LLC with about 15 active beta testers.",
    tags: ["React", "Supabase", "Stripe", "Firebase"],
  },
  {
    title: "GripFitr",
    href: "https://gripfitr.com",
    shot: "/work/gripfitr.webp",
    body:
      "A live grip-fitting tool built on a deterministic recommendation engine, not a guess, covering seven major grip brands.",
    tags: ["JavaScript", "Deterministic Engine", "Vercel"],
  },
  {
    title: "Shoreline Golf",
    href: "https://shoreline-golf.com",
    shot: "/work/shoreline.webp",
    body: "A website for the golf shop I work at, built solo, no template.",
    tags: ["HTML/CSS/JS", "Single-file build"],
  },
  {
    title: "Triple G Landscaping",
    href: "https://triple-g-landscaping-khaki.vercel.app",
    shot: "/work/tripleg.webp",
    body:
      "The first client I landed on my own, a landscaping company in town. Built and deployed the whole site: Next.js, Tailwind, live, still getting revised as the owner tells me what he wants changed.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    title: "Paige's Babysitting Site",
    href: "https://paigegrendi-babysitting.vercel.app",
    shot: "/work/paige.webp",
    body:
      "A babysitting business site for my girlfriend, with way more animation than a babysitting site needs. 3D hero elements, a full GSAP animation layer, built solo.",
    tags: ["Next.js", "GSAP", "3D/WebGL"],
  },
];

export const MILESTONES_HEAD = {
  eyebrow: "MILESTONES",
  heading: "How I got here.",
};

export type Milestone = { text: string; year?: string };

export const MILESTONES: Milestone[] = [
  { text: "Took Architectural Design and designed and built a house from scratch" },
  { text: "Became captain and lead engineer of the robotics team" },
  { text: "Founded and shipped GolfTradr" },
  { text: "Built and shipped GripFitr as a sister product" },
  { text: "Landed Triple G Landscaping as my first freelance client" },
  { text: "Built and shipped an animated site for Paige's babysitting business" },
  { text: "T1 finish at the DeNicolo Memorial Junior Open, shot 69", year: "2026" },
  { text: "Helped lead Daniel Hand to the CT State Championship team title", year: "2026" },
];

export const TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Supabase",
  "Stripe",
  "Firebase",
  "GSAP",
  "Three.js",
  "Lenis",
  "Vercel",
];

export const ABOUT = {
  heading: "Mostly building. Also golf.",
  paragraphs: [
    "I'm 99% set on Civil Engineering, with a minor in Entrepreneurship.",
    "T1 at the DeNicolo Memorial Junior Open this year, shot 69. Helped lead Daniel Hand to the CT State Championship team title, 4th individually with a 73. I play CTPGA and Hurricane Junior Golf Tour events. GolfTradr and GripFitr both started because of things that annoyed me on a golf course or in a pro shop.",
  ],
};

export type Stat = {
  label: string;
  count?: { to: number; decimals: number; suffix: string };
};

export const STATS: Stat[] = [
  { label: "4.9 HDCP", count: { to: 4.9, decimals: 1, suffix: " HDCP" } },
  { label: "STATE CHAMPS · TEAM" },
  { label: "ROBOTICS CAPTAIN" },
  { label: "5 SHIPPED PROJECTS", count: { to: 5, decimals: 0, suffix: " SHIPPED PROJECTS" } },
];

export const CONTACT = {
  heading: "See more of what I build.",
  links: [
    { label: "golftradr.com", href: "https://golftradr.com" },
    { label: "gripfitr.com", href: "https://gripfitr.com" },
    { label: "shoreline-golf.com", href: "https://shoreline-golf.com" },
  ],
};
