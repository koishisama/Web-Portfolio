import { useId, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";
import { getShowcaseChapters } from "../data/showcaseChapters";
import type { ProjectRecord } from "../types/project";
import Media, { Picture } from "./Media";

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
  const requested = hydrated ? params.get("clip") : null;
  const selected =
    chapters.find((chapter) => chapter.id === requested) ?? chapters[0];
  const playerId = useId();
  if (!selected) return <Media asset={project.cover} eager />;
  return (
    <div className="showcase-gallery">
      <div id={playerId} className="gallery-player">
        <Media
          key={selected.id}
          asset={selected.asset}
          eager
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
            <Picture
              asset={{
                ...chapter.asset,
                mediaType: "image",
                purpose: "illustration",
                src: chapter.asset.poster!,
                srcSet: chapter.asset.posterSrcSet,
                alt: `Preview: ${chapter.label}`,
              }}
              sizes="(max-width: 560px) calc((100vw - 56px) / 2), (max-width: 1200px) 24vw, 264px"
            />
            <span>{chapter.label}</span>
          </button>
        ))}
      </div>
      <div className="gallery-note">
        <p role="status">
          {selected.label} selected. Choose a clip, then press play.
        </p>
        {selected.section ? (
          <a href={`#${selected.section}`}>Read the related explanation</a>
        ) : null}
      </div>
    </div>
  );
}
