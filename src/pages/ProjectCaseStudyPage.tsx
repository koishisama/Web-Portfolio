import { Link, useParams } from "react-router-dom";
import CaseStudyHero from "../components/CaseStudyHero";
import ContactCTA from "../components/ContactCTA";
import ContributionGrid from "../components/ContributionGrid";
import GalleryGrid from "../components/GalleryGrid";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ToolStack from "../components/ToolStack";
import { getProjectBySlug, projectCategoryLabel } from "../data/projects";
import NotFoundPage from "./NotFoundPage";

export default function ProjectCaseStudyPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      <CaseStudyHero project={project} />

      <Reveal className="page-section">
        <div className="page-shell case-detail-grid">
          <div>
            <SectionHeading
              eyebrow="Quick Facts"
              title={`${project.title} at a glance`}
              description={`Category: ${projectCategoryLabel[project.category]}`}
            />
            <div className="facts-grid">
              {project.facts.map((fact) => (
                <article key={fact.label} className="panel fact-card">
                  <p className="eyebrow">{fact.label}</p>
                  <h3>{fact.value}</h3>
                </article>
              ))}
            </div>
          </div>
          <aside className="panel sticky-panel">
            <p className="eyebrow">Tools</p>
            <ToolStack tools={project.tools} />
            <div className="body-copy compact-copy">
              <p>{project.reflection}</p>
            </div>
            <div className="button-row">
              <Link className="button button--ghost" to="/projects">
                Back to Projects
              </Link>
            </div>
          </aside>
        </div>
      </Reveal>

      <ContributionGrid
        contributions={project.contributions}
        description="Main contribution areas for the project."
      />

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Notes"
            title="Process and project details"
            description="Selected notes on implementation, art direction, and scene development."
          />
          <div className="stack-gap">
            {project.caseStudySections.map((section) => (
              <article key={section.title} className="panel narrative-panel">
                <h3>{section.title}</h3>
                <div className="body-copy">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="feature-list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <GalleryGrid
        gallery={project.gallery}
        captionMode={project.category === "vfx" ? "all" : "video"}
      />

      <ContactCTA
        title={`Interested in ${project.title}?`}
        description="Reach out by email or explore more work on GitHub."
      />
    </>
  );
}
