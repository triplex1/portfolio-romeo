import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { websites, type Website } from "@/lib/site";

function WebsiteCard({ site }: { site: Website }) {
  return (
    <article className="site-card glass overflow-hidden rounded-3xl">
      <div className="aspect-[3/2] overflow-hidden bg-void">
        <Image src={site.image} alt={site.alt} width={1024} height={683} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-paper">{site.title}</h3>
        <p className="mt-2 text-muted">{site.description}</p>
      </div>
    </article>
  );
}

export function Websites() {
  const first = websites.slice(0, 6);
  const rest = websites.slice(6);

  return (
    <section id="websites" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium tracking-[0.22em] text-cyan uppercase">Websites</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-[-0.03em] text-paper sm:text-5xl">
            Sites already on this portfolio
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-balance text-muted">
            A sample of websites designed, developed, and maintained for businesses. Captions are the ones already published here.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {first.map((site, index) => (
            <Reveal key={site.title} delay={(index % 3) * 70}>
              <WebsiteCard site={site} />
            </Reveal>
          ))}
        </div>

        <details className="group mt-8">
          <summary className="btn btn-ghost mx-auto w-fit cursor-pointer list-none">
            <span className="group-open:hidden">Show more websites</span>
            <span className="hidden group-open:inline">Show fewer websites</span>
          </summary>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((site) => (
              <WebsiteCard key={site.title} site={site} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
