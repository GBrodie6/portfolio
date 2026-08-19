import { TECH } from "@/lib/content";

export default function Marquee() {
  return (
    <div
      className="marquee border-y border-line bg-paper-alt/50"
      role="marquee"
      aria-label="Technologies used across these projects"
    >
      <div className="marquee-track">
        {TECH.map((t, i) => (
          <span key={`a-${i}`} className="marquee-item">
            {t}
            <span className="marquee-dot" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
        {TECH.map((t, i) => (
          <span key={`b-${i}`} className="marquee-item" aria-hidden="true">
            {t}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
