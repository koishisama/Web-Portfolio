import { Link } from "react-router-dom";
import { featuredProjects, projects } from "../data/projects";
import { Picture } from "../components/Media";
import FeaturedProject from "../components/FeaturedProject";
import ContactCTA from "../components/ContactCTA";

export default function HomePage() {
  const supporting = projects.filter(
    (project) => project.tier === "supporting",
  );
  return (
    <>
      <section className="home-intro container" aria-labelledby="home-title">
        <h1 id="home-title">Hongtao Gao.</h1>
        <div className="home-intro-copy">
          <p>
            Game Programmer
            <br />
            &amp; Technical Artist
          </p>
          <p className="small">
            Gameplay, real-time effects, and the tools behind them.
            <br />
            Selected work in Unity and Unreal Engine.
          </p>
        </div>
      </section>
      <div id="selected-work" className="featured-work">
        {featuredProjects.map((project, index) => (
          <div key={project.slug}>
            {index === 1 ? (
              <div className="work-transition container">
                <p>
                  Systems you can see.
                  <br />
                  Worlds you can shape.
                </p>
                <Link className="text-link" to="/projects">
                  All work &amp; studies ↗
                </Link>
              </div>
            ) : null}
            <FeaturedProject project={project} />
          </div>
        ))}
      </div>
      {supporting.length ? (
        <section
          className="supporting-work container"
          aria-labelledby="supporting-heading"
        >
          <div className="section-top">
            <h2 id="supporting-heading">More ways to make a world.</h2>
            <Link className="text-link" to="/projects">
              Explore all projects ↗
            </Link>
          </div>
          <div className="supporting-pair">
            {supporting.map((project) => (
              <article key={project.slug} data-project={project.slug}>
                <Link
                  className="supporting-image"
                  to={`/projects/${project.slug}`}
                  aria-label={`Explore ${project.title}`}
                >
                  <Picture
                    asset={project.cover}
                    sizes="(max-width: 800px) 88vw, (max-width: 1600px) 47vw, 760px"
                  />
                </Link>
                <h3>
                  <Link to={`/projects/${project.slug}`}>
                    {project.title} ↗
                  </Link>
                </h3>
                <p>{project.summary}</p>
                <p className="contribution-line">
                  <span>My work</span> {project.roles.join(" / ")}
                </p>
                <Link
                  className="supporting-entry text-link"
                  to={`/projects/${project.slug}`}
                >
                  Read the case ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="home-about container" aria-labelledby="about-heading">
        <h2 id="about-heading">
          Between how it works
          <br />
          and how it feels.
        </h2>
        <div>
          <p>
            I work across gameplay programming and real-time art. My projects
            connect readable interfaces, expressive effects and tools that leave
            room for iteration.
          </p>
          <Link className="text-link" to="/about">
            A little about my approach ↗
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
