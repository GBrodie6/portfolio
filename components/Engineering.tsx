import { ENGINEERING, ENGINEERING_HEAD, TECH } from "@/lib/content";

export default function Engineering() {
  return (
    <section id="engineering" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="panel max-w-[640px]">
          <h2 className="section-title">{ENGINEERING_HEAD.heading}</h2>
          <div className="mt-10 flex flex-col gap-9">
            {ENGINEERING.map((b) => (
              <div key={b.title} className="border-t border-line pt-5">
                <h3 className="mb-2.5 font-display text-[1.2rem] font-bold">{b.title}</h3>
                <p className="text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-1.5" aria-label="Technologies">
            {TECH.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
