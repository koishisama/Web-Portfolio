import { Link } from "react-router-dom";
import { featuredProjects, projects } from "../data/projects";
import { site, skillGroups } from "../data/site";
import ProjectCard from "../components/ProjectCard";
import ProjectFilter, { useProjectTrack } from "../components/ProjectFilter";
import ContactCTA from "../components/ContactCTA";
import HeroReel from "../components/HeroReel";
import Icon, { type IconName } from "../components/Icon";

export default function HomePage() {
  const { selected, select } = useProjectTrack();
  const matches = (project: (typeof projects)[number]) =>
    selected === "all" || project.tracks.includes(selected);
  const featured = featuredProjects.filter(matches);
  const supporting = projects
    .filter((project) => project.tier === "supporting" && matches(project))
    .sort((a, b) => a.rank - b.rank);
  const stats = [
    { value: projects.length, label: "Projects & studies" },
    { value: 2, label: "Engines · Unity & Unreal" },
    {
      value: projects.filter((project) => project.projectType === "Team project" || project.projectType === "Game jam").length,
      label: "Team productions",
    },
  ];
  return (
    <div className="home-page">
      <section className="home-intro container" aria-labelledby="home-title">
        <div className="home-intro-main">
          <h1 id="home-title">Hi, I’m Hongtao.</h1>
          <p className="home-role">Game Programmer &amp; Technical Artist</p>
          <p className="home-tagline">{site.tagline}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#selected-work">
              View work <Icon name="arrow-right" />
            </a>
            {site.resume ? (
              <a className="button button-ghost" href={site.resume} download>
                <Icon name="download" /> Download CV
              </a>
            ) : null}
          </div>
        </div>
        <HeroReel />
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
        <div className="home-about-intro">
          <h2 id="about-heading">Programming and technical art, together.</h2>
          <dl className="stat-row">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <Link className="text-link" to="/about">
            A little more about me
          </Link>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>
                <Icon name={group.icon as IconName} /> {group.title}
              </h3>
              <ul className="tag-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}
