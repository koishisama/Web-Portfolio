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
          <p className="lead">Browse the work by category.</p>
          <ProjectFilter activeFilter={filter} onChange={setFilter} />
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="All Projects"
            title="Game, VFX, and environment work"
            description="Filter the work by category and open each project for more detail."
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
        title="Open the contact page for links and details."
        description="Use it for email, GitHub, LinkedIn, and resume updates."
      />
    </>
  );
}
