import Link from "next/link";
import type { CSSProperties } from "react";
import { getCategories, getProjects } from "@/lib/api";
import { highlights, profile, stack } from "@/lib/content";

type SearchParams = {
  category?: string | string[];
};

type HomePageProps = {
  searchParams?: Promise<SearchParams>;
};

function buildCategoryHref(slug?: string) {
  if (!slug) {
    return "/";
  }

  return `/?category=${encodeURIComponent(slug)}`;
}

function formatPrice(priceCents: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(priceCents / 100);
  } catch {
    return `${(priceCents / 100).toFixed(0)} ${currency}`;
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const selectedCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const [categories, projects] = await Promise.all([
    getCategories(),
    getProjects(selectedCategory),
  ]);

  const visibleCategories = new Set(
    projects.map((project) => project.category?.name).filter(Boolean),
  );

  const metrics = [
    {
      label: "Projects Online",
      value: String(projects.length).padStart(2, "0"),
    },
    {
      label: "Active Categories",
      value: String(visibleCategories.size).padStart(2, "0"),
    },
    {
      label: "Core Technologies",
      value: String(stack.length).padStart(2, "0"),
    },
  ];

  return (
    <main className="page-shell">
      <div className="noise-layer" aria-hidden="true" />

      <header className="topbar card">
        <p className="brand">{profile.name}</p>
        <nav className="topbar-links" aria-label="Main">
          <a href="#projects">Projects</a>
          <a href="#about">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero card">
        <p className="eyebrow">PORTFOLIO 2026</p>
        <h1>{profile.role}</h1>
        <p className="lead">{profile.intro}</p>
        <p className="sublead">{profile.summary}</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View cases
          </a>
          <a className="button button-ghost" href={`mailto:${profile.email}`}>
            Send message
          </a>
        </div>

        <div className="hero-meta">
          <span>{profile.location}</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="metric-card reveal"
            style={{ "--index": index } as CSSProperties}
          >
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section id="projects" className="section card">
        <div className="section-head">
          <div>
            <p className="eyebrow">REAL DATA FROM API</p>
            <h2>Selected Projects</h2>
          </div>
          <p className="section-note">
            Data is loaded from your NestJS endpoint `GET /products`.
          </p>
        </div>

        <div className="chips" role="tablist" aria-label="Project categories">
          <Link
            href={buildCategoryHref()}
            className={`chip ${!selectedCategory ? "chip-active" : ""}`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={buildCategoryHref(category.slug)}
              className={`chip ${selectedCategory === category.slug ? "chip-active" : ""}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {projects.length === 0 ? (
          <p className="empty-state">
            No active projects in this category yet. Add items through the API and they will
            appear here automatically.
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="project-card reveal"
                style={{ "--index": index } as CSSProperties}
              >
                <p className="project-category">
                  {project.category?.name ?? "General"}
                </p>
                <h3>{project.title}</h3>
                <p className="project-description">
                  {project.description ??
                    "Description is coming soon. Backend contracts are already ready for this case."}
                </p>
                <div className="project-meta">
                  <span>{formatPrice(project.priceCents, project.currency)}</span>
                  <span>Stock: {project.stock}</span>
                </div>
                <Link href={`/projects/${project.slug}`} className="project-link">
                  Open case
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="about" className="section card">
        <div className="section-head">
          <div>
            <p className="eyebrow">HOW I WORK</p>
            <h2>Development Approach</h2>
          </div>
        </div>

        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="highlight-card reveal"
              style={{ "--index": index } as CSSProperties}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="stack-wrap">
          {stack.map((tech) => (
            <span key={tech} className="stack-chip">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section id="contact" className="section card contact-card">
        <div>
          <p className="eyebrow">LETS BUILD</p>
          <h2>Ready to push this frontend to production quality</h2>
          <p>
            Next step can be auth pages, cart flow, and checkout screens in the same design
            language.
          </p>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            Send email
          </a>
          <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
            Open GitHub
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>
          {new Date().getFullYear()} - Built with Next.js + NestJS by {profile.name}
        </p>
      </footer>
    </main>
  );
}