import { CONTACT } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="pb-12 pt-20 sm:pt-28">
      <div className="wrap">
        <div className="panel max-w-[640px]">
          <h2 className="section-title max-w-[16ch]">{CONTACT.heading}</h2>
          <div className="mt-8 flex flex-col items-start gap-2.5">
            {CONTACT.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="border-b border-line pb-0.5 text-[1rem] text-ink no-underline transition-colors hover:border-green-deep hover:text-green-deep"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-line pt-6 text-[0.8rem] text-ink-soft">
            <span>© 2026 Griffin Brodie</span>
            <span>Built from scratch. No template.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
