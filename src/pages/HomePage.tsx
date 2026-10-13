import { Link } from "react-router-dom";
import { featuredProjects, projects } from "../data/projects";
import { Picture } from "../components/Media";
import ProjectCard from "../components/ProjectCard";
import ContactCTA from "../components/ContactCTA";

export default function HomePage() {
  const deinosavros = featuredProjects[0];
  const ink = featuredProjects[3];
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Unity / Unreal Engine
          </p>
          <h1>
            Game Programmer
            <br />
            <span>
              & Technical <br />
              Artist.
            </span>
          </h1>
          <p className="hero-intro">
            I build gameplay systems, expressive effects and tools that give
            artists room to create.
          </p>
          <div className="hero-actions">
            <a href="#selected-work" className="button button-primary">
              Explore selected work <span aria-hidden="true">↓</span>
            </a>
            <Link className="text-link" to="/about">
              A little about me ↗
            </Link>
          </div>
          <div className="hero-footnote">
            <span>Hongtao Gao</span>
            <span>Code meets craft.</span>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="A preview of interface programming and real-time effects"
        >
          <Link
            to="/projects/deinosavros"
            className="hero-panel hero-panel-system"
          >
            <div className="panel-label">
              <span>01 / Systems</span>
              <span>Deinosavros ↗</span>
            </div>
            <Picture
              asset={deinosavros.cover}
              eager
              sizes="(max-width: 700px) 90vw, 500px"
            />
          </Link>
          <Link to="/projects/ink-vfx" className="hero-panel hero-panel-effect">
            <div className="panel-label">
              <span>02 / Expression</span>
              <span>Ink VFX ↗</span>
            </div>
            <Picture
              asset={ink.cover}
              eager
              sizes="(max-width: 700px) 90vw, 450px"
            />
          </Link>
          <div className="hero-coordinate" aria-hidden="true">
            INPUT → SYSTEM → RESPONSE
          </div>
        </div>
      </section>
      <section
        className="work-section container"
        id="selected-work"
        aria-labelledby="selected-heading"
      >
        <div className="section-top">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="selected-heading">
              Under the hood.
              <br />
              <span>On the screen.</span>
            </h2>
          </div>
          <p className="section-intro">
            Four projects at the intersection of playable systems and real-time
            art. What I built, how it works, and what I learned.
          </p>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section
        className="supporting-section container"
        aria-labelledby="supporting-heading"
      >
        <div className="section-top section-top-small">
          <div>
            <p className="eyebrow">02 / More to explore</p>
            <h2 id="supporting-heading">A different kind of challenge.</h2>
          </div>
          <Link className="text-link" to="/projects">
            All work & studies ↗
          </Link>
        </div>
        <div className="project-grid">
          {projects
            .filter((project) => project.tier === "supporting")
            .map((project) => (
              <ProjectCard compact key={project.slug} project={project} />
            ))}
        </div>
      </section>
      <section
        className="about-strip container"
        aria-labelledby="about-heading"
      >
        <div>
          <p className="eyebrow">03 / How I work</p>
          <h2 id="about-heading">
            One foot in code.
            <br />
            <span>One in visual craft.</span>
          </h2>
          <Link to="/about" className="text-link">
            More about my approach ↗
          </Link>
        </div>
        <div className="approach-list">
          <div>
            <span className="approach-number">01</span>
            <div>
              <h3>Make the state clear</h3>
              <p>
                Interfaces and gameplay feedback that help a player understand
                what changed, and why.
              </p>
            </div>
          </div>
          <div>
            <span className="approach-number">02</span>
            <div>
              <h3>Give the artist control</h3>
              <p>
                Effects and editor tools with useful parameters, repeatable
                results and room for iteration.
              </p>
            </div>
          </div>
          <div>
            <span className="approach-number">03</span>
            <div>
              <h3>Bring it together</h3>
              <p>
                Integrating code, art and audio into a complete interaction,
                especially in team projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
