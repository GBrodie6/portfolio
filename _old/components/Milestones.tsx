import { MILESTONES, MILESTONES_HEAD } from "@/lib/content";

export default function Milestones() {
  return (
    <section id="milestones" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="panel max-w-[640px]">
          <h2 className="section-title">{MILESTONES_HEAD.heading}</h2>
          <ol className="ms-list relative mt-10">
            <span className="ms-line" aria-hidden="true" />
            {MILESTONES.map((m, i) => (
              <li key={i} className="ms-item">
                <span className="ms-node" aria-hidden="true" />
                {m.label && <span className="ms-label">{m.label}</span>}
                <p className="text-[1.02rem] leading-snug text-ink">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
