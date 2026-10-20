# Romeo Tagalogon — Portfolio

Personal site for Romeo Tagalogon (Jr), a web developer and AI engineer who builds websites, AI receptionists, and automations for small businesses in the US and Australia.

The public URL is a single constant, `SITE_URL`, in [`lib/site.ts`](lib/site.ts). Canonical, Open Graph, sitemap, robots, and JSON-LD all read it.

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

`npm run build` writes a static site to `out/`.

## Deploy to Vercel

Import this GitHub repository. No environment variables or paid services are required.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Build command | `npm run build` (the Next.js default, `next build`) |
| Output directory | `out` |
| Install command | `npm install` |

`next.config.ts` sets `output: 'export'`. On the Next.js preset, Vercel runs `next build` and serves the static `out` directory. If the dashboard asks for an output directory, set it to `out`. Leave environment variables empty.

The production domain is `https://romeo-tagalogon.vercel.app`, set as `SITE_URL` in `lib/site.ts`. If that domain changes, update the constant and redeploy.
