import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api";

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

  if (!project) {
    notFound();
  }

  return (
    <main className="detail-page">
      <article className="detail-card card">
        <Link href="/" className="back-link">
          Back to home
        </Link>

        <p className="eyebrow">PROJECT CASE</p>
        <h1>{project.title}</h1>

        <p className="detail-description">
          {project.description ??
            "Detailed write-up is coming soon. The product record is already live in your API."}
        </p>

        <div className="detail-meta-grid">
          <div>
            <p>Category</p>
            <strong>{project.category?.name ?? "General"}</strong>
          </div>
          <div>
            <p>Slug</p>
            <strong>{project.slug}</strong>
          </div>
          <div>
            <p>Budget</p>
            <strong>{formatPrice(project.priceCents, project.currency)}</strong>
          </div>
          <div>
            <p>Stock</p>
            <strong>{project.stock}</strong>
          </div>
        </div>
      </article>
    </main>
  );
}