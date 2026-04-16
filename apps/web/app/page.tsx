import Image from "next/image";
import type { CSSProperties } from "react";
import {
  aboutFacts,
  featuredProjects,
  highlights,
  knowledgeGroups,
  profile,
  stack,
} from "@/lib/content";

export default function Home() {
  const metrics = [
    {
      label: "Featured Projects",
      value: String(featuredProjects.length).padStart(2, "0"),
    },
    {
      label: "Knowledge Blocks",
      value: String(knowledgeGroups.length).padStart(2, "0"),
    },
    {
      label: "Core Technologies",
      value: String(stack.length).padStart(2, "0"),
    },
  ];

  const journeyButtons = [
    { href: "#who-i-am", label: "Who I Am" },
    { href: "#knowledge", label: "My Knowledge" },
    { href: "#my-projects", label: "My Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <main className="page-shell">
      <div className="noise-layer" aria-hidden="true" />

      <header className="topbar card">
        <p className="brand">{profile.name}</p>
        <nav className="topbar-links" aria-label="Main">
          <a href="#who-i-am">Who I Am</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#my-projects">Projects</a>
        </nav>
      </header>

      <section id="who-i-am" className="hero hero-profile card target-slide-right">
        <div className="profile-copy">
          <p className="eyebrow">PORTFOLIO 2026</p>
          <h1>{profile.role}</h1>
          <p className="lead">{profile.intro}</p>
          <p className="sublead">{profile.summary}</p>

          <ul className="profile-facts">
            {aboutFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <div className="hero-actions">
            <a className="button button-primary" href="#knowledge">
              My Knowledge
            </a>
            <a className="button button-ghost" href="#my-projects">
              My Projects
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
            <a href={profile.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
          </div>
        </div>

        <figure className="profile-photo-wrap reveal" style={{ "--index": 0 } as CSSProperties}>
          <Image
            src={profile.photo}
            alt={`${profile.name} profile`}
            className="profile-photo"
            width={640}
            height={800}
            priority
          />
        </figure>
      </section>

      <nav className="journey-nav card" aria-label="Section jump">
        {journeyButtons.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className="journey-button reveal"
            style={{ "--index": index } as CSSProperties}
          >
            {item.label}
          </a>
        ))}
      </nav>

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

      <section id="knowledge" className="section card target-slide-left">
        <div className="section-head">
          <div>
            <p className="eyebrow">MY KNOWLEDGE</p>
            <h2>What I Know and Build</h2>
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

        <div className="knowledge-grid">
          {knowledgeGroups.map((group, index) => (
            <article
              key={group.title}
              className="knowledge-card reveal"
              style={{ "--index": index + 1 } as CSSProperties}
            >
              <h3>{group.title}</h3>
              <ul className="knowledge-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

      <section id="my-projects" className="section card target-slide-diagonal">
        <div className="section-head">
          <div>
            <p className="eyebrow">MY PROJECTS</p>
            <h2>What I Already Shipped</h2>
          </div>
          <p className="section-note">
            Personal projects with practical use cases in AI, backend, and mobile development.
          </p>
        </div>

        <div className="featured-project-grid">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="featured-project-card reveal"
              style={{ "--index": index } as CSSProperties}
            >
              <div className="project-heading-meta">
                <p className="project-category">{project.subtitle}</p>
                {project.scope ? <span className="project-scope">{project.scope}</span> : null}
              </div>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <ul className="project-bullets">
                {project.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-tag-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="project-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {project.note ? <p className="project-note">{project.note}</p> : null}

              <div className="project-actions">
                {project.repoUrl ? (
                  <a href={project.repoUrl} className="project-link" target="_blank" rel="noreferrer">
                    {project.linkLabel ?? "Open GitHub Repo"}
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a href={project.liveUrl} className="project-link" target="_blank" rel="noreferrer">
                    Open Live Site
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section card contact-card target-slide-up">
        <div>
          <p className="eyebrow">LETS BUILD</p>
          <h2>Open to backend, mobile and AI product work</h2>
          <p>
            If you want, next we can add deeper case-study pages, video demos, and a contact form
            with backend delivery.
          </p>
        </div>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
          >
            Send email
          </a>
          <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
            Open GitHub
          </a>
          <a
            className="button button-ghost"
            href={profile.telegram}
            target="_blank"
            rel="noreferrer"
          >
            Open Telegram
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>
          {new Date().getFullYear()} - Built by {profile.name}
        </p>
      </footer>
    </main>
  );
}
