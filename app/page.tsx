import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Engineering from "@/components/Engineering";
import Milestones from "@/components/Milestones";
import Work from "@/components/Work";
import Leadership from "@/components/Leadership";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <Engineering />
        <Milestones />
        <Work />
        <Leadership />
        <About />
        <Contact />
      </main>
    </>
  );
}
