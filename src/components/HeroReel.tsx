import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const clips = [
  { slug: "deinosavros", title: "Deinosavros", note: "Combat & map UI" },
  { slug: "procedural-city", title: "Procedural City", note: "Editor tooling" },
  { slug: "rhythm-rider", title: "Rhythm Rider", note: "Gameplay & feedback" },
  { slug: "ink-vfx", title: "Ink VFX", note: "Niagara effects" },
  { slug: "oasis-environment", title: "Oasis", note: "Environment & materials" },
];

// A short silent loop of compressed 4-second clips, one per project.
export default function HeroReel() {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const clip = clips[index];

  useEffect(() => {
    // Respect reduced motion: stay on the still frame until the visitor presses play.
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (playing && visible)
      node.play().catch((error: DOMException) => {
        // An interrupted play() (AbortError) is harmless; only a blocked autoplay stops the reel.
        if (error.name === "NotAllowedError") setPlaying(false);
      });
    else node.pause();
  }, [playing, visible, index]);

  return (
    <div
      className="hero-reel"
      ref={frame}
      data-playing={playing && visible ? "" : undefined}
    >
      <video
        key={clip.slug}
        ref={video}
        className="hero-reel-video"
        src={`/media/reel/${clip.slug}.mp4`}
        poster={`/media/reel/${clip.slug}.webp`}
        muted
        playsInline
        preload="metadata"
        aria-label={`${clip.title} gameplay clip`}
        onEnded={() => setIndex((index + 1) % clips.length)}
      />
      <div className="hero-reel-bar">
        <Link className="hero-reel-label" to={`/projects/${clip.slug}`}>
          <strong>{clip.title}</strong>
          <span>{clip.note}</span>
          <Icon name="arrow-up-right" />
        </Link>
        <div className="hero-reel-controls">
          <div className="hero-reel-dots" role="group" aria-label="Choose clip">
            {clips.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                aria-label={item.title}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="hero-reel-toggle"
            aria-label={playing ? "Pause reel" : "Play reel"}
            onClick={() => setPlaying(!playing)}
          >
            <Icon name={playing ? "pause" : "play"} />
          </button>
        </div>
      </div>
    </div>
  );
}
