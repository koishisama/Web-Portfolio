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
        description="Contribution cards are driven from the shared project registry so the case-study layout stays reusable."
      />

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Systems and Notes"
            title="Expandable narrative blocks for technical detail, process, and outcomes"
            description="Each section below is already scaffolded for longer writeups, diagrams, breakdowns, or inserted media."
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
        description="These gallery panels are intentionally styled as placeholder media targets so real stills, GIFs, or render crops can replace them later."
      />

      <ContactCTA
        title={`The ${project.title} route is wired and ready for final media.`}
        description="Replace the placeholder frames with real screenshots, renders, or gameplay clips by updating the centralized project data and swapping in asset URLs."
      />
    </>
  );
}
