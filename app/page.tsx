import BridgeMark from "@/components/BridgeMark";
import ChapterWipe from "@/components/ChapterWipe";
import SplitHeading from "@/components/SplitHeading";
import Engineering from "@/components/Engineering";

// Hero checkpoint: hero, bridge scene, split heading reveal and the Engineering
// color wipe across a page of full length. Sections below the hero hold only
// their headings until the rest is approved.
const SECTIONS = [
  { id: "projects", title: "Projects" },
  { id: "leadership", title: "Leadership" },
  { id: "timeline", title: "Timeline" },
  { id: "about", title: "About" },
];

export default function Home() {
  return (
    <>
      <ChapterWipe target="#engineering" />
      <header className="fixed inset-x-0 top-0 z-20">
        <div className="wrap flex h-nav items-center gap-3">
          <BridgeMark className="mark" />
          <span className="display text-title uppercase">Griffin Brodie</span>
        </div>
      </header>
      <main className="relative z-10">
        <section id="top" className="hero wrap flex flex-col justify-end pb-8 pt-nav">
          <div className="panel">
            <h1 className="hero-name display text-mega font-black uppercase">
              <span className="block">Griffin</span>
              <span className="block">Brodie</span>
            </h1>
            <span className="hero-rule mt-5" aria-hidden="true" />
            <p className="mt-4 max-w-measure text-lead">
              Madison, CT, class of 2027, applying to study civil engineering.
            </p>
          </div>
        </section>

        <Engineering />

        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="wrap min-h-[120vh] py-9">
            <div className="panel">
              <SplitHeading>{s.title}</SplitHeading>
            </div>
          </section>
        ))}

        <footer className="wrap min-h-[100vh] py-9">
          <div className="panel">
            <SplitHeading>Live sites</SplitHeading>
          </div>
        </footer>
      </main>
    </>
  );
}
