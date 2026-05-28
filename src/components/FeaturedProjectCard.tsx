import { Link } from "react-router-dom";
import type { ProjectRecord } from "../types/project";
import MediaPlaceholder from "./MediaPlaceholder";

type FeaturedProjectCardProps = {
  project: ProjectRecord;
};

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <article className="featured-project">
      <div className="featured-project__visual">
        <MediaPlaceholder asset={project.heroImage} />
      </div>
      <div className="featured-project__body">
        <p className="eyebrow">Featured Case Study</p>
        <h3>{project.title}</h3>
        <p className="lead-small">{project.summary}</p>
        <ul className="feature-list">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="tag-row" aria-label={`${project.title} tools`}>
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <div className="button-row">
          <Link className="button button--primary" to={`/projects/${project.slug}`}>
            Read Case Study
          </Link>
          <Link className="button button--ghost" to="/projects">
            Browse All Work
          </Link>
        </div>
      </div>
    </article>
  );
}
