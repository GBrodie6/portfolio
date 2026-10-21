import { ROBOTICS } from "@/lib/content";
import CountUp from "@/components/CountUp";
import RobotDiagram from "@/components/RobotDiagram";

/** Figures, spec list, work in progress and the systems diagram (on Graphite). */
export default function RoboticsDetail() {
  return (
    <>
      <ul className="figures col-text mt-8" aria-label="Team result">
        {ROBOTICS.figures.map((f) => (
          <li key={f.label} className="figure panel">
            <span className="display whitespace-nowrap text-figure">
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
        </div>
        <div className="diagram-wrap">
          <RobotDiagram />
        </div>
      </div>
    </>
  );
}
