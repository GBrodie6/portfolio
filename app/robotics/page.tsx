import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ROBOTICS } from "@/lib/content";
import RoboticsDetail from "@/components/RoboticsDetail";
import SceneTone from "@/components/SceneTone";
import TransitionLink from "@/components/TransitionLink";

export const metadata: Metadata = {
  title: "Robotics, team 1695A | Griffin Brodie",
  description: "VEX V5 team 1695A, Daniel Hand Tigers A. Captain and lead designer, builder and driver.",
  alternates: { canonical: "https://griffinbrodie.site/robotics" },
};

export default function RoboticsPage() {
  return (
    <main className="page on-dark relative z-10">
      <SceneTone />
      <div className="wrap page-top">
        <TransitionLink href="/#engineering" className="text-link">
          Back to engineering
        </TransitionLink>
        <h1 className="display text-display mt-6" style={{ viewTransitionName: "robotics-title" } as CSSProperties}>
          {ROBOTICS.title}
        </h1>
        <div className="panel mt-6 max-w-measure">
          <p className="text-lead">{ROBOTICS.team}</p>
          <p className="mt-3 text-chalk-muted">{ROBOTICS.role}</p>
        </div>
        <RoboticsDetail />
        <div className="page-next panel">
          <TransitionLink href="/#projects" className="text-link">
            See the projects
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}
