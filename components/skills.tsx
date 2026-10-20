import { skills } from "@/lib/site";

export function Skills() {
  const items = skills.map((skill) => (
    <li key={skill} className="text-sm font-medium tracking-wide text-muted uppercase">
      {skill}
    </li>
  ));

  return (
    <section aria-label="Technologies" className="overflow-hidden border-y border-line bg-ink/80 py-4">
      <div className="marquee-track px-5">
        <ul className="skill-row">{items}</ul>
        <ul className="skill-row" aria-hidden="true">
          {skills.map((skill) => (
            <li key={`copy-${skill}`} className="text-sm font-medium tracking-wide text-muted uppercase">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
