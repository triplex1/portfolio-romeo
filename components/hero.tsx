import Image from "next/image";
import { EMAIL, GITHUB_URL } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 pb-16 lg:flex lg:min-h-[100svh] lg:items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16">
        <div className="hero-copy relative z-20">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-void/70 px-3 py-1.5 text-sm text-paper">
            <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden="true" />
            Available for new projects
          </p>
          <p className="mb-3 text-sm font-medium tracking-[0.22em] text-cyan uppercase">Hello, I&apos;m</p>
          <h1 className="font-display text-[clamp(3.15rem,12vw,6.6rem)] leading-[0.88] font-bold tracking-[-0.045em] text-paper">
            Romeo
            <span className="block text-cyan">Tagalogon</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-balance text-muted sm:text-xl">
            Web developer and AI engineer. I sell websites and AI receptionists to small businesses in the US and Australia.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-balance text-muted">
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

        <div className="relative z-10 order-first mx-auto w-full max-w-[17rem] lg:order-none lg:max-w-none">
          <div className="portrait-orbit-wrap" aria-hidden="true">
            <div className="portrait-orbit portrait-orbit-a" />
            <div className="portrait-orbit portrait-orbit-b" />
          </div>
          <div className="absolute -inset-3 rounded-[1.9rem] border border-cyan/40" aria-hidden="true" />
          <div className="absolute -inset-6 rounded-[2.2rem] border border-violet/25" aria-hidden="true" />
          <div className="relative z-20 rounded-[1.7rem] bg-[#120e0c] p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <Image
              src="/images/profile.webp"
              alt="Romeo Tagalogon"
              width={720}
              height={987}
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="relative aspect-[3/4] w-full rounded-[1.4rem] bg-[#120e0c] object-cover object-top"
            />
          </div>
        </div>
      </div>
      <a
        href="#services"
        className="absolute bottom-6 left-5 hidden items-center gap-3 text-xs tracking-[0.22em] text-muted uppercase no-underline hover:text-paper sm:left-8 lg:inline-flex"
      >
        <span className="h-px w-10 bg-cyan/70" aria-hidden="true" />
        Scroll
      </a>
    </section>
  );
}
