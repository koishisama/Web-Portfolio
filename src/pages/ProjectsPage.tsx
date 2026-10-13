import { useSearchParams } from "react-router-dom";
import { useSyncExternalStore } from "react";
import { projects } from "../data/projects";
import type { Track } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import ContactCTA from "../components/ContactCTA";
const subscribe = () => () => {};
export default function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const value = params.get("track");
  const selected: Track | "all" =
    hydrated && (value === "programming" || value === "technical-art")
      ? value
      : "all";
  const visible = projects.filter(
    (project) => selected === "all" || project.tracks.includes(selected),
  );
  return (
    <>
      <div className="container">
        <header className="page-header">
          <p className="eyebrow">The work</p>
          <h1>
            Selected work.
            <br />
            Further explorations.
          </h1>
          <p>
            Projects, tools and studies across game programming and technical
            art.
          </p>
        </header>
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter work by discipline"
        >
          {(
            [
              { id: "all", label: "All work" },
              { id: "programming", label: "Programming" },
              { id: "technical-art", label: "Technical Art" },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              aria-pressed={selected === filter.id}
              onClick={() =>
                setParams(filter.id === "all" ? {} : { track: filter.id })
              }
            >
              {filter.label}
            </button>
          ))}
          <p role="status" className="filter-count">
            {visible.length} projects
          </p>
        </div>
        {[
          {
            tier: "featured",
            title: "Selected case studies",
            note: "The problem, the implementation, the result.",
          },
          {
            tier: "supporting",
            title: "More projects",
            note: "Team delivery and focused exploration.",
          },
          {
            tier: "study",
            title: "Studies",
            note: "Earlier explorations in form, materials and motion.",
          },
        ].map((section) => {
          const items = visible.filter((p) => p.tier === section.tier);
          return items.length ? (
            <section key={section.tier} className="work-group">
              <div className="work-group-title">
                <h2>{section.title}</h2>
                <p>{section.note}</p>
              </div>
              <div
                className={`project-grid ${section.tier === "study" ? "studies-grid" : ""}`}
              >
                {items.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    compact={section.tier !== "featured"}
                  />
                ))}
              </div>
            </section>
          ) : null;
        })}
      </div>
      <ContactCTA />
    </>
  );
}
