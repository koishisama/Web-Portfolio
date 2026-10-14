import { Link } from "react-router-dom";
import { featuredProjects, projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectFilter, { useProjectTrack } from "../components/ProjectFilter";
import ContactCTA from "../components/ContactCTA";

export default function HomePage() {
  const { selected, select } = useProjectTrack();
  const matches = (project: (typeof projects)[number]) =>
    selected === "all" || project.tracks.includes(selected);
  const featured = featuredProjects.filter(matches);
  const supporting = projects
    .filter((project) => project.tier === "supporting" && matches(project))
    .sort((a, b) => a.rank - b.rank);
  return (
    <div className="home-page">
      <section className="home-intro container" aria-labelledby="home-title">
        <h1 id="home-title">Hi, I’m Hongtao.</h1>
        <p className="home-role">Game Programmer &amp; Technical Artist</p>
        <p className="home-hello">Unity · Unreal Engine</p>
      </section>
      <section
        className="home-work container"
        id="selected-work"
        aria-labelledby="work-title"
      >
        <div className="work-heading">
          <h2 id="work-title">Selected work</h2>
          <ProjectFilter
            selected={selected}
            onSelect={select}
            count={featured.length + supporting.length}
            allLabel="All"
          />
        </div>
        <div className="project-grid">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              eager={project.rank === 1}
            />
          ))}
        </div>
      </section>
      {supporting.length ? (
        <section
          className="supporting-work container"
          aria-labelledby="supporting-heading"
        >
          <div className="section-top">
            <h2 id="supporting-heading">More projects</h2>
            <Link className="text-link" to="/projects">
              All work &amp; studies
            </Link>
          </div>
          <div className="project-grid supporting-grid">
            {supporting.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </section>
      ) : null}
      <section className="home-about container" aria-labelledby="about-heading">
        <div>
          <h2 id="about-heading">Programming and technical art, together.</h2>
        </div>
        <Link className="text-link" to="/about">
          A little more about me
        </Link>
      </section>
      <ContactCTA />
    </div>
  );
}
