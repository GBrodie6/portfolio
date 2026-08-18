import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Engineering from "@/components/Engineering";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Engineering />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
