import Link from "next/link";

export default function NotFound() {
  return (
    <main className="detail-page">
      <article className="detail-card card">
        <p className="eyebrow">404</p>
        <h1>Case not found</h1>
        <p className="detail-description">
          This project is missing or inactive. Go back to the homepage and open another case.
        </p>
        <Link href="/" className="button button-primary">
          Back to home
        </Link>
      </article>
    </main>
  );
}