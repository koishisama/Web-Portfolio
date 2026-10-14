import { Link } from "react-router-dom";
import type { ProjectRecord } from "../types/project";
import { Picture } from "./Media";
import MediaDialog from "./MediaDialog";
import Icon from "./Icon";

export default function ProjectCard({
  project,
  compact = false,
  eager = false,
}: {
  project: ProjectRecord;
  compact?: boolean;
  eager?: boolean;
}) {
  return (
    <article
      className={`project-card${compact ? " compact-card" : ""}`}
      data-project={project.slug}
    >
      <div className="card-image">
        {project.showcase ? (
          <MediaDialog
            asset={project.showcase}
            preview={project.cover}
            eager={eager}
            triggerLabel={`Play ${project.title} showcase`}
          />
        ) : (
          <Link
            to={`/projects/${project.slug}`}
            className="project-link"
            aria-label={`Explore ${project.title}`}
          >
            <Picture
              asset={project.cover}
              eager={eager}
              sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 1200px) 45vw, 544px"
            />
            <span className="cover-open">
              <Icon name="arrow-up-right" />
            </span>
          </Link>
        )}
      </div>
      <div className="card-body">
        <div>
          <h3>
            <Link to={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="contribution-line">
            <strong>{project.roles.join(" / ")}</strong>
            <span aria-hidden="true"> · </span>
            {project.tools[0]}
          </p>
        </div>
        <div className="card-actions">
          {project.slug === "deinosavros" ? (
            <Link
              to="/projects/deinosavros#route-and-chance"
              className="icon-button"
              aria-label="Map & Chance"
              title="Map & Chance"
            >
              <Icon name="route" />
            </Link>
          ) : null}
          <Link
            to={`/projects/${project.slug}`}
            className="icon-button case-entry"
            aria-label={`Open ${project.title} case`}
            title={`Open ${project.title} case`}
          >
            <Icon name="arrow-up-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
