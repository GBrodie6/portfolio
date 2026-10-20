import { OTHER_ENGINEERING, ROBOTICS } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";
import CountUp from "@/components/CountUp";
import RobotDiagram from "@/components/RobotDiagram";

// Graphite chapter. Robotics leads: team and role, three figures with units,
// then the spec list beside the self-drawing systems diagram. The other
// engineering work follows as plain rows.
export default function Engineering() {
  return (
    <section id="engineering" className="on-dark section" aria-labelledby="engineering-h">
      <div className="wrap">
        <div className="panel">
          <SplitHeading id="engineering-h">Engineering</SplitHeading>
        </div>

        <div className="panel mt-8 max-w-measure">
          <h3 className="display text-title font-black">{ROBOTICS.title}</h3>
          <p className="mt-4 text-lead">{ROBOTICS.team}</p>
          <p className="mt-3 text-chalk-muted">{ROBOTICS.role}</p>
        </div>

        <ul className="figures col-text mt-8" aria-label="Drivetrain figures">
          {ROBOTICS.figures.map((f) => (
            <li key={f.label} className="figure panel">
              <span className="display whitespace-nowrap text-figure font-black">
                {f.text ?? <CountUp value={f.value!} decimals={f.decimals} />}
                {f.unit && <span className="figure-unit">{f.unit}</span>}
              </span>
              <span className="mt-2 block text-chalk-muted">{f.label}</span>
            </li>
          ))}
        </ul>

        <div className="eng-grid mt-8">
          <div className="panel">
            <dl className="spec">
              {ROBOTICS.specs.map((s) => (
                <div key={s.label} className="spec-row">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <h4 className="mt-7 font-semibold">In progress</h4>
            <ul className="mt-3 flex flex-col gap-2 text-chalk-muted">
              {ROBOTICS.inProgress.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-6 text-chalk-muted">{ROBOTICS.notebook}</p>
          </div>
          <div className="diagram-wrap">
            <RobotDiagram />
          </div>
        </div>

        <div className="panel col-text mt-9">
          <h3 className="display text-title font-black">Other engineering work</h3>
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
