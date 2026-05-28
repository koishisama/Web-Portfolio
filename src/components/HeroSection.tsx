import { Link } from "react-router-dom";
import { featuredProject } from "../data/projects";
import { siteMeta } from "../data/site";
import MediaPlaceholder from "./MediaPlaceholder";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Game Portfolio</p>
          <h1 className="display-title">{siteMeta.roleLabel}</h1>
          <p className="hero-statement">{siteMeta.heroStatement}</p>
          <p className="lead">{siteMeta.heroSummary}</p>

          <div className="hero-actions">
            <Link className="button button--primary" to="/projects">
              View Projects
            </Link>
            <Link className="button button--ghost" to={`/projects/${featuredProject.slug}`}>
              Open Rhythm-Rider
            </Link>
          </div>

          <ul className="hero-pills" aria-label="Primary disciplines">
            {featuredProject.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <MediaPlaceholder asset={featuredProject.heroImage} />
        </div>
      </div>
    </section>
  );
}
