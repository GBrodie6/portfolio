export const NAV = [
  { label: "Engineering", href: "#engineering" },
  { label: "Work", href: "#work" },
  { label: "Leadership", href: "#leadership" },
  { label: "About", href: "#about" },
] as const;

export const HERO = {
  headline: "I'm applying to study civil engineering. This is what I've built.",
  lede:
    "I captain the Daniel Hand robotics team and started GolfTradr LLC. I also build websites for local businesses.",
  line: "Madison, CT, class of 2027",
};

export const ENGINEERING_HEAD = {
  heading: "Engineering work",
};

export const ENGINEERING = [
  {
    title: "Civil engineering",
    body:
      "Around age 8, at Eli Whitney summer camp, I built a bridge strong enough to stand on. In Architectural Design I designed a house. Senior year I'm taking AP Calculus BC and AP Physics C (Mechanics and E&M).",
  },
  {
    title: "Robotics",
    body:
      "Captain and lead designer, builder, and driver of Daniel Hand's VEX V5 team, 1695A. State-qualifying, ranked first in our school. The robot has a six-motor drive, an inertial sensor, and a lift with a pneumatic claw, programmed in C++. Current work: a record-and-playback autonomous and a custom 3D-printed claw. I keep the team's engineering notebook.",
  },
  {
    title: "Software and security",
    body:
      "GolfTradr handles real payments, so I added payment idempotency with advisory locks to prevent duplicate charges, 3D Secure enforcement, and SSRF protection, and put the site behind a Cloudflare firewall with bot blocking and rate limiting. I also fixed a critical mass-assignment vulnerability.",
  },
];

export type Project = {
  title: string;
  href?: string;
  body: string;
  tags: string[];
  shot?: string;
};

export const WORK_HEAD = {
  heading: "Projects",
};

export const WORK: Project[] = [
  {
    title: "GolfTradr",
    href: "https://golftradr.com",
    shot: "/work/golftradr.webp",
    body:
      "I started GolfTradr LLC and develop the site. People list golf equipment and propose trades to each other, with counter-offers, digital agreements, shipping tracking, and identity-verified sellers. About 15 beta testers.",
    tags: ["React", "Supabase", "Stripe", "Firebase"],
  },
  {
    title: "Triple G Landscaping",
    href: "https://triple-g-landscaping.com",
    shot: "/work/tripleg.webp",
    body:
      "A website for a local landscaping company, my first paying client. I built and deployed it and keep revising it with the owner.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    title: "WikiDash",
    href: "https://wikidash3.higgsfield.app",
    shot: "/work/wikidash.webp",
    body:
      "A multiplayer Wikipedia race game. Players race through real Wikipedia pages from a start article to a target, and the round ends when the first player arrives. The host sets the start and target and can turn off the back button, Ctrl+F, and leaving the tab.",
    tags: ["Multiplayer", "Web"],
  },
  {
    title: "Paige's Babysitting Site",
    href: "https://paigegrendi-babysitting.vercel.app",
    shot: "/work/paige.webp",
    body:
      "A website for a classmate's babysitting business, with 3D hero elements and a GSAP animation layer.",
    tags: ["Next.js", "GSAP", "3D/WebGL"],
  },
  {
    title: "GripFitr",
    href: "https://gripfitr.com",
    shot: "/work/gripfitr.webp",
    body:
      "A grip fitting tool. A quiz feeds a deterministic recommendation engine that covers seven major grip brands.",
    tags: ["JavaScript", "Deterministic Engine", "Vercel"],
  },
  {
    title: "Shoreline Golf",
    href: "https://shoreline-golf.com",
    shot: "/work/shoreline.webp",
    body:
      "A website for the golf shop in Westbrook where I work as head fitter and assistant manager.",
    tags: ["HTML/CSS/JS"],
  },
];

export const MILESTONES_HEAD = {
  heading: "Highlights",
};

export type Milestone = { text: string; label?: string };

export const MILESTONES: Milestone[] = [
  {
    label: "Around age 8",
    text: "Built a bridge at Eli Whitney summer camp strong enough to stand on.",
  },
  {
    label: "9th and 10th grade",
    text: "Fenced foil for Daniel Hand, with a winning varsity record.",
  },
  { text: "Designed a house in Architectural Design." },
  { label: "Junior year", text: "Started GolfTradr." },
  { text: "Built GripFitr, a grip fitting tool, and launched it at gripfitr.com." },
  { text: "Became captain of robotics team 1695A." },
  {
    text: "Head of Outreach for Teeing Off Against Cancer. The charity tournaments raised over $15,000 for Yale's Smilow Cancer Hospital.",
  },
  { text: "Landed my first paying client, Triple G Landscaping." },
  { text: "Built WikiDash, a multiplayer Wikipedia race game." },
];

export const LEADERSHIP_HEAD = {
  heading: "Leadership and service",
};

export const LEADERSHIP = [
  {
    title: "Teeing Off Against Cancer",
    body:
      "Head of Outreach. Charity golf tournaments raised over $15,000 for Yale's Smilow Cancer Hospital in a few months.",
  },
  {
    title: "Supercell Club",
    body:
      "Co-founder. Students play video games together so underclassmen can make friends with upperclassmen. About 30 members at its peak.",
  },
  {
    title: "MYFS Peer Advocate",
    body: "Madison Youth & Family Services, at Daniel Hand High School.",
  },
  {
    title: "Make-A-Wish",
    body: "Worked with Make-A-Wish to bring golf opportunities to kids.",
  },
  { title: "Robotics team 1695A", body: "Captain." },
  {
    title: "Kleins Golf Range",
    body: "Managed this local driving range from 9th to 11th grade.",
  },
  { title: "Shoreline Golf", body: "Head fitter and assistant manager." },
  {
    title: "Fencing",
    body:
      "Daniel Hand fencing team, foil, 9th and 10th grade. Winning varsity record. Helped younger fencers.",
  },
  { title: "National Honor Society", body: "Member." },
];

export const TECH = [
  "React",
  "Next.js",
  "TypeScript",
  "C++",
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
  heading: "About",
  paragraphs: [
    "I'm applying to study Civil Engineering with an Entrepreneurship minor. After college I want to combine engineering and entrepreneurship, with a focus on leadership and hands-on project management.",
    "I play golf for Daniel Hand. Our team won the CT state championship, where I finished fourth individually with a 73. In July 2026 I shot a 69 at the DeNicolo Memorial Junior Open and finished runner-up.",
  ],
};

export const STATS = [
  "Robotics captain, team 1695A",
  "Founder, GolfTradr LLC",
  "$15,000+ raised by charity tournaments",
  "Co-founder, Supercell Club",
];

export const CONTACT = {
  heading: "See more of what I build.",
  links: [
    { label: "golftradr.com", href: "https://golftradr.com" },
    { label: "gripfitr.com", href: "https://gripfitr.com" },
    { label: "shoreline-golf.com", href: "https://shoreline-golf.com" },
  ],
};
