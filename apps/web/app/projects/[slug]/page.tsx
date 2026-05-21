import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api";
import { featuredProjects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const fallbackProject = !project
    ? featuredProjects.find((item) => item.slug === slug)
    : null;

  if (!project && !fallbackProject) {
    notFound();
  }

  const title = project?.title ?? fallbackProject!.title;
  const description = project?.description ?? fallbackProject!.description;
  const categoryName = project?.category?.name ?? fallbackProject!.scope ?? "General";
  const budget = project
    ? formatPrice(project.priceCents, project.currency)
    : "Not applicable (showcase case study)";
  const stock = project ? String(project.stock) : "Not applicable";

  return (
    <main className="detail-page">
      <article className="detail-card card" data-testid="project-detail-card">
        <Link href="/" className="back-link">
          Back to home
        </Link>

        <p className="eyebrow">PROJECT CASE</p>
        <h1>{title}</h1>

        <p className="detail-description">
          {description ??
            "Detailed write-up is coming soon. The product record is already live in your API."}
        </p>

        <div className="detail-meta-grid">
          <div>
            <p>Category</p>
            <strong>{categoryName}</strong>
          </div>
          <div>
            <p>Slug</p>
            <strong>{slug}</strong>
          </div>
          <div>
            <p>Budget</p>
            <strong>{budget}</strong>
          </div>
          <div>
            <p>Stock</p>
            <strong>{stock}</strong>
          </div>
        </div>

        {fallbackProject ? (
          <>
            <h2>Tech Highlights</h2>
            <ul className="project-bullets">
              {fallbackProject.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
    </main>
  );
}