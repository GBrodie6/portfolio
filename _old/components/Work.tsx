import Image from "next/image";
import { WORK, WORK_HEAD } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="panel">
          <h2 className="section-title">{WORK_HEAD.heading}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WORK.map((p) => (
              <article key={p.title} className="card flex flex-col gap-3.5">
                {p.shot && (
                  <div className="card-shot">
                    <Image
                      src={p.shot}
                      alt={`${p.title}, screenshot of the live site`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[1.25rem] font-bold">{p.title}</h3>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener"
                      className="whitespace-nowrap border-b border-green-deep pb-px text-[0.85rem] font-medium text-green-deep no-underline"
                    >
                      Visit<span className="sr-only"> {p.title}</span> site
                    </a>
                  )}
                </div>
                <p className="text-[0.95rem] text-ink-soft">{p.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1" aria-label="Built with">
                  {p.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
