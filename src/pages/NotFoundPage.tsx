import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>
        The link may have changed. You can find the current projects in Work.
      </p>
      <Link className="text-link" to="/projects">
        Return to the work index
      </Link>
    </section>
  );
}
