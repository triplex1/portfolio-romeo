import { Reveal } from "@/components/reveal";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.16em] text-ember uppercase">Services</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl text-paper sm:text-5xl">
            What I can build for a small business
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Three kinds of work, stated plainly. I also deploy a site and keep it updated after launch.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 90}>
              <article className="h-full rounded-3xl border border-line bg-ink-2 p-6 sm:p-7">
                <p className="font-serif text-3xl text-ember">{service.number}</p>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-paper">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
