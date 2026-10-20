import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Projects } from "@/components/projects";
import { RevealObserver } from "@/components/reveal-observer";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { Websites } from "@/components/websites";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <RevealObserver />
      <Header />
      <main id="content">
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
