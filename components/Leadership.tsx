import { LEADERSHIP, LEADERSHIP_HEAD } from "@/lib/content";

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="panel max-w-[640px]">
          <h2 className="section-title">{LEADERSHIP_HEAD.heading}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {LEADERSHIP.map((b) => (
              <div key={b.title} className="border-t border-line pt-4">
                <h3 className="mb-1.5 font-display text-[1.08rem] font-bold">{b.title}</h3>
                <p className="text-[0.95rem] text-ink-soft">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
