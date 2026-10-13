import { Link } from "react-router-dom";
import type { ProjectRecord } from "../types/project";
import { Picture } from "./Media";
import MediaDialog from "./MediaDialog";

export default function FeaturedProject({
  project,
}: {
  project: ProjectRecord;
}) {
  const href = `/projects/${project.slug}`;
  const heading = `feature-${project.slug}`;
  if (project.slug === "deinosavros") {
    return (
      <section
        className="feature-stage container"
        aria-labelledby={heading}
        data-project={project.slug}
      >
        <Link
          className="stage-media"
          to={href}
          aria-label={`Explore ${project.title}`}
        >
          <Picture
            asset={project.cover}
            eager
            sizes="(max-width: 800px) 88vw, (max-width: 1600px) 91vw, 1460px"
          />
        </Link>
        <div className="stage-footer">
          <h2 id={heading}>
            <Link to={href}>{project.title}</Link>
          </h2>
          <p>
            Interfaces across the run.
            <br />
            Combat, route decisions, and what comes next.
          </p>
          <Link
            className="arrow-link"
            to={href}
            aria-label={`Read the ${project.title} case study`}
          >
            ↗
          </Link>
        </div>
        <div className="scene-row">
          <p>
            <span>My work</span> Menu, map &amp; combat UI
          </p>
          <Link to={`${href}#route-and-chance`}>
            Combat, route choices &amp; what comes next ↗
          </Link>
        </div>
      </section>
    );
  }
  if (project.slug === "procedural-city") {
    return (
      <section
        className="feature-city light-surface"
        aria-labelledby={heading}
        data-project={project.slug}
      >
        <div className="city-inner container">
          <Link
            className="city-image"
            to={href}
            aria-label={`Explore ${project.title}`}
          >
            <Picture
              asset={project.cover}
              sizes="(max-width: 800px) 88vw, (max-width: 1600px) 61vw, 950px"
            />
          </Link>
          <div className="feature-copy">
            <p className="feature-category">Editor tooling / Unreal Engine</p>
            <h2 id={heading}>
              <Link to={href}>
                Procedural
                <br />
                City
              </Link>
            </h2>
            <p>
              Generate a neighborhood. Keep the block that works. Rebuild around
              it.
            </p>
            <p className="contribution-line">
              <span>My work</span> Generation tools &amp; editing workflow
            </p>
            <Link className="text-link" to={href}>
              Generation, locking &amp; local rebuild ↗
            </Link>
          </div>
        </div>
      </section>
    );
  }
  if (project.slug === "rhythm-rider") {
    return (
      <section
        className="feature-rhythm container"
        aria-labelledby={heading}
        data-project={project.slug}
      >
        <Link
          className="rhythm-image"
          to={href}
          aria-label={`Explore ${project.title}`}
        >
          <Picture
            asset={project.cover}
            sizes="(max-width: 800px) 88vw, (max-width: 1600px) 61vw, 950px"
          />
        </Link>
        <div className="feature-copy">
          <p className="feature-category">Gameplay &amp; feedback / Unity</p>
          <h2 id={heading}>
            <Link to={href}>
              Rhythm
              <br />
              Rider
            </Link>
          </h2>
          <p>
            Beat-based obstacle layouts and feedback that makes timing visible.
          </p>
          <p className="contribution-line">
            <span>My work</span> Programming, Perfect &amp; combo effects
          </p>
          <Link className="text-link" to={href}>
            Inside the rhythm ↗
          </Link>
        </div>
      </section>
    );
  }
  if (project.slug === "ink-vfx") {
    return (
      <section
        className="feature-ink light-surface"
        aria-labelledby={heading}
        data-project={project.slug}
      >
        <div className="ink-heading container">
          <h2 id={heading}>
            <Link to={href}>Ink VFX</Link>
          </h2>
          <p>
            Melee, projectile, and area attacks.
            <br />
            One visual language. Three rhythms.
          </p>
        </div>
        <Link
          className="ink-image"
          to={href}
          aria-label={`Explore ${project.title}`}
        >
          <Picture asset={project.cover} sizes="100vw" />
        </Link>
        <div className="ink-footer container">
          <p className="contribution-line">
            <span>My work</span> Niagara, materials &amp; animation timing
          </p>
          <div className="ink-actions">
            {project.showcase ? (
              <MediaDialog
                asset={project.showcase}
                triggerLabel="View showcase"
              />
            ) : null}
            <Link className="text-link" to={href}>
              Explore the effects ↗
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      className="feature-fallback container"
      aria-labelledby={heading}
      data-project={project.slug}
    >
      <Link to={href}>
        <Picture asset={project.cover} />
        <h2 id={heading}>{project.title}</h2>
      </Link>
      <p>{project.summary}</p>
      <p className="contribution-line">
        <span>My work</span> {project.roles.join(" / ")}
      </p>
    </section>
  );
}
