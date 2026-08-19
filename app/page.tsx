import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Engineering from "@/components/Engineering";
import Milestones from "@/components/Milestones";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Parallax from "@/components/Parallax";

export default function Home() {
  return (
    <>
      <Nav />
      <Parallax />
      <main>
        <Hero />
        <Marquee />
        <Engineering />
        <Milestones />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
