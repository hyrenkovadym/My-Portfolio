export type Profile = {
  name: string;
  role: string;
  location: string;
  intro: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  telegram: string;
  photo: string;
};

export type Highlight = {
  title: string;
  text: string;
};

export type KnowledgeGroup = {
  title: string;
  items: string[];
};

export type FeaturedProject = {
  slug: string;
  title: string;
  subtitle: string;
  scope: string;
  description: string;
  repoUrl?: string;
  liveUrl?: string;
  linkLabel?: string;
  tech: string[];
  bullets: string[];
  note?: string;
};

export const profile: Profile = {
  name: "Vadym Hyrenko",
  role: "Fullstack Developer focused on Backend, Mobile and AI",
  location: "Vinnytsia, Ukraine",
  intro:
    "I am 21, I work as a programmer at FRENDT, and I build practical products from backend logic to production-ready UI.",
  summary:
    "My projects combine Telegram automation, AI integrations, mobile apps, and web products for real users.",
  email: "girenkovadim68@gmail.com",
  github: "https://github.com/hyrenkovadym",
  linkedin: "https://www.linkedin.com/in/vadym-hyrenko-ab11a5290/",
  telegram: "https://t.me/hyrenkooo",
  photo: "/vadym-profile.webp",
};

export const aboutFacts = [
  "21 years old, based in Vinnytsia.",
  "Working at FRENDT as a programmer.",
  "Comfortable with backend-heavy and product-facing tasks.",
  "Studied automated testing at EPAM and passed the final exam project.",
];

export const highlights: Highlight[] = [
  {
    title: "Automation and Bots",
    text: "Telegram-first workflows for clients and staff, including approvals, reminders, and media scenarios.",
  },
  {
    title: "AI in Production",
    text: "OpenAI integrations for chat, file processing, image analysis, and voice transcription.",
  },
  {
    title: "Product Delivery",
    text: "From architecture and APIs to polished frontend/mobile UX, with focus on maintainability and clarity.",
  },
];

export const stack = [
  "Python",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Express",
  "PostgreSQL",
  "Prisma",
  "Telegram Bot API",
  "React Native",
  "Expo",
  "React + Vite",
  "OpenAI API",
  "Google Sheets API",
  "Google Drive API",
  "JWT Auth",
  "WebDriverIO",
  "Mocha",
  "Docker",
];

export const knowledgeGroups: KnowledgeGroup[] = [
  {
    title: "Backend and Integrations",
    items: ["REST API design", "Auth flows", "Google APIs", "Data processing pipelines"],
  },
  {
    title: "AI Workflows",
    items: ["OpenAI chat + vision", "Voice transcription", "Prompt strategy", "Model fallback logic"],
  },
  {
    title: "Frontend and Testing",
    items: ["React/Vite UI", "Portfolio UX", "E2E thinking", "Automated test scenarios"],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "frendt-bot",
    title: "FRENDT Bot (Telegram + AI)",
    subtitle: "Commercial bot for clients and internal staff",
    scope: "Commercial",
    description:
      "A multi-mode Python Telegram bot with client support flows and full internal HR/staff automation.",
    repoUrl: "https://github.com/hyrenkovadym/Telegram-Bot-with-AI",
    linkLabel: "Public bot repository",
    tech: [
      "Python 3.12",
      "python-telegram-bot",
      "OpenAI API",
      "PostgreSQL",
      "Google Sheets API",
      "Google Drive API",
      "Docker",
    ],
    bullets: [
      "Client mode: requests, menu, service/cable scenarios, voice and file processing.",
      "Staff mode: vacations, approvals, salary flows, issue board, intern tasks, internal AI chat.",
      "Media pipelines: case folders in Google Drive and logging in Google Sheets.",
      "AI helpers: chat, vision, embeddings, transcription, fallback models.",
      "Background automation: approval reminders and scheduled accrual checks.",
    ],
    note: "Production variant is used in company workflows; public repository demonstrates the core direction.",
  },
  {
    slug: "agro-ai-scout",
    title: "Agro AI Scout",
    subtitle: "Mobile app for farmers and agronomy teams",
    scope: "Product",
    description:
      "App that analyzes plant photos with AI, helps detect likely issues, and gives practical recommendations.",
    repoUrl: "https://github.com/hyrenkovadym/Agro-AI-scout-app",
    linkLabel: "Open GitHub Repo",
    tech: ["TypeScript", "React Native", "Expo", "Node.js", "Express", "OpenAI API"],
    bullets: [
      "Photo-based plant analysis via OpenAI.",
      "Plant and disease catalog screens.",
      "Auth, profile settings, and analysis history.",
      "Local backend JSON storage for quick iteration.",
    ],
    note: "AI output is preliminary and should be validated by an agronomist for critical decisions.",
  },
  {
    slug: "terranavix-site",
    title: "TerraNavix Site (English Landing)",
    subtitle: "Product landing page for autosteer system",
    scope: "Frontend",
    description:
      "A clean React + Vite marketing site focused on UX clarity for English-speaking users.",
    repoUrl: "https://github.com/hyrenkovadym/Terranavix-site-Eng",
    linkLabel: "Open GitHub Repo",
    tech: ["React", "Vite", "CSS", "SPA UX"],
    bullets: [
      "Hero, product benefits, kit overview, and use-case sections.",
      "Prepared architecture for ROI, FAQ, and contact form expansion.",
      "Optimized for static hosting and fast delivery.",
    ],
  },
  {
    slug: "currency-tracker",
    title: "Currency, Crypto and Metals Tracker",
    subtitle: "Full-stack dashboard with API gateway backend",
    scope: "Fullstack",
    description:
      "Tracks FX, crypto, and metals using external APIs with custom SVG charts and route-based dashboards.",
    repoUrl: "https://github.com/hyrenkovadym/currency-tracker",
    linkLabel: "Open GitHub Repo",
    tech: ["React", "TypeScript", "Vite", "Node.js", "Express", "SVG charts"],
    bullets: [
      "NBU spot and historical rates with conversion logic.",
      "Binance ticker and kline integration for crypto charts.",
      "Express backend as CORS-safe API proxy with normalization layer.",
      "Interactive charts with tooltip, crosshair, and highlighted nearest point.",
    ],
  },
  {
    slug: "inventory-logic-tests",
    title: "Inventory Logic Tests (EPAM exam project)",
    subtitle: "Automated testing project for SauceDemo",
    scope: "QA",
    description:
      "Exam project completed during EPAM automated testing training, focused on sorting and cart state logic.",
    repoUrl: "https://github.com/hyrenkovadym/inventory-logic-tests",
    linkLabel: "Open GitHub Repo",
    tech: ["WebDriverIO", "JavaScript", "Mocha", "XPath", "Page Object Model"],
    bullets: [
      "Validated price sorting flow from UI values to numeric assertions.",
      "Verified cart badge and cart content state after add/remove actions.",
      "Structured tests with reusable components and utility functions.",
    ],
    note: "This project was used as a final exam and was successfully passed.",
  },
];