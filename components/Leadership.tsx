import { LEADERSHIP } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";
import CountUp from "@/components/CountUp";
import TransitionLink from "@/components/TransitionLink";

// Plain rows: name, role, one line. The one sourced number is set large.
export default function Leadership() {
  return (
    <section id="leadership" className="section" aria-labelledby="leadership-h">
      <div className="wrap">
        <div className="panel col-text">
          <SplitHeading id="leadership-h" className="heading-long">
            Leadership and extracurriculars
          </SplitHeading>
        </div>
        <ul className="lead-rows col-text mt-8">
          {LEADERSHIP.map((l) => (
            <li key={l.name} className="lead-row panel">
              <div>
                <h3 className="display text-title">
                  {l.href ? <TransitionLink href={l.href}>{l.name}</TransitionLink> : l.name}
                </h3>
                {l.role && <p className="mt-1 font-semibold">{l.role}</p>}
                {l.detail && <p className="mt-1 text-steel">{l.detail}</p>}
              </div>
              {l.figure && (
                <p className="lead-figure">
                  <span className="lead-figure-num display text-figure">
                    <CountUp value={l.figure.value} prefix={l.figure.prefix} suffix={l.figure.suffix} />
                  </span>
                  <span className="lead-figure-label text-steel">{l.figure.label}</span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
