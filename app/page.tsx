import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Projects } from "@/components/projects";
import { RevealObserver } from "@/components/reveal-observer";
import { ScrollStage } from "@/components/scroll-stage";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { Websites } from "@/components/websites";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <RevealObserver />
      <ScrollStage />
      <div className="progress" aria-hidden="true" />
      <Header />
      <main id="content" className="relative z-10">
        <Hero />
        <Skills />
        <Services />
        <About />
        <Projects />
        <Websites />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
