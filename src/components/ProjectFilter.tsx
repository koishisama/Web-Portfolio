import { projectFilters, type ProjectFilterKey } from "../data/projects";

type ProjectFilterProps = {
  activeFilter: ProjectFilterKey;
  onChange: (filter: ProjectFilterKey) => void;
};

export default function ProjectFilter({
  activeFilter,
  onChange
}: ProjectFilterProps) {
  return (
    <div className="filter-group" role="tablist" aria-label="Project filter">
      {projectFilters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`filter-chip${activeFilter === filter.key ? " is-active" : ""}`}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
