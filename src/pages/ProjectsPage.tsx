import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectFilter, { useProjectTrack } from "../components/ProjectFilter";

export default function ProjectsPage() {
  const { selected, select } = useProjectTrack();
  const visible = projects.filter(
    (project) => selected === "all" || project.tracks.includes(selected),
  );
  return (
    <div className="container work-page">
      <header className="page-header">
        <h1>Work</h1>
        <p>
          Games, real-time effects and tools made with Unity and Unreal Engine.
        </p>
      </header>
      <ProjectFilter
        selected={selected}
        onSelect={select}
        count={visible.length}
      />
      {[
        { tier: "featured", title: "Selected projects" },
        { tier: "supporting", title: "More projects" },
        { tier: "study", title: "Studies" },
      ].map((section) => {
        const items = visible
          .filter((project) => project.tier === section.tier)
          .sort((a, b) => a.rank - b.rank);
        return items.length ? (
          <section
            key={section.tier}
            className="work-group"
            aria-labelledby={`work-${section.tier}`}
          >
            <h2 id={`work-${section.tier}`}>{section.title}</h2>
            {section.tier === "study" ? (
              <p className="group-note">
                Earlier explorations in form, materials and motion.
              </p>
            ) : null}
            <div
              className={`project-grid${section.tier === "study" ? " studies-grid" : ""}`}
            >
              {items.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  compact={section.tier === "study"}
                  eager={section.tier === "featured" && index === 0}
                />
              ))}
            </div>
          </section>
        ) : null;
      })}
    </div>
  );
}
