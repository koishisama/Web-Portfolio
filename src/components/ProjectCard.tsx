import { Link } from "react-router-dom";
import { tracks } from "../data/site";
import type { ProjectRecord } from "../types/project";
import { Picture } from "./Media";

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: ProjectRecord;
  compact?: boolean;
}) {
  return (
    <article
      className={`project-card ${compact ? "compact-card" : ""}`}
      data-project={project.slug}
    >
      <Link to={`/projects/${project.slug}`} className="project-link">
        <div className="card-image">
          <Picture
            asset={project.cover}
            sizes="(max-width: 700px) 88vw, (max-width: 1600px) 44vw, 710px"
          />
          <span className="card-open" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="card-body">
          <div className="card-meta">
            <span>{project.tools[0]}</span>
            <span>
              {project.tracks.map((track) => tracks[track]).join(" / ")}
            </span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <div className="card-bottom">
            <span>My work: {project.roles.join(" / ")}</span>
            <span className="card-read">
              View case <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
