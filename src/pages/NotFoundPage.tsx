import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-section page-header not-found">
      <div className="page-shell">
        <p className="eyebrow">404</p>
        <h1 className="display-title">Page not found</h1>
        <p className="lead">
          The requested route is not available in the current portfolio scaffold.
        </p>
        <div className="button-row">
          <Link className="button button--primary" to="/">
            Return Home
          </Link>
          <Link className="button button--ghost" to="/projects">
            Browse Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
