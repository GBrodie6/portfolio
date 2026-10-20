import { ABOUT, STATS } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="panel grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            <h2 className="section-title">{ABOUT.heading}</h2>
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className={`max-w-[56ch] text-ink-soft ${i ? "mt-4" : "mt-8"}`}>
                {p}
              </p>
            ))}
          </div>
          <ul className="flex flex-col gap-3 lg:mt-[4.6rem]">
            {STATS.map((s) => (
              <li key={s} className="stat text-[0.98rem] font-medium text-green-deep">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
