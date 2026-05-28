import type { CSSProperties } from "react";
import type { VisualAsset } from "../types/project";

type MediaPlaceholderProps = {
  asset: VisualAsset;
  className?: string;
  compact?: boolean;
  variant?: "default" | "gallery";
  showCaption?: boolean;
};

export default function MediaPlaceholder({
  asset,
  className = "",
  compact = false,
  variant = "default",
  showCaption = false
}: MediaPlaceholderProps) {
  const hasMedia = Boolean(asset.src);
  const isGallery = variant === "gallery";
  const showsCaption = !isGallery || showCaption;
  const usesDetachedCaption = isGallery ? showCaption : showsCaption && Boolean(asset.controls);
  const isVideo = asset.mediaType === "video";
  const showsPlayerControls = isVideo && Boolean(asset.controls);
  const showsLoopPreview = isGallery && isVideo && !asset.controls;

  const style = {
    "--asset-accent": asset.accent,
    "--asset-overlay": asset.overlay,
    "--asset-position": asset.objectPosition ?? "center"
  } as CSSProperties;

  return (
    <figure
      className={`media-shell${hasMedia ? " has-live-media" : ""}${usesDetachedCaption ? " has-detached-caption" : ""}${isGallery ? " is-gallery" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div
        className={`media-frame${compact ? " is-compact" : ""}${hasMedia ? " has-live-media" : ""}${usesDetachedCaption ? " is-detached" : ""}${isGallery ? " is-gallery" : ""}${showsPlayerControls ? " is-player" : ""}`}
      >
        {hasMedia ? (
          showsPlayerControls ? (
            <video
              className="media-element media-element--player"
              src={asset.src}
              poster={asset.poster}
              autoPlay={asset.autoPlay}
              muted={asset.muted ?? false}
              loop={asset.loop ?? false}
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : showsLoopPreview ? (
            <video
              className="media-element media-element--loop"
              src={asset.src}
              poster={asset.poster}
              autoPlay={asset.autoPlay ?? true}
              muted={asset.muted ?? true}
              loop={asset.loop ?? true}
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="media-visual" aria-hidden="true">
              {isVideo ? (
                <video
                  className="media-element"
                  src={asset.src}
                  poster={asset.poster}
                  autoPlay={asset.autoPlay}
                  muted={asset.muted ?? !asset.controls}
                  loop={asset.loop ?? !asset.controls}
                  controls={asset.controls}
                  playsInline
                  preload={asset.controls ? "metadata" : "auto"}
                />
              ) : (
                <img className="media-element" src={asset.src} alt="" loading="lazy" />
              )}
            </div>
          )
        ) : null}

        {showsCaption && !usesDetachedCaption ? (
          <>
            {asset.eyebrow ? <span className="media-eyebrow">{asset.eyebrow}</span> : null}
            <div className="media-copy">
              <h3>{asset.title}</h3>
              <p>{asset.caption}</p>
            </div>
            {asset.tags?.length ? (
              <div className="media-tags" aria-label={`${asset.title} tags`}>
                {asset.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      {showsCaption && usesDetachedCaption ? (
        <figcaption className="media-caption">
          {asset.eyebrow ? <span className="media-eyebrow">{asset.eyebrow}</span> : null}
          <div className="media-copy media-copy--detached">
            <h3>{asset.title}</h3>
            <p>{asset.caption}</p>
          </div>
          {asset.tags?.length ? (
            <div className="media-tags" aria-label={`${asset.title} tags`}>
              {asset.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
          <span className="sr-only">{asset.alt}</span>
        </figcaption>
      ) : (
        <figcaption className="sr-only">{asset.alt}</figcaption>
      )}
    </figure>
  );
}
