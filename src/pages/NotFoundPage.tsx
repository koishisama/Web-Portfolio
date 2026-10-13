import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 / Unmapped territory</p>
      <h1>
        This page
        <br />
        <span>isn't in the build.</span>
      </h1>
      <p>
        The link may have changed. You can find the current projects in Work.
      </p>
      <Link className="button button-primary" to="/projects">
        Explore the work ↗
      </Link>
    </div>
  );
}
