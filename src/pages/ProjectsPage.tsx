import { useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectCard from "../components/ProjectCard";
import ProjectFilter from "../components/ProjectFilter";
import ContactCTA from "../components/ContactCTA";
import {
  featuredProject,
  projects,
  type ProjectFilterKey
} from "../data/projects";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilterKey>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const supportingProjects = filteredProjects.filter(
    (project) => project.slug !== featuredProject.slug
  );
  const showFeatured =
    filter === "all" || (filter === "game" && featuredProject.category === "game");

  return (
    <>
      <section className="page-section page-header">
        <div className="page-shell">
          <p className="eyebrow">Project Index</p>
          <h1 className="display-title">Projects</h1>
          <p className="lead">
            Browse the full scaffold by category, with Rhythm-Rider preserved as the main
            attention anchor.
          </p>
          <ProjectFilter activeFilter={filter} onChange={setFilter} />
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Project Layout"
            title="An editorial grid with one dominant flagship tile"
            description="The list is filtered from one typed project registry so cards and case-study routes stay synchronized."
          />
          <div className="stack-gap">
            {showFeatured ? <FeaturedProjectCard project={featuredProject} /> : null}
            <div className="project-grid">
              {supportingProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <ContactCTA
        title="Each project card already resolves to a real route."
        description="When final screenshots, videos, and external links are ready, they can be dropped into the shared project data without rewriting the page architecture."
      />
    </>
  );
}
