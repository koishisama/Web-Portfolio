import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ProjectRecord } from "../types/project";
import { Picture } from "./Media";

export default function ProjectCard({
  project,
  compact = false,
  eager = false,
  actions,
}: {
  project: ProjectRecord;
  compact?: boolean;
  eager?: boolean;
  actions?: ReactNode;
}) {
  return (
    <article
      className={`project-card${compact ? " compact-card" : ""}`}
      data-project={project.slug}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="project-link card-image"
        aria-label={`Explore ${project.title}`}
      >
        <Picture
          asset={project.cover}
          eager={eager}
          sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 800px) calc((100vw - 62px) / 2), (max-width: 1200px) calc((100vw - 96px) / 2), 544px"
        />
      </Link>
      <div className="card-body">
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <p className="contribution-line">
          <strong>{project.roles.join(" / ")}</strong>
          <span aria-hidden="true"> · </span>
          {project.tools[0]}
        </p>
        {actions ? <div className="card-actions">{actions}</div> : null}
      </div>
    </article>
  );
}
