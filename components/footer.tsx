import { EMAIL, GITHUB_URL, nav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold text-paper">Romeo Tagalogon</p>
          <p className="mt-1 text-sm text-muted">Building the web, one project at a time.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2">
          {nav.map((item) => (
            <a key={item.id} href={item.href} className="text-sm text-muted no-underline hover:text-paper">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${EMAIL}`} className="text-sm text-muted no-underline hover:text-paper">
            Email
          </a>
          <a href={GITHUB_URL} className="text-sm text-muted no-underline hover:text-paper" target="_blank" rel="noopener noreferrer">
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 w-full max-w-6xl px-5 text-sm text-muted sm:px-8">
        © 2026 Romeo Tagalogon.
      </p>
    </footer>
  );
}
