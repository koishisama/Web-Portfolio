import { useState } from "react";
import type { VisualAsset } from "../types/project";

export function Picture({
  asset,
  eager = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  asset: VisualAsset;
  eager?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className="media-unavailable" role="img" aria-label={asset.alt}>
        <span>Media unavailable</span>
        <p>{asset.caption}</p>
      </div>
    );
  return (
    <picture>
      {asset.srcSet ? (
        <source type="image/webp" srcSet={asset.srcSet} sizes={sizes} />
      ) : null}
      <img
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={eager ? "eager" : "lazy"}
        {...{ fetchpriority: eager ? "high" : "auto" }}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}

export default function Media({
  asset,
  eager = false,
}: {
  asset: VisualAsset;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure
      className={`media-figure ${asset.mediaType === "video" ? "video-figure" : ""}`}
    >
      <div className="media-frame">
        {asset.mediaType === "video" ? (
          failed ? (
            <div className="media-unavailable">
              <span>Video could not be loaded.</span>
              <p>{asset.transcript ?? asset.caption}</p>
              <a href={asset.src}>Open video file</a>
            </div>
          ) : (
            <video
              controls
              playsInline
              preload="none"
              poster={asset.poster}
              width={asset.width}
              height={asset.height}
              aria-label={asset.title}
              onError={() => setFailed(true)}
            >
              <source src={asset.src} type="video/mp4" />
              {asset.subtitles ? (
                <track
                  kind="captions"
                  label="English"
                  srcLang="en"
                  src={asset.subtitles}
                  default
                />
              ) : null}
              <p>
                Your browser cannot play this video.{" "}
                <a href={asset.src}>Open the video</a>.
              </p>
            </video>
          )
        ) : (
          <a
            className="image-expand"
            href={asset.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full-size image: ${asset.title}`}
          >
            <Picture
              asset={asset}
              eager={eager}
              sizes="(max-width: 900px) 100vw, 900px"
            />
            <span className="expand-label" aria-hidden="true">
              View full size ↗
            </span>
          </a>
        )}
      </div>
      <figcaption>
        <span className="caption-mark" aria-hidden="true" />
        {asset.caption}
      </figcaption>
      {asset.mediaType === "video" && asset.transcript ? (
        <details className="video-description">
          <summary>Video description</summary>
          <p>{asset.transcript}</p>
        </details>
      ) : null}
    </figure>
  );
}
