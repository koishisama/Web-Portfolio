import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "../data/projects";
import { tracks } from "../data/site";
import Media from "../components/Media";
import MediaComparison from "../components/MediaComparison";
import Diagram from "../components/Diagram";
import ProjectCard from "../components/ProjectCard";
import NotFoundPage from "./NotFoundPage";

const chapters = [
  { id: "context", name: "Role & context" },
  { id: "contribution", name: "What I built" },
  { id: "breakdown", name: "Technical breakdown" },
  { id: "results", name: "Results & lessons" },
  { id: "credits", name: "Credits & links" },
];
export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <NotFoundPage />;
  const related = projects
    .filter((p) => p.slug !== project.slug && p.tier === "featured")
    .sort(
      (a, b) =>
        Number(b.tracks.some((t) => project.tracks.includes(t))) -
        Number(a.tracks.some((t) => project.tracks.includes(t))),
    )
    .slice(0, 2);
  return (
    <article className="case-page container">
      <header className="case-header">
        <Link to="/projects" className="back-link">
          ← All work
        </Link>
        <div className="case-header-meta">
          <p className="eyebrow">
            {project.tracks.map((t) => tracks[t]).join(" / ")}
          </p>
          <span className="project-status">{project.projectType}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-subtitle">{project.subtitle}</p>
        <div className="case-facts">
          <div>
            <span>My role</span>
            <strong>{project.roles.join(" / ")}</strong>
          </div>
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </header>
      <div className="case-lead-media">
        <Media key={project.slug} asset={project.demo ?? project.cover} eager />
      </div>
      <div className="case-layout">
        <aside className="case-sidebar">
          <p className="eyebrow">In this case</p>
          <nav aria-label="Case study chapters">
            {chapters.map((chapter, i) => (
              <a key={chapter.id} href={`#${chapter.id}`}>
                <span>0{i + 1}</span>
                {chapter.name}
              </a>
            ))}
          </nav>
          <div className="tool-list">
            {project.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </aside>
        <div className="case-content">
          <section id="context" className="case-section">
            <p className="eyebrow">01 / Role & context</p>
            <h2>
              {project.tier === "study" ? "A focused study." : "The challenge."}
            </h2>
            <p className="lead-paragraph">{project.context}</p>
            <div className="scope-note">
              <span>My contribution</span>
              <p>{project.scope}</p>
            </div>
          </section>
          <section id="contribution" className="case-section">
            <p className="eyebrow">02 / What I built</p>
            <h2>My part of the project.</h2>
            <ul className="contribution-list">
              {project.contributions.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↗</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section id="breakdown" className="case-section">
            <p className="eyebrow">03 / Technical breakdown</p>
            <h2>From intention to implementation.</h2>
            {project.flow.length ? <Diagram project={project} /> : null}
            {project.breakdown.map((chapter, i) => (
              <div className="breakdown-chapter" key={chapter.title}>
                <div className="chapter-title">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{chapter.title}</h3>
                </div>
                <div className="chapter-copy">
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {chapter.media ? (
                  <Media key={chapter.media.src} asset={chapter.media} />
                ) : null}
                {chapter.comparison?.length ? (
                  <MediaComparison variants={chapter.comparison} />
                ) : null}
              </div>
            ))}
          </section>
          <section id="results" className="case-section">
            <p className="eyebrow">04 / Results & lessons</p>
            <h2>What I take forward.</h2>
            {project.result.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="version-note">{project.version}</p>
          </section>
          <section id="credits" className="case-section">
            <p className="eyebrow">05 / Credits & links</p>
            <h2>Made in context.</h2>
            <ul className="credits-list">
              {project.credits.map((credit) => (
                <li key={credit.name}>
                  <strong>
                    {credit.href ? (
                      <a href={credit.href} target="_blank" rel="noreferrer">
                        {credit.name} ↗
                      </a>
                    ) : (
                      credit.name
                    )}
                  </strong>
                  <p>{credit.detail}</p>
                </li>
              ))}
            </ul>
            {project.links.length ? (
              <div className="project-actions">
                {project.links.map((link) => (
                  <a
                    className="button button-primary"
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </div>
      <section className="related-work">
        <div className="section-top section-top-small">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2>A different perspective.</h2>
          </div>
          <Link className="text-link" to="/projects">
            All work ↗
          </Link>
        </div>
        <div className="project-grid">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} compact />
          ))}
        </div>
      </section>
    </article>
  );
}
