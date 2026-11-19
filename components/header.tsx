"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors ${
          scrolled || open ? "border-line bg-void/85" : "border-transparent bg-void/45"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="flex items-center gap-3 text-paper no-underline" onClick={close}>
            <span className="grid h-9 w-9 place-items-center rounded-md border border-cyan/40 bg-cyan/10 font-display text-sm font-bold text-cyan">
              RT
            </span>
            <span className="text-[0.98rem] font-semibold tracking-tight">Romeo Tagalogon</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? "true" : undefined}
                className={`rounded-full px-3 py-2 text-sm no-underline ${
                  active === item.id ? "text-cyan" : "text-muted hover:text-paper"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary ml-3 !min-h-10 !px-4 !py-2 text-sm">
              Hire me
            </a>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>

        {open ? (
          <nav id="mobile-nav" className="border-t border-line bg-void/95 px-5 py-4 md:hidden" aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-lg text-paper no-underline hover:bg-white/5"
                    onClick={close}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      <nav className="chapter-rail fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block" aria-label="Sections">
        <ol className="flex flex-col items-end">
          {nav.map((item) => (
            <li key={item.id}>
              <a href={item.href} aria-current={active === item.id ? "true" : undefined}>
                <span className="label">{item.label}</span>
                <span
                  className={`block h-2.5 w-2.5 rounded-full border ${
                    active === item.id ? "border-cyan bg-cyan" : "border-paper/70 bg-paper/40"
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
