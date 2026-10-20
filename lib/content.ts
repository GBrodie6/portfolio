// Site copy. Every claim here is listed as sourced in FACTS.md.

export const ROBOTICS = {
  title: "Robotics, team 1695A",
  team: "Daniel Hand Tigers A, nicknamed Autobots. 2026-27 season. This year's game is Pinnacle.",
  role: "I'm captain and lead designer, builder and driver. We are state-qualifying and ranked first in our school.",
  figures: [
    { value: 6, decimals: 0, unit: "", label: "motors in the drive: four 11W, two 5.5W in the center" },
    { value: 2.75, decimals: 2, unit: " in", label: "wheels" },
    { text: "36:60", label: "gear ratio" },
  ] as { value?: number; decimals?: number; unit?: string; text?: string; label: string }[],
  specs: [
    { label: "Drive", value: "Six motors: four 11W and two 5.5W center motors" },
    { label: "Wheels", value: "2.75 in" },
    { label: "Gear ratio", value: "36:60" },
    { label: "Sensing", value: "Inertial sensor, no tracking wheels" },
    { label: "Lift", value: "Motor-driven lift" },
    { label: "Claw", value: "Pneumatic, with pitch and roll" },
    { label: "Code", value: "C++ in VEXcode V5" },
  ],
  inProgress: [
    "A record-and-playback autonomous that saves a driven run to an SD card and replays it.",
    "A custom 3D-printed claw to replace the pneumatic one.",
  ],
  notebook:
    "I keep the team's engineering notebook. The first entries are dated 8/26/26 (brain and controller port setup) and 10/14/26 (claw setup).",
};

export const OTHER_ENGINEERING = [
  { title: "House design", body: "In Architectural Design I designed a house." },
  {
    title: "First bridge",
    body: "Around age 8, at Eli Whitney summer camp, I built a bridge strong enough to stand on.",
  },
  {
    title: "Senior year courses",
    body: "AP Calculus BC and AP Physics C (Mechanics and E&M).",
  },
];
