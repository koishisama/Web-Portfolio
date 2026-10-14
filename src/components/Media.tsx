import { useEffect, useId, useRef, useState } from "react";
import type { VisualAsset } from "../types/project";
import Icon from "./Icon";

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

function AnimatedPreview({
  asset,
  eager,
  sizes,
  onPlayVideo,
}: {
  asset: VisualAsset;
  eager: boolean;
  sizes: string;
  onPlayVideo: () => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [explicitMotion, setExplicitMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      setExplicitMotion(false);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1),
      { threshold: 0.1 },
    );
    if (frame.current) observer.observe(frame.current);
    const pauseForVideo = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) setPaused(true);
    };
    document.addEventListener("play", pauseForVideo, true);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("play", pauseForVideo, true);
    };
  }, []);
  const active =
    visible && !paused && !failed && (!reducedMotion || explicitMotion);
  return (
    <div
      ref={frame}
      className="animated-preview"
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
      data-animation-state={active ? "playing" : "stopped"}
    >
      <Picture
        asset={{
          ...asset,
          src: asset.poster!,
          srcSet: asset.posterSrcSet,
          mediaType: "image",
          purpose: "illustration",
          alt: active ? "" : asset.alt,
        }}
        eager={eager}
        sizes={sizes}
      />
      {active ? (
        <img
          className="animated-frames"
          src={asset.animation!.src}
          alt={asset.alt}
          width={asset.animation!.width}
          height={asset.animation!.height}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span className="animation-format" aria-hidden="true">
        GIF
      </span>
      <div className="animation-controls">
        {!failed ? (
          <button
            type="button"
            className="icon-button"
            aria-label={`${active ? "Pause" : "Start"} animation: ${asset.title}`}
            title={active ? "Pause animation" : "Start animation"}
            onClick={() => {
              setPaused(active);
              if (!active) setExplicitMotion(true);
            }}
          >
            <Icon name={active ? "pause" : "play"} />
          </button>
        ) : null}
        <button
          type="button"
          className="icon-button"
          aria-label={`Play original video: ${asset.title}`}
          title="Play original video"
          onClick={onPlayVideo}
        >
          <Icon name="expand" />
        </button>
      </div>
      {failed ? (
        <p className="animation-error" role="status">
          Animation unavailable. <a href={asset.animation!.src}>Open GIF file</a>
        </p>
      ) : null}
    </div>
  );
}

function VideoPlayer({
  asset,
  eager,
  sizes,
  playOnMount,
}: {
  asset: VisualAsset;
  eager: boolean;
  sizes: string;
  playOnMount: boolean;
}) {
  const [activated, setActivated] = useState(playOnMount);
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
  if (!activated && asset.animation)
    return (
      <AnimatedPreview
        asset={asset}
        eager={eager}
        sizes={sizes}
        onPlayVideo={() => setActivated(true)}
      />
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
        <span className="video-play-label" aria-hidden="true">
          <Icon name="play" />
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
          <Icon name="expand" />
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
            className="icon-button media-dialog-close"
            aria-label="Close"
            title="Close"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
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
  playOnMount = false,
  compactCaption = false,
  captionTitle,
}: {
  asset: VisualAsset;
  eager?: boolean;
  sizes?: string;
  playOnMount?: boolean;
  compactCaption?: boolean;
  captionTitle?: string;
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
            playOnMount={playOnMount}
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
      <figcaption className={compactCaption ? "compact-caption" : undefined}>
        {compactCaption ? (
          <>
            <span>{captionTitle ?? asset.title}</span>
            <details className="media-info">
              <summary
                aria-label={`Recording details: ${asset.title}`}
                title="Recording details"
              >
                <Icon name="info" />
              </summary>
              <div>
                <p>{asset.caption}</p>
                {asset.transcript ? <p>{asset.transcript}</p> : null}
              </div>
            </details>
          </>
        ) : (
          asset.caption
        )}
      </figcaption>
      {asset.mediaType === "video" && asset.transcript && !compactCaption ? (
        <details className="video-description">
          <summary aria-label="Video description" title="Video description">
            <Icon name="info" />
          </summary>
          <p>{asset.transcript}</p>
        </details>
      ) : null}
    </figure>
  );
}
