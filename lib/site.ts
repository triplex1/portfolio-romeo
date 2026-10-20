/**
 * Public site URL. Change this one constant if the domain changes.
 * Canonical, Open Graph, sitemap, robots, and JSON-LD all read it.
 */
export const SITE_URL = "https://portfolio-romeo.vercel.app";

export const SITE_NAME = "Romeo Tagalogon";

export const SITE_TITLE = "Romeo Tagalogon — Web Developer & AI Engineer";

export const SITE_DESCRIPTION =
  "Romeo Tagalogon builds websites, AI receptionists, and automations for small businesses in the US and Australia.";

export const EMAIL = "jrtagalogon@gmail.com";

export const GITHUB_URL = "https://github.com/triplex1";

export const PHONE_DISPLAY = "+63 963 982 8704";

export const PHONE_TEL = "+639639828704";

export const RESUME_URL =
  "https://www.dropbox.com/scl/fi/f3j0ez5yqy14ch76v5fjr/My-CV.pdf?rlkey=oieeurecsly5v9mbzsuoq9ueb&st=7q3e7584&dl=0";

export const nav = [
  { href: "#services", id: "services", label: "Services" },
  { href: "#about", id: "about", label: "About" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#websites", id: "websites", label: "Websites" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PHP",
  "WordPress",
  "Shopify",
  "Tailwind",
  "Solidity",
  "Kotlin",
  "Git",
  "Figma",
] as const;

export const services = [
  {
    number: "01",
    title: "Websites",
    text: "Custom, responsive websites for small businesses — WordPress, Shopify, or custom code. A build can include technical SEO, page speed, and a clear page structure.",
  },
  {
    number: "02",
    title: "AI receptionists and chatbots",
    text: "A receptionist or on-site chatbot that answers common questions, takes a message, and hands off anything it should not handle. The business stays in the loop.",
  },
  {
    number: "03",
    title: "Automations",
    text: "Small workflows for repetitive work: questionnaire drafts, price or inventory alerts, follow-up messages, and connections between tools a shop already uses.",
  },
] as const;

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  live?: string;
  repo?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    title: "RFP Questionnaire Auto-Responder",
    summary:
      "Open-source web app that drafts answers to security questionnaires and RFPs from a company profile you provide, and flags gaps instead of filling them in. You bring an Anthropic API key. Nothing is stored on a server.",
    tags: ["Next.js", "TypeScript", "Claude"],
    live: "https://rfp-questionnaire-autoresponder.vercel.app",
    repo: "https://github.com/triplex1/rfp-questionnaire-autoresponder",
  },
  {
    title: "Edge Reactor",
    summary:
      "A paper-trading desk for public Polymarket books and BTCUSDT. Fills are simulated, and real Bybit orders stay off.",
    tags: ["Next.js", "Paper trading"],
    live: "https://edge-reactor.vercel.app",
    note: "Paper only. Not a live brokerage, and not investment advice.",
  },
  {
    title: "Little Bereans",
    summary:
      "A web app that turns a Bible topic or passage into a kids Sunday School lesson for ages 6–12, with a KJV memory verse, story, discussion questions, and an activity. The live app can generate lessons in English or Cebuano.",
    tags: ["Next.js", "Gemini"],
    live: "https://little-bereans.vercel.app",
  },
  {
    title: "Local Store Agents",
    summary:
      "Multi-tenant shop software with staff roles, a parts and services catalog, a stock ledger, and a store chatbot for inventory, prices, and hours. It starts with motorcycle parts and repair shops, and the seed data also includes a hardware store and a grocery.",
    tags: ["Next.js", "Postgres", "Prisma"],
    note: "Private repository. No public demo.",
  },
  {
    title: "Decentralized Voting System",
    summary:
      "A first Solidity project: a voting contract where an admin adds candidates, each wallet address can vote once, and the counts stay on the contract for anyone to read.",
    tags: ["Solidity", "Ethereum"],
    repo: "https://github.com/triplex1/Decentralized-Voting-System",
  },
  {
    title: "AI Inventory Agent for Mobile",
    summary:
      "An Android app, written in Kotlin and Jetpack Compose, for motor-parts inventory. It includes voice commands through Gemini, Firestore sync, an analytics screen, and CSV or PDF export.",
    tags: ["Kotlin", "Android", "Gemini"],
    repo: "https://github.com/triplex1/AI-Inventory-Agent-for-mobile",
  },
  {
    title: "Trading Notification Bot",
    summary:
      "A Python bot that checks crypto prices on Binance or Coinbase and sends a Telegram, email, or Discord alert when a price crosses a threshold you set. It also includes a TradingView webhook server.",
    tags: ["Python", "Telegram"],
    repo: "https://github.com/triplex1/trading-notification-bot",
  },
  {
    title: "AI Engineering Tutorial",
    summary:
      "A public beginner tutorial project: planned lessons with AI tutors, playground practice, and a Notes Tutor capstone that would answer questions from a learner’s own notes using RAG. The repository currently holds the plan, not a finished app.",
    tags: ["Tutorial", "RAG"],
    repo: "https://github.com/triplex1/ai-engineering-tutorial",
  },
];

export type Website = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const websites: Website[] = [
  {
    title: "DP Air Corp",
    description: "Data center design, environmental control, and critical power solutions.",
    image: "/images/websites/air-corp-data-center-web-design-1024x683.webp",
    alt: "DP Air Corp website",
  },
  {
    title: "Centerpoint Landscaping",
    description: "Southern Nevada's premier landscape installation and 3D design experts.",
    image: "/images/websites/centerpoint-landscaping-website-showcase-1024x683.webp",
    alt: "Centerpoint Landscaping website",
  },
  {
    title: "Las Vegas Coin Laundry",
    description: "Your one-stop place for a clean, bright, and safe laundry experience.",
    image: "/images/websites/las-vegas-coin-laundry-website-showcase-1024x683.webp",
    alt: "Las Vegas Coin Laundry website",
  },
  {
    title: "Adayasol",
    description: "Professional web development and digital solutions.",
    image: "/images/websites/adayasol.webp",
    alt: "Adayasol website",
  },
  {
    title: "Asian Chamber of Commerce",
    description: "Professional business organization website with member resources.",
    image: "/images/websites/asian-chamber-of-commerce-webdesign-1024x683.webp",
    alt: "Asian Chamber of Commerce website",
  },
  {
    title: "Clean Cans",
    description: "Professional cleaning services website with lead generation focus.",
    image: "/images/websites/Clean-Cans-website-portfolio-showcase-1024x683.webp",
    alt: "Clean Cans website",
  },
  {
    title: "Dr Death Pest Control",
    description: "Professional pest control services website.",
    image: "/images/websites/dr-death-pest-control-website-showcase-1024x683.webp",
    alt: "Dr Death Pest Control website",
  },
  {
    title: "EIC",
    description: "Professional business website development.",
    image: "/images/websites/EIC-website-portfolio-showcase-2025-1024x683.webp",
    alt: "EIC website",
  },
  {
    title: "LVFOP",
    description: "Professional organization website.",
    image: "/images/websites/LVFOP-portfolio-1024x683.webp",
    alt: "LVFOP website",
  },
  {
    title: "LVIPC",
    description: "Professional business website.",
    image: "/images/websites/lvipc-website-showcase-1024x683.webp",
    alt: "LVIPC website",
  },
  {
    title: "LVJC",
    description: "Professional organization website.",
    image: "/images/websites/LVJC-website-portfolio-showcase-1024x683.webp",
    alt: "LVJC website",
  },
  {
    title: "Martin Harris",
    description: "Professional business website.",
    image: "/images/websites/Martin-Harris-website-showcase-1024x683.webp",
    alt: "Martin Harris website",
  },
  {
    title: "Rae's Restaurant",
    description: "Restaurant website and online presence.",
    image: "/images/websites/raes-restaurant-website-showcase-1024x683.webp",
    alt: "Rae's Restaurant website",
  },
  {
    title: "RCC",
    description: "Professional business website development.",
    image: "/images/websites/RCC-website-portfolio-showcase-2025-1024x683.webp",
    alt: "RCC website",
  },
  {
    title: "Sin City Electrical",
    description: "Electrical services website.",
    image: "/images/websites/sin-city-electrical-website-showcase-1024x683.webp",
    alt: "Sin City Electrical website",
  },
  {
    title: "Sin City Plumbing",
    description: "Plumbing services website.",
    image: "/images/websites/sinc-city-plumbing-website-showcase-1024x683.webp",
    alt: "Sin City Plumbing website",
  },
  {
    title: "Vegas Artificial Grass",
    description: "Artificial grass installation services website.",
    image: "/images/websites/vegas-artificial-grass-website-showcase-1024x683.webp",
    alt: "Vegas Artificial Grass website",
  },
  {
    title: "Vegas Voice",
    description: "Media and news website.",
    image: "/images/websites/Vegas-Voice-Portfolio-1024x683.webp",
    alt: "Vegas Voice website",
  },
  {
    title: "Inspired Dental",
    description: "Professional dental services website.",
    image: "/images/websites/Inspired-Dental-website-showcase-1024x683.webp",
    alt: "Inspired Dental website",
  },
];
