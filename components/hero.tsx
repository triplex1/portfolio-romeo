import Image from "next/image";
import { HeroStage } from "@/components/hero-stage";
import { EMAIL, GITHUB_URL } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pb-24">
      <HeroStage />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink/50 px-3 py-1.5 text-sm text-paper">
            <span className="h-2 w-2 rounded-full bg-ember" aria-hidden="true" />
            Available for new projects
          </p>
          <p className="mb-3 text-sm font-medium tracking-[0.16em] text-ember uppercase">Hello, I&apos;m</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-paper sm:text-7xl">
            Romeo
            <span className="block text-ember">Tagalogon</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted sm:text-xl">
            Web developer and AI engineer. I sell websites and AI receptionists to small businesses in the US and Australia.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            I build fast, practical sites — WordPress, Shopify, and custom React — plus chatbots and automations for the questions and follow-up a small team should not have to repeat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Project%20inquiry`}>
              Start a project
            </a>
            <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2rem] border border-ember/40" aria-hidden="true" />
          <Image
            src="/images/profile.webp"
            alt="Romeo Tagalogon"
            width={720}
            height={987}
            priority
            className="relative aspect-[3/4] w-full rounded-[1.7rem] object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
