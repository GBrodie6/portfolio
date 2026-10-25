import type { CSSProperties } from "react";
import { OTHER_ENGINEERING, ROBOTICS } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";
import RoboticsDetail from "@/components/RoboticsDetail";
import TransitionLink from "@/components/TransitionLink";

// Graphite chapter. Robotics leads, then the other engineering work as rows.
export default function Engineering() {
  return (
    <section id="engineering" className="on-dark section" aria-labelledby="engineering-h">
      <div className="wrap">
        <div className="panel panel-fit">
          <SplitHeading id="engineering-h">Engineering</SplitHeading>
        </div>

        <div className="panel mt-8 max-w-measure">
          <h3 className="display text-title" style={{ viewTransitionName: "robotics-title" } as CSSProperties}>
            <TransitionLink href="/robotics">{ROBOTICS.title}</TransitionLink>
          </h3>
          <p className="mt-4 text-lead">{ROBOTICS.team}</p>
          <p className="mt-3 text-chalk-muted">{ROBOTICS.role}</p>
        </div>

        <RoboticsDetail />

        <div className="panel col-text mt-9">
          <h3 className="display text-title">Other engineering work</h3>
          <ul className="rows mt-6">
            {OTHER_ENGINEERING.map((o) => (
              <li key={o.title} className="row">
                <span className="font-semibold">{o.title}</span>
                <span className="text-chalk-muted">{o.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
