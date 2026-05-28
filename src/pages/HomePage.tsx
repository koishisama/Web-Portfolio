import Reveal from "../components/Reveal";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectCard from "../components/ProjectCard";
import ToolStack from "../components/ToolStack";
import ContactCTA from "../components/ContactCTA";
import { featuredProject, getProjectsByCategory, projects } from "../data/projects";
import { siteMeta } from "../data/site";
import type { ProjectCategory } from "../types/project";

const categoryOrder: ProjectCategory[] = ["game", "vfx", "environment"];

export default function HomePage() {
  const gameProjects = getProjectsByCategory("game");
  const vfxProjects = getProjectsByCategory("vfx");
  const environmentProjects = getProjectsByCategory("environment");
  const supportingProjects = projects.filter((project) => project.slug !== featuredProject.slug);
  const categoryCounts: Record<ProjectCategory, number> = {
    game: gameProjects.length,
    vfx: vfxProjects.length,
    environment: environmentProjects.length
  };

  return (
    <>
      <HeroSection />

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Project Groups"
            title="Games, VFX studies, and environment work"
            description="The work is grouped into playable projects, short VFX studies, and environment scenes."
          />
          <div className="category-grid">
            {categoryOrder.map((category) => (
              <article key={category} className="panel category-card">
                <p className="eyebrow">{siteMeta.categoryCopy[category].title}</p>
                <h3>{categoryCounts[category]} projects</h3>
                <p>{siteMeta.categoryCopy[category].description}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects across gameplay, VFX, interactive scenes, and environments"
            description="A mix of game work, standalone effects, and scene-based studies."
          />
          <div className="stack-gap">
            <FeaturedProjectCard project={featuredProject} />
            <div className="project-grid">
              {supportingProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell about-band">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Programming, VFX, and environment work"
              description={siteMeta.aboutIntro}
            />
            <div className="body-copy">
              {siteMeta.aboutDetails.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="panel tools-panel">
            <p className="eyebrow">Tools</p>
            <ToolStack tools={siteMeta.tools} />
          </div>
        </div>
      </Reveal>

      <ContactCTA />
    </>
  );
}
