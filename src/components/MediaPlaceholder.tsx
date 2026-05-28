import type { CSSProperties } from "react";
import type { VisualAsset } from "../types/project";

type MediaPlaceholderProps = {
  asset: VisualAsset;
  className?: string;
  compact?: boolean;
};

export default function MediaPlaceholder({
  asset,
  className = "",
  compact = false
}: MediaPlaceholderProps) {
  const style = {
    "--asset-accent": asset.accent,
    "--asset-overlay": asset.overlay
  } as CSSProperties;

  return (
    <figure className={`media-shell${className ? ` ${className}` : ""}`} style={style}>
      <div className={`media-frame${compact ? " is-compact" : ""}`}>
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
      </div>
      <figcaption className="sr-only">{asset.alt}</figcaption>
    </figure>
  );
}
