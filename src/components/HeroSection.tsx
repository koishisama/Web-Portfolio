import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { featuredProject } from "../data/projects";
import { siteMeta } from "../data/site";
import MediaPlaceholder from "./MediaPlaceholder";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const backgroundMedia = featuredProject.heroImage;
  const backgroundIsVideo = backgroundMedia.mediaType === "video" && backgroundMedia.src;

  return (
    <section className={`hero${hasVideoEnded ? " is-ended" : ""}`}>
      {backgroundMedia.src ? (
        <div className="hero-background" aria-hidden="true">
          {backgroundIsVideo ? (
            <video
              ref={videoRef}
              className="hero-background__media"
              src={backgroundMedia.src}
              poster={backgroundMedia.poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => {
                const node = videoRef.current;
                if (node) {
                  node.pause();
                }
                setHasVideoEnded(true);
              }}
            />
          ) : (
            <img
              className="hero-background__media"
              src={backgroundMedia.src}
              alt=""
              loading="eager"
            />
          )}
          <div className="hero-background__veil" />
        </div>
      ) : null}

      <div className="page-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Game Portfolio</p>
          <h1 className="display-title">{siteMeta.roleLabel}</h1>
          <p className="hero-statement">{siteMeta.heroStatement}</p>
          <p className="lead">{siteMeta.heroSummary}</p>

          <div className="hero-actions">
            <Link className="button button--primary" to="/projects">
              View Projects
            </Link>
            <Link className="button button--ghost" to={`/projects/${featuredProject.slug}`}>
              Open Rhythm-Rider
            </Link>
          </div>

          <ul className="hero-pills" aria-label="Primary disciplines">
            {featuredProject.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <MediaPlaceholder asset={featuredProject.thumbnail} />
        </div>
      </div>
    </section>
  );
}
