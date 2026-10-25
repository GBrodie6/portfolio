import { BANDS, HERO } from "@/lib/content";
import ChapterWipe from "@/components/ChapterWipe";
import Engineering from "@/components/Engineering";
import ProjectsStrip from "@/components/ProjectsStrip";
import Leadership from "@/components/Leadership";
import Timeline from "@/components/Timeline";
import About from "@/components/About";
import Footer from "@/components/Footer";
import TextBand from "@/components/TextBand";
import Divider from "@/components/Divider";

// Engineering leads, then projects, leadership, the timeline and about. The
// bridge behind builds one segment at a time and closes at the footer.
export default function Home() {
  return (
    <>
      <ChapterWipe target="#engineering" />
      <main className="relative z-10">
        <section id="top" className="hero wrap" aria-label="Introduction">
          <div className="panel panel-fit">
            <h1 className="hero-name display text-mega uppercase">
              <span className="block">Griffin</span>
              <span className="block">Brodie</span>
            </h1>
            <span className="hero-rule mt-5" aria-hidden="true" />
            <p className="hero-line mt-4 max-w-measure text-lead">{HERO.line}</p>
          </div>
        </section>

        <Engineering />
        <TextBand items={BANDS.projects} />
        <ProjectsStrip />
        <Divider />
        <Leadership />
        <TextBand items={BANDS.facts} direction={1} />
        <Timeline />
        <Divider />
        <About />
        <Footer />
      </main>
    </>
  );
}
