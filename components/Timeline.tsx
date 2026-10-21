import { TIMELINE } from "@/lib/content";
import SplitHeading from "@/components/SplitHeading";

// The one numbered list on the site, because it is a real sequence.
export default function Timeline() {
  return (
    <section id="timeline" className="section" aria-labelledby="timeline-h">
      <div className="wrap">
        <div className="panel col-text">
          <SplitHeading id="timeline-h">Timeline</SplitHeading>
        </div>
        <ol className="timeline col-text mt-8">
          {TIMELINE.map((t, i) => (
            <li key={i} className="tl-item panel">
              <span className="tl-num display" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                {t.when && <p className="font-semibold text-blue">{t.when}</p>}
                <p className="text-lead">{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
