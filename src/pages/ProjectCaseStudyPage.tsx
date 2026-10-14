import { Link, useLocation, useParams } from "react-router-dom";
import { getProjectBySlug, projects } from "../data/projects";
import Media from "../components/Media";
import MediaComparison from "../components/MediaComparison";
import ShowcaseGallery from "../components/ShowcaseGallery";
import Diagram from "../components/Diagram";
import ProjectCard from "../components/ProjectCard";
import NotFoundPage from "./NotFoundPage";
import Icon, { type IconName } from "../components/Icon";

const chapters: { id: string; name: string; icon: IconName }[] = [
  { id: "context", name: "Role & context", icon: "info" },
  { id: "contribution", name: "What I built", icon: "code" },
  { id: "breakdown", name: "Technical breakdown", icon: "layers" },
  { id: "results", name: "Results & lessons", icon: "trophy" },
  { id: "credits", name: "Credits & links", icon: "link" },
];

export default function ProjectCaseStudyPage() {
  const { slug } = useParams();
  const { hash } = useLocation();
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
        <Link
          to="/projects"
          className="back-link icon-button"
          aria-label="← All work"
          title="All work"
        >
          <Icon name="arrow-left" />
        </Link>
        <h1>{project.title}</h1>
        <p className="case-role">
          {project.roles.join(" / ")} · {project.tools[0]}
        </p>
      </header>
      <div className="case-lead-media container" id="showcase">
        {project.showcase ? (
          <ShowcaseGallery key={project.slug} project={project} />
        ) : (
          <Media
            asset={project.cover}
            eager
            sizes="(max-width: 800px) calc(100vw - 40px), 1120px"
          />
        )}
      </div>
      {project.slug === "one-more-second" ? (
        <section
          className="available-excerpts container"
          aria-labelledby="excerpts-heading"
        >
          <h2 id="excerpts-heading">Available excerpts</h2>
          <p>
            The current footage shows the opening and a controlled tool
            response. A complete rescue, scene progression and the final
            dialogue are not shown.
          </p>
          <ShowcaseGallery key={project.slug} project={project} />
        </section>
      ) : null}
      <div className="case-body container">
        <nav className="case-chapters" aria-label="Case study chapters">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="icon-button"
              aria-label={chapter.name}
              title={chapter.name}
              aria-current={hash === `#${chapter.id}` ? "location" : undefined}
            >
              <Icon name={chapter.icon} />
            </a>
          ))}
        </nav>
        <div className="case-context-grid">
          <section id="context">
            <h2>Role &amp; context</h2>
            <p>{project.scope}</p>
            <details className="chapter-notes">
              <summary aria-label="Project context" title="Project context">
                <Icon name="info" />
                <Icon name="chevron-down" />
              </summary>
              <p>{project.context}</p>
            </details>
            <p className="context-facts">
              {[
                project.projectType,
                ...project.facts
                  .filter(
                    (fact) => fact.label !== "Engine" && fact.label !== "Focus",
                  )
                  .map((fact) => `${fact.label}: ${fact.value}`),
              ].join(" · ")}
            </p>
          </section>
          <section id="contribution">
            <h2>What I built</h2>
            <ul className="contribution-list">
              {project.contributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="tool-list">{project.tools.join(" · ")}</p>
          </section>
        </div>
        <section id="breakdown" className="case-breakdown">
          <h2>Technical breakdown</h2>
          {project.flow.length ? <Diagram project={project} /> : null}
          {project.breakdown.map((chapter) => (
            <section
              className={`breakdown-module breakdown-${chapter.layout ?? "stack"}`}
              key={chapter.id}
              id={chapter.id}
            >
              <div className="chapter-copy">
                <h3>{chapter.title}</h3>
                <details className="chapter-notes">
                  <summary
                    aria-label={`Implementation notes: ${chapter.title}`}
                    title="Implementation notes"
                  >
                    <Icon name="code" />
                    <Icon name="chevron-down" />
                  </summary>
                  {chapter.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </details>
              </div>
              {chapter.media || chapter.comparison?.length ? (
                <div className="chapter-media">
                  {chapter.media && !chapter.comparison?.length ? (
                    <Media
                      key={chapter.media.src}
                      asset={chapter.media}
                      sizes={
                        chapter.layout === "split"
                          ? "(max-width: 800px) calc(100vw - 40px), (max-width: 944px) calc(100vw - 64px), 880px"
                          : "(max-width: 1200px) calc(100vw - 64px), 1120px"
                      }
                    />
                  ) : null}
                  {chapter.comparison?.length ? (
                    <MediaComparison
                      initialAsset={chapter.media}
                      variants={chapter.comparison}
                      sizes={
                        chapter.layout === "split"
                          ? "(max-width: 800px) calc(100vw - 40px), (max-width: 944px) calc(100vw - 64px), 880px"
                          : "(max-width: 1200px) calc(100vw - 64px), 1120px"
                      }
                    />
                  ) : null}
                </div>
              ) : null}
            </section>
          ))}
        </section>
        <section id="results" className="case-results">
          <h2>Results &amp; lessons</h2>
          {project.result.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <details className="recording-notes">
            <summary>Version &amp; recording notes</summary>
            <p>{project.version}</p>
          </details>
        </section>
        <section id="credits" className="case-credits">
          <h2>Credits &amp; links</h2>
          <ul className="credits-list">
            {project.credits.map((credit) => (
              <li key={credit.name}>
                <h3>
                  {credit.href ? (
                    <a href={credit.href} target="_blank" rel="noreferrer">
                      {credit.name}
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
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </section>
        <section className="related-work" aria-labelledby="related-heading">
          <div className="section-top">
            <h2 id="related-heading">More work</h2>
            <Link className="text-link" to="/projects">
              All work
            </Link>
          </div>
          <div className="project-grid">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} compact />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
