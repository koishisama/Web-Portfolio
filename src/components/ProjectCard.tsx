import { Link } from "react-router-dom";
import { projectCategoryLabel } from "../data/projects";
import type { ProjectRecord } from "../types/project";
import MediaPlaceholder from "./MediaPlaceholder";

type ProjectCardProps = {
  project: ProjectRecord;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link className="project-card__link" to={`/projects/${project.slug}`}>
        <MediaPlaceholder asset={project.thumbnail} compact />
        <div className="project-card__body">
          <div className="project-card__meta">
            <span>{projectCategoryLabel[project.category]}</span>
            <span>{project.projectType}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.subtitle}</p>
          <div className="tag-row" aria-label={`${project.title} roles`}>
            {project.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
