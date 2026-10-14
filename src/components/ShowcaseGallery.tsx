import { useId, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";
import { getShowcaseChapters } from "../data/showcaseChapters";
import type { ProjectRecord } from "../types/project";
import Media from "./Media";
import MediaThumbnail from "./MediaThumbnail";
import Icon from "./Icon";

const subscribe = () => () => {};
export default function ShowcaseGallery({
  project,
}: {
  project: ProjectRecord;
}) {
  const chapters = getShowcaseChapters(project);
  const [params, setParams] = useSearchParams();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const selected =
    chapters.find(
      (chapter) => chapter.id === (hydrated ? params.get("clip") : null),
    ) ?? chapters[0];
  const playerId = useId();
  if (!selected) return <Media asset={project.cover} eager />;
  return (
    <div className="showcase-gallery">
      <div id={playerId} className="gallery-player">
        <Media
          key={selected.id}
          asset={selected.asset}
          eager
          compactCaption
          captionTitle={selected.label}
          sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 64px), 1120px"
        />
      </div>
      <div
        className="clip-list"
        role="group"
        aria-label={`Choose a ${project.title} video`}
      >
        {chapters.map((chapter) => (
          <button
            type="button"
            key={chapter.id}
            data-clip={chapter.id}
            aria-label={chapter.label}
            aria-pressed={selected.id === chapter.id}
            aria-controls={playerId}
            onClick={() => {
              setParams(
                (previous) => {
                  const next = new URLSearchParams(previous);
                  if (chapter.id === chapters[0].id) next.delete("clip");
                  else next.set("clip", chapter.id);
                  return next;
                },
                { preventScrollReset: true },
              );
            }}
          >
            <MediaThumbnail
              asset={chapter.asset}
              label={chapter.label}
              selected={selected.id === chapter.id}
              duration={chapter.duration}
            />
          </button>
        ))}
      </div>
      <div className="gallery-note">
        <p className="sr-only" role="status">
          {selected.label} selected.
        </p>
        {selected.section ? (
          <a
            className="icon-button"
            href={`#${selected.section}`}
            aria-label="Open related technical explanation"
            title="Open related technical explanation"
          >
            <Icon name="code" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
