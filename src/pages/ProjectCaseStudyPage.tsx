import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "../data/projects";
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
    .filter((item) => item.slug !== project.slug && item.tier === "featured")
    .sort(
      (a, b) =>
        Number(b.tracks.some((track) => project.tracks.includes(track))) -
        Number(a.tracks.some((track) => project.tracks.includes(track))),
    )
    .slice(0, 2);
  return (
    <article
      className={`case-page case-${project.slug}`}
      data-project={project.slug}
    >
      <header className="case-header container">
        <Link to="/projects" className="back-link">
          ← All work
        </Link>
        <div className="case-title-row">
          <h1>{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
        </div>
      </header>
      <div className="case-lead-media container" id="showcase">
        <Media
          key={project.slug}
          asset={project.showcase ?? project.cover}
          eager
          sizes="(max-width: 800px) 88vw, (max-width: 1600px) 91vw, 1460px"
        />
      </div>
      <div className="case-introduction container">
        <div className="case-facts" aria-label="Project context">
          <div>
            <span>My contribution</span>
            <strong>{project.roles.join(" / ")}</strong>
          </div>
          <div>
            <span>Project</span>
            <strong>{project.projectType}</strong>
          </div>
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
        <nav className="case-chapters" aria-label="Case study chapters">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}>
              {chapter.name}
            </a>
          ))}
        </nav>
      </div>
      <section id="context" className="case-essay container">
        <div>
          <p className="eyebrow">Role &amp; context</p>
          <h2>
            {project.tier === "study"
              ? "A focused exploration."
              : "The work, in context."}
          </h2>
          <ul className="tool-list" aria-label="Tools used">
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
        <div className="case-prose">
          <p className="lead-paragraph">{project.context}</p>
          <div className="scope-note">
            <h3>My contribution</h3>
            <p>{project.scope}</p>
          </div>
        </div>
      </section>
      <section id="contribution" className="case-contributions container">
        <h2>What I built.</h2>
        <ul className="contribution-list">
          {project.contributions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section id="breakdown" className="case-breakdown">
        <header className="breakdown-heading container">
          <p className="eyebrow">Technical breakdown</p>
          <h2>Inside the decisions.</h2>
        </header>
        {project.flow.length ? (
          <div className="container">
            <Diagram project={project} />
          </div>
        ) : null}
        {project.breakdown.map((chapter) => (
          <section
            className={`breakdown-module breakdown-${chapter.layout ?? "stack"}${chapter.layout === "split" ? " light-surface" : ""}`}
            key={chapter.id}
            id={chapter.id}
          >
            <div className="breakdown-inner container">
              <div className="chapter-copy">
                <h3>{chapter.title}</h3>
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {chapter.media || chapter.comparison?.length ? (
                <div className="chapter-media">
                  {chapter.media ? (
                    <Media
                      key={chapter.media.src}
                      asset={chapter.media}
                      sizes={
                        chapter.layout === "split"
                          ? "(max-width: 800px) 88vw, 60vw"
                          : "(max-width: 1600px) 91vw, 1460px"
                      }
                    />
                  ) : null}
                  {chapter.comparison?.length ? (
                    <MediaComparison
                      variants={chapter.comparison}
                      sizes={
                        chapter.layout === "split"
                          ? "(max-width: 800px) 88vw, 60vw"
                          : "(max-width: 1600px) 91vw, 1460px"
                      }
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </section>
      <section id="results" className="case-essay container">
        <div>
          <p className="eyebrow">Results &amp; lessons</p>
          <h2>What I take forward.</h2>
        </div>
        <div className="case-prose">
          {project.result.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="version-note">{project.version}</p>
        </div>
      </section>
      <section id="credits" className="case-credits container">
        <div>
          <p className="eyebrow">Credits &amp; links</p>
          <h2>Made in context.</h2>
        </div>
        <div>
          <ul className="credits-list">
            {project.credits.map((credit) => (
              <li key={credit.name}>
                <h3>
                  {credit.href ? (
                    <a href={credit.href} target="_blank" rel="noreferrer">
                      {credit.name} ↗
                    </a>
                  ) : (
                    credit.name
                  )}
                </h3>
                <p>{credit.detail}</p>
              </li>
            ))}
          </ul>
          {project.links.length ? (
            <div className="project-actions">
              {project.links.map((link) => (
                <a
                  className="text-link"
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
        </div>
      </section>
      <section
        className="related-work container"
        aria-labelledby="related-heading"
      >
        <div className="section-top">
          <h2 id="related-heading">Keep exploring.</h2>
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
