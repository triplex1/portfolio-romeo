import { skills } from "@/lib/site";

export function Skills() {
  const items = skills.map((skill) => (
    <li key={skill} className="rounded-full border border-line bg-void/70 px-3 py-1.5 text-xs font-medium tracking-[0.16em] text-muted uppercase">
      {skill}
    </li>
  ));

  return (
    <section aria-label="Technologies" className="relative z-10 border-y border-line bg-void/75 py-4">
      <div className="marquee px-5 sm:px-8">
        <div className="marquee-track">
          <ul className="skill-row">{items}</ul>
          <ul className="skill-row marquee-copy" aria-hidden="true">
            {skills.map((skill) => (
              <li key={`copy-${skill}`} className="rounded-full border border-line px-3 py-1.5 text-xs font-medium tracking-[0.16em] text-muted uppercase">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
