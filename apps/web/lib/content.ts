export const profile = {
  name: "Vadym Hyrenko",
  role: "Fullstack Developer focused on Backend, Mobile and AI",
  location: "Kyiv, Ukraine",
  intro:
    "I build backend systems first, then turn them into user-friendly products with smooth frontend and mobile UX.",
  summary:
    "I care about practical products: stable APIs, useful AI flows, and interfaces that feel fast and clear.",
  email: "hello@yourdomain.dev",
  github: "https://github.com/hyrenkovadym",
  linkedin: "https://www.linkedin.com/in/hyrenkovadym/",
  photo: "/profile-placeholder.svg",
};

export const highlights = [
  {
    title: "Backend Architecture",
    text: "NestJS and Express services with clear contracts, authentication, and scalable module structure.",
  },
  {
    title: "Mobile Delivery",
    text: "React Native plus Expo apps with practical UX for real users, not demo-only prototypes.",
  },
  {
    title: "AI Integration",
    text: "OpenAI-powered features built around real tasks like analysis, recommendations, and support flows.",
  },
];

export const stack = [
  "TypeScript",
  "Node.js",
  "NestJS",
  "Express",
  "PostgreSQL",
  "Prisma",
  "React Native",
  "Expo",
  "OpenAI API",
  "JWT Auth",
  "Docker",
  "Python",
];

export const knowledgeGroups = [
  {
    title: "Backend",
    items: ["REST API design", "Auth flows", "Business logic", "Service architecture"],
  },
  {
    title: "Mobile",
    items: ["React Native UI", "Expo workflows", "Image pickers", "State-driven screens"],
  },
  {
    title: "AI",
    items: ["Prompt shaping", "OpenAI integration", "Context-aware analysis", "User-facing recommendations"],
  },
];

export const featuredProjects = [
  {
    slug: "telegram-bot-with-ai",
    title: "Telegram Bot with AI",
    subtitle: "Python bot",
    description:
      "AI-powered Telegram assistant built in Python with practical user flows and automation-ready structure.",
    repoUrl: "https://github.com/hyrenkovadym/Telegram-Bot-with-AI",
    tech: ["Python", "Telegram Bot API", "OpenAI API"],
    bullets: [
      "Conversational assistant behavior",
      "Integration-ready command flow",
      "Clean base for new AI features",
    ],
  },
  {
    slug: "agro-ai-scout",
    title: "Agro AI Scout",
    subtitle: "Mobile app for farmers and agronomy teams",
    description:
      "App that analyzes plant photos with AI, helps detect likely issues, and gives practical recommendations.",
    repoUrl: "https://github.com/hyrenkovadym/Agro-AI-scout-app",
    tech: [
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "OpenAI API",
    ],
    bullets: [
      "Photo-based plant analysis via OpenAI",
      "Plant and disease catalog screens",
      "Auth, profile settings, and analysis history",
      "Local backend JSON storage for quick iteration",
    ],
    note: "AI output is preliminary and should be validated by an agronomist for critical decisions.",
  },
];
