export const NAV = [
  { label: "Engineering", href: "#engineering" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export const HERO = {
  eyebrow: "MADISON, CT · JUNIOR, CIVIL ENGINEERING BOUND",
  headline: "I build things that actually have to hold up.",
  lede:
    "I'm captain of my robotics team, I'm about to commit to Civil Engineering, and somewhere in between I built two golf software products that people actually use. I like building things more than I like talking about building them.",
};

export const ENGINEERING = [
  {
    title: "Civil Engineering",
    body:
      "I'm 99% set on studying Civil Engineering. I designed and built a house from scratch, floor plan, structure, all of it, in an Architectural Design class, and that project is honestly what got me hooked. Turns out I like things that have to physically hold up more than things that just run in a browser.",
  },
  {
    title: "Robotics",
    body:
      "I'm captain and lead engineer on my school's robotics team. I run the design process end to end, CAD, prototyping, all the way through competition day. It's where I learned to treat a build like a system instead of a one-off.",
  },
  {
    title: "Systems, not just screens",
    body:
      "Once a platform touches real money, the interesting engineering stops being visible. Building GolfTradr meant adding advisory-lock payment idempotency so trades can't double-charge, SSRF protection, 3D Secure enforcement, and a Cloudflare WAF layer with bot-fight mode and rate limiting. None of that shows up in a screenshot, but it's most of the actual work.",
  },
];

export type Project = {
  title: string;
  href?: string;
  body: string;
  tags: string[];
};

export const WORK: Project[] = [
  {
    title: "GolfTradr",
    href: "https://golftradr.com",
    body:
      "A peer-to-peer marketplace for trading golf equipment: trade proposals, digital agreements, shipping tracking, and seller verification, built as GolfTradr LLC with about 15 active beta testers.",
    tags: ["React", "Supabase", "Stripe", "Firebase"],
  },
  {
    title: "GripFitr",
    href: "https://gripfitr.com",
    body:
      "A live grip-fitting tool built on a deterministic recommendation engine, not a guess, covering seven major grip brands.",
    tags: ["JavaScript", "Deterministic Engine", "Vercel"],
  },
  {
    title: "Shoreline Golf",
    href: "https://shoreline-golf.com",
    body: "A website for the golf shop I work at, built solo, no template.",
    tags: ["HTML/CSS/JS", "Single-file build"],
  },
  {
    title: "Triple G Landscaping",
    href: "https://triple-g-landscaping-khaki.vercel.app",
    body:
      "The first client I landed on my own, a landscaping company in town. Built and deployed the whole site: Next.js, Tailwind, live, still getting revised as the owner tells me what he actually wants changed.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    title: "Paige's Babysitting Site",
    href: "https://paigegrendi-babysitting.vercel.app",
    body:
      "A babysitting business site for my girlfriend, with way more animation than a babysitting site really needs. 3D hero elements, a full GSAP animation layer, built solo.",
    tags: ["Next.js", "GSAP", "3D/WebGL"],
  },
];

export const ABOUT = {
  heading: "Mostly building. Also golf.",
  paragraphs: [
    "I'm 99% set on Civil Engineering, with a minor in Entrepreneurship. That's not really a sudden turn, it's basically what I've already been doing: building things and figuring out how to get people to actually use them.",
    "I also play competitively: T1 at the DeNicolo Memorial Junior Open this year, a 69, and I helped Daniel Hand win the CT State Championship as a team, I was 4th individually with a 73. I play CTPGA and Hurricane Junior Golf Tour events too. GolfTradr and GripFitr both started because of things that annoyed me on a golf course or in a pro shop.",
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
