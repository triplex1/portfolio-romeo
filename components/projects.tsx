import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/site";

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.16em] text-ember uppercase">Projects</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl text-paper sm:text-5xl">Selected projects</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Each note matches the repository or the live demo. Private repositories are described here and are not linked.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
