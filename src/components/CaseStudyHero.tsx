import type { ProjectRecord } from "../types/project";
import MediaPlaceholder from "./MediaPlaceholder";

type CaseStudyHeroProps = {
  project: ProjectRecord;
};

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="case-hero">
      <div className="page-shell case-hero__grid">
        <div className="case-hero__copy">
          <p className="eyebrow">{project.projectType}</p>
          <h1 className="display-title">{project.title}</h1>
          <p className="hero-statement">{project.subtitle}</p>
          <p className="lead">{project.summary}</p>

          <div className="tag-row" aria-label={`${project.title} roles`}>
            {project.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>

        <div className="case-hero__visual">
          <MediaPlaceholder asset={project.heroImage} />
        </div>
      </div>
    </section>
  );
}
