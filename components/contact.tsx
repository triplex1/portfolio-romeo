import { Reveal } from "@/components/reveal";
import { EMAIL, GITHUB_URL, PHONE_DISPLAY, PHONE_TEL, RESUME_URL } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-[2rem] border border-line bg-[radial-gradient(700px_280px_at_100%_0%,rgba(224,122,61,0.28),transparent_60%)] bg-ink-2 px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-sm font-medium tracking-[0.16em] text-ember uppercase">Contact</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl text-paper sm:text-6xl">Let&apos;s build something useful</h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Tell me about the website, receptionist, or automation you want. Email is the direct line. There is no form backend.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href={`mailto:${EMAIL}?subject=Project%20inquiry`}>
                {EMAIL}
              </a>
              <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/triplex1
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-muted">
              <a className="text-paper underline decoration-ember/40 underline-offset-4" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
              <a
                className="text-paper underline decoration-ember/40 underline-offset-4"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
