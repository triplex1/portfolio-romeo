import { Reveal } from "@/components/reveal";
import { EMAIL, GITHUB_URL } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)]">
        <Reveal>
          <div className="glass h-full rounded-[2rem] p-6 sm:p-10">
            <p className="text-sm font-medium tracking-[0.22em] text-cyan uppercase">About</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.03em] text-paper sm:text-5xl">
              A developer who cares how the work is used
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a passionate web developer with a strong foundation in modern web technologies. My journey has been driven by a love for creating efficient, scalable, and user-friendly sites. I continuously learn and adapt to new technologies, always striving to deliver high-quality solutions that meet both technical requirements and user needs.
              </p>
              <p>
                Whether you need a team player with SEO expertise, clean code, or reliable DevOps — I&apos;m flexible, collaborative, and committed to coding standards that scale.
              </p>
              <p>
                Alongside websites, I build AI receptionists, chatbots, and small automations for businesses in the United States and Australia.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className="glass h-full rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-sm font-medium tracking-[0.22em] text-cyan uppercase">At a glance</h3>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-sm text-muted">Also known as</dt>
                <dd className="text-lg text-paper">Jr</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Work</dt>
                <dd className="text-lg text-paper">Websites, AI receptionists, automations</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Working with</dt>
                <dd className="text-lg text-paper">Small businesses in the US and Australia</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Email</dt>
                <dd>
                  <a className="text-lg text-cyan underline decoration-cyan/40 underline-offset-4" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">GitHub</dt>
                <dd>
                  <a
                    className="text-lg text-cyan underline decoration-cyan/40 underline-offset-4"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/triplex1
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
