import Reveal from "../components/Reveal";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectCard from "../components/ProjectCard";
import ToolStack from "../components/ToolStack";
import ContactCTA from "../components/ContactCTA";
import { featuredProject, getProjectsByCategory, projects } from "../data/projects";
import { siteMeta } from "../data/site";

export default function HomePage() {
  const gameProjects = getProjectsByCategory("game");
  const environmentProjects = getProjectsByCategory("environment");
  const supportingProjects = projects.filter((project) => project.slug !== featuredProject.slug);

  return (
    <>
      <HeroSection />

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Portfolio Structure"
            title="Two project lanes built around one strong flagship case study"
            description="The homepage leads with Rhythm-Rider, then divides the rest of the work into playable projects and environment-focused scenes."
          />
          <div className="category-grid">
            <article className="panel category-card">
              <p className="eyebrow">{siteMeta.categoryCopy.game.title}</p>
              <h3>{gameProjects.length} projects</h3>
              <p>{siteMeta.categoryCopy.game.description}</p>
            </article>
            <article className="panel category-card">
              <p className="eyebrow">{siteMeta.categoryCopy.environment.title}</p>
              <h3>{environmentProjects.length} projects</h3>
              <p>{siteMeta.categoryCopy.environment.description}</p>
            </article>
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Featured Work"
            title="A recruiter-facing hierarchy that starts with the strongest hybrid project"
            description="Rhythm-Rider anchors the site, while the remaining projects support range across environment and interaction work."
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
              eyebrow="About This Portfolio"
              title="A scaffold built for gameplay, VFX, and environment storytelling"
              description={siteMeta.aboutIntro}
            />
            <div className="body-copy">
              {siteMeta.aboutDetails.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="panel tools-panel">
            <p className="eyebrow">Tools and Skills</p>
            <ToolStack tools={siteMeta.tools} />
          </div>
        </div>
      </Reveal>

      <ContactCTA />
    </>
  );
}
