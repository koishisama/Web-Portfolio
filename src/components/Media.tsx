import { useEffect, useId, useRef, useState } from "react";
import type { VisualAsset } from "../types/project";

export function Picture({
  asset,
  eager = false,
  sizes = "(max-width: 800px) 88vw, 50vw",
}: {
  asset: VisualAsset;
  eager?: boolean;
  sizes?: string;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const element = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // A prerendered image can fail before React attaches its error listener.
    if (element.current?.complete && element.current.naturalWidth === 0)
      setFailedSource(asset.src);
  }, [asset.src, asset.srcSet]);
  if (failedSource === asset.src)
    return (
      <div className="media-unavailable" role="img" aria-label={asset.alt}>
        <span>Image unavailable</span>
        <p>{asset.caption}</p>
      </div>
    );
  return (
    <picture>
      {asset.srcSet ? (
        <source type="image/webp" srcSet={asset.srcSet} sizes={sizes} />
      ) : null}
      <img
        ref={element}
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={eager ? "eager" : "lazy"}
        {...{ fetchpriority: eager ? "high" : "auto" }}
        decoding="async"
        onError={() => setFailedSource(asset.src)}
      />
    </picture>
  );
}

function VideoPlayer({
  asset,
  eager,
  sizes,
}: {
  asset: VisualAsset;
  eager: boolean;
  sizes: string;
}) {
  const [activated, setActivated] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!activated) return;
    const video = player.current;
    video?.focus({ preventScroll: true });
    void video?.play().catch(() => {
      // Native controls remain available if the browser declines the play request.
    });
    return () => video?.pause();
  }, [activated]);
  if (failed)
    return (
      <div className="media-unavailable">
        <span>Video could not be loaded.</span>
        <p>{asset.transcript ?? asset.caption}</p>
        <a href={asset.src}>Open video file</a>
      </div>
    );
  if (!activated)
    return (
      <button
        type="button"
        className="video-poster-button"
        style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
        aria-label={`Play ${asset.title}`}
        onClick={() => setActivated(true)}
      >
        {asset.poster ? (
          <span className="media-poster-picture">
            <Picture
              asset={{
                ...asset,
                src: asset.poster,
                srcSet: asset.posterSrcSet,
                mediaType: "image",
                purpose: "illustration",
                alt: `Poster for ${asset.title}`,
              }}
              eager={eager}
              sizes={sizes}
            />
          </span>
        ) : null}
        <span className="video-play-label">
          <span aria-hidden="true">▶</span> Play video
        </span>
      </button>
    );
  return (
    <video
      ref={player}
      className="media-video"
      controls
      playsInline
      preload="none"
      poster={asset.poster}
      width={asset.width}
      height={asset.height}
      aria-label={asset.title}
      onError={() => setFailed(true)}
      onPlay={(event) => {
        const active = event.currentTarget;
        for (const video of document.querySelectorAll("video"))
          if (video !== active) video.pause();
      }}
    >
      <source
        src={asset.src}
        type="video/mp4"
        onError={() => setFailed(true)}
      />
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
  );
}

function ImageViewer({
  asset,
  eager,
  sizes,
}: {
  asset: VisualAsset;
  eager: boolean;
  sizes: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();
  return (
    <>
      <a
        ref={trigger}
        className="image-expand"
        href={asset.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size image: ${asset.title}`}
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <Picture key={asset.src} asset={asset} eager={eager} sizes={sizes} />
        <span className="expand-label" aria-hidden="true">
          View full size
        </span>
      </a>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="media-dialog-header">
          <h2 id={titleId}>{asset.title}</h2>
          <button
            type="button"
            className="media-dialog-close"
            onClick={() => dialog.current?.close()}
          >
            Close
          </button>
        </div>
        {open ? (
          <figure>
            <img
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
            />
            <figcaption>{asset.caption}</figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}

export default function Media({
  asset,
  eager = false,
  sizes = "(max-width: 800px) 88vw, (max-width: 1600px) 91vw, 1460px",
}: {
  asset: VisualAsset;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <figure
      className={`media-figure ${asset.mediaType === "video" ? "video-figure" : ""}`}
      data-media-purpose={asset.purpose}
    >
      <div className="media-frame">
        {asset.mediaType === "video" ? (
          <VideoPlayer
            key={asset.src}
            asset={asset}
            eager={eager}
            sizes={sizes}
          />
        ) : (
          <ImageViewer
            key={asset.src}
            asset={asset}
            eager={eager}
            sizes={sizes}
          />
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
