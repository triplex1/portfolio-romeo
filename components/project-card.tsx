"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/site";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost !min-h-11 !px-4 !py-2 text-sm"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const reset = () => {
      card.style.transform = "";
      card.style.borderColor = "";
      card.classList.remove("is-tilting");
    };

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const pad = card.classList.contains("is-tilting") ? 36 : 0;
      const inside =
        event.clientX >= rect.left - pad &&
        event.clientX <= rect.right + pad &&
        event.clientY >= rect.top - pad &&
        event.clientY <= rect.bottom + pad;
      if (!inside) {
        if (card.classList.contains("is-tilting")) reset();
        return;
      }
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const rotateX = (0.5 - py) * 34;
      const rotateY = (px - 0.5) * 48;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-16px) scale(1.045)`;
      card.style.borderColor = "#ffb15a";
      card.classList.add("is-tilting");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      reset();
    };
  }, []);

  return (
    <article ref={ref} className="tilt-card flex h-full flex-col rounded-3xl border border-line bg-ink-2 p-6">
      <h3 className="text-2xl font-semibold tracking-tight text-paper">{project.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{project.summary}</p>
      {project.note ? <p className="mt-4 text-sm text-ember">{project.note}</p> : null}
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted uppercase">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.live ? <ExternalLink href={project.live}>Live demo</ExternalLink> : null}
        {project.repo ? <ExternalLink href={project.repo}>Source</ExternalLink> : null}
        {!project.live && !project.repo ? (
          <span className="text-sm text-muted">No public link</span>
        ) : null}
      </div>
    </article>
  );
}
