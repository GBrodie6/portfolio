// Site copy. Every claim here is listed as sourced in FACTS.md.

export const ROBOTICS = {
  title: "Robotics, team 1695A",
  team: "Daniel Hand Tigers A, nicknamed Autobots. 2026-27 season. This year's game is Pinnacle.",
  role: "I'm captain and lead designer, builder and driver. We are state-qualifying and ranked first in our school.",
  figures: [{ text: "1st", label: "ranked in our school, and state-qualifying" }] as {
    value?: number;
    decimals?: number;
    unit?: string;
    text?: string;
    label: string;
  }[],
  specs: [
    { label: "My role", value: "Captain, lead designer, builder and driver" },
    { label: "The robot", value: "Six-motor drive, a lift, and a pneumatic claw with pitch and roll" },
    { label: "Code", value: "C++ in VEXcode V5" },
    { label: "Notebook", value: "I keep the team's engineering notebook" },
  ],
  inProgress: [
    "A record-and-playback autonomous that saves a driven run to an SD card and replays it.",
    "A custom 3D-printed claw to replace the pneumatic one.",
  ],
};

export const OTHER_ENGINEERING = [
  { title: "House design", body: "I designed a house in Architectural Design." },
  {
    title: "First bridge",
    body: "Around age 8, at Eli Whitney summer camp, I built a bridge strong enough to stand on.",
  },
  {
    title: "Senior year courses",
    body: "AP Calculus BC and AP Physics C (Mechanics and E&M).",
  },
];

export const HERO = {
  line: "Madison, CT, class of 2027, applying to study civil engineering.",
};

export const NAV = [
  { label: "Engineering", id: "engineering" },
  { label: "Projects", id: "projects" },
  { label: "Leadership", id: "leadership" },
  { label: "About", id: "about" },
];

export type Project = {
  slug: string;
  title: string;
  line: string;
  url: string;
  host: string;
  shot: string;
  year?: string;
  facts: string[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "golftradr",
    title: "GolfTradr",
    line: "People list golf equipment and trade it with each other. I started GolfTradr LLC and build the site.",
    url: "https://golftradr.com",
    host: "golftradr.com",
    shot: "/work/golftradr.webp",
    year: "Started junior year",
    facts: [
      "People list equipment and propose trades to each other, with counter-offers.",
      "Digital agreements, shipping tracking and identity-verified sellers.",
      "About 15 beta testers.",
      "Payment idempotency with advisory locks to prevent duplicate charges.",
      "3D Secure enforcement and SSRF protection.",
      "A Cloudflare firewall with bot blocking and rate limiting.",
      "I fixed a critical mass-assignment vulnerability.",
    ],
    stack: ["React", "Supabase", "Stripe", "Firebase"],
  },
  {
    slug: "gripfitr",
    title: "GripFitr",
    line: "A grip fitting tool. A quiz feeds a deterministic recommendation engine that covers seven major grip brands.",
    url: "https://gripfitr.com",
    host: "gripfitr.com",
    shot: "/work/gripfitr.webp",
    facts: [
      "Golfers answer a quiz and get a grip recommendation.",
      "The engine is deterministic, so the same answers always give the same grip.",
      "It covers seven major grip brands.",
    ],
    stack: ["JavaScript", "Vercel"],
  },
  {
    slug: "selldeck",
    title: "SellDeck",
    line: "Pulls a seller's eBay inventory and orders into one dashboard and buys the shipping label in one click.",
    url: "https://selldeck.vercel.app",
    host: "selldeck.vercel.app",
    shot: "/work/selldeck.webp",
    year: "2026",
    facts: [
      "Buying a label writes the tracking number back to eBay.",
      "eBay tokens are encrypted with AES-256-GCM on the server and never reach the browser.",
      "Marketplaces are stored as rows, so Whatnot can join the same data model when its API opens.",
      "Labels run through Shippo in test mode for now.",
    ],
    stack: ["React", "Vite", "Supabase", "Vercel functions", "Shippo"],
  },
  {
    slug: "triple-g-landscaping",
    title: "Triple G Landscaping",
    line: "A website for a local landscaping company, my first paying client.",
    url: "https://triple-g-landscaping.com",
    host: "triple-g-landscaping.com",
    shot: "/work/tripleg.webp",
    facts: [
      "My first paying client.",
      "I built and deployed the site and keep revising it with the owner.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    slug: "paige-babysitting",
    title: "Paige's babysitting site",
    line: "A website for a classmate's babysitting business, with 3D hero elements and a GSAP animation layer.",
    url: "https://paigegrendi-babysitting.vercel.app",
    host: "paigegrendi-babysitting.vercel.app",
    shot: "/work/paige.webp",
    year: "2026",
    facts: [
      "Built for a classmate's babysitting business.",
      "3D elements in the hero and a GSAP animation layer.",
    ],
    stack: ["Next.js", "GSAP", "3D/WebGL"],
  },
  {
    slug: "shoreline-golf",
    title: "Shoreline Golf",
    line: "A website for the golf shop in Westbrook where I work as head fitter and assistant manager.",
    url: "https://shoreline-golf.com",
    host: "shoreline-golf.com",
    shot: "/work/shoreline.webp",
    facts: [
      "The shop is in Westbrook.",
      "I work there as head fitter and assistant manager.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "uphill-golf",
    title: "Uphill Golf",
    line: "A vertical physics golf game with 8 holes, pars 3 to 10.",
    url: "https://gbrodie6.github.io/uphill-golf/",
    host: "gbrodie6.github.io/uphill-golf",
    shot: "/work/uphill.webp",
    year: "2026",
    facts: [
      "Drag back and let go to hit, then climb to the pin at the top in as few strokes as you can.",
      "8 holes, from a par 3 to a par 10.",
    ],
    stack: ["HTML", "JavaScript"],
  },
  {
    slug: "wikidash",
    title: "WikiDash",
    line: "A multiplayer race through real Wikipedia pages, from a start article to a target.",
    url: "https://wikidash3.higgsfield.app",
    host: "wikidash3.higgsfield.app",
    shot: "/work/wikidash.webp",
    facts: [
      "Players race from a start article to a target, and the round ends when the first player arrives.",
      "The host sets the start and target and can turn off the back button, Ctrl+F, and leaving the tab.",
    ],
    stack: ["Multiplayer", "Web"],
  },
];

export const LEADERSHIP = [
  {
    name: "Teeing Off Against Cancer",
    role: "Head of Outreach",
    detail: "The charity golf tournaments raised over $15,000 for Yale's Smilow Cancer Hospital.",
    figure: { value: 15000, prefix: "$", suffix: "+", label: "raised" },
  },
  {
    name: "Robotics team 1695A",
    role: "Captain",
    detail: "Lead designer, builder and driver.",
    href: "/robotics",
  },
  {
    name: "Supercell Club",
    role: "Co-founder",
    detail: "Students play video games together so underclassmen can make friends with upperclassmen. About 30 members at its peak.",
  },
  {
    name: "MYFS Peer Advocate",
    role: "Madison Youth & Family Services",
    detail: "At Daniel Hand High School.",
  },
  { name: "Make-A-Wish", role: "", detail: "Worked with Make-A-Wish to bring golf opportunities to kids." },
  { name: "Kleins Golf Range", role: "Manager", detail: "Managed the local driving range from 9th to 11th grade." },
  { name: "Shoreline Golf", role: "Head fitter and assistant manager", detail: "The golf shop in Westbrook." },
  {
    name: "Fencing",
    role: "Daniel Hand, foil",
    detail: "9th and 10th grade, with a winning varsity record. Helped younger fencers.",
  },
  { name: "National Honor Society", role: "Member", detail: "" },
] as {
  name: string;
  role: string;
  detail: string;
  href?: string;
  figure?: { value: number; prefix?: string; suffix?: string; label: string };
}[];

/** In the order Griffin gave it. Undated items keep their place. */
export const TIMELINE = [
  { when: "Around age 8", text: "Built a bridge at Eli Whitney summer camp strong enough to stand on." },
  { when: "9th and 10th grade", text: "Fenced foil for Daniel Hand, with a winning varsity record." },
  { text: "Designed a house in Architectural Design." },
  { when: "Junior year", text: "Started GolfTradr." },
  { text: "Built GripFitr, a grip fitting tool, and launched it at gripfitr.com." },
  { text: "Became captain of robotics team 1695A." },
  { text: "Head of Outreach for Teeing Off Against Cancer. The tournaments raised over $15,000 for Yale's Smilow Cancer Hospital." },
  { text: "Landed my first paying client, Triple G Landscaping." },
  { text: "Built WikiDash, a multiplayer Wikipedia race game." },
] as { when?: string; text: string }[];

export const ABOUT = [
  "I'm applying to study civil engineering, with a minor in entrepreneurship. After college I want to combine engineering and entrepreneurship, with a focus on leadership and hands-on project management.",
  "I also play golf for Daniel Hand. We won the 2026 CT state championship, and I finished fourth individually with a 73. In July 2026 I shot 69 at the DeNicolo Memorial Junior Open and finished runner-up.",
];

export const BANDS = {
  projects: PROJECTS.map((p) => p.title),
  facts: [
    "Team 1695A",
    "Robotics captain",
    "Ranked first in our school",
    "$15,000+ raised for Smilow Cancer Hospital",
    "About 15 GolfTradr beta testers",
    "Class of 2027",
  ],
};
