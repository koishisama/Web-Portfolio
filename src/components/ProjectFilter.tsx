import { useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";
import type { Track } from "../types/project";

const subscribe = () => () => {};
export function useProjectTrack() {
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
  function select(track: Track | "all") {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (track === "all") next.delete("track");
        else next.set("track", track);
        return next;
      },
      { preventScrollReset: true },
    );
  }
  return { selected, select };
}

export default function ProjectFilter({
  selected,
  onSelect,
  count,
  allLabel = "All work",
}: {
  selected: Track | "all";
  onSelect: (track: Track | "all") => void;
  count: number;
  allLabel?: string;
}) {
  return (
    <div
      className="filter-bar"
      role="group"
      aria-label="Filter work by discipline"
    >
      {(
        [
          { id: "all", label: allLabel },
          { id: "programming", label: "Programming" },
          { id: "technical-art", label: "Technical Art" },
        ] as const
      ).map((filter) => (
        <button
          type="button"
          key={filter.id}
          aria-pressed={selected === filter.id}
          onClick={() => onSelect(filter.id)}
        >
          {filter.label}
        </button>
      ))}
      <p className="sr-only" role="status">
        {count} projects shown.
      </p>
    </div>
  );
}
