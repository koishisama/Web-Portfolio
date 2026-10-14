import { useState, type CSSProperties } from "react";
import type { ProjectRecord } from "../types/project";
import Icon, { type IconName } from "./Icon";

const flowIcons: Record<string, IconName[]> = {
  deinosavros: ["sword", "cards", "route", "dice", "arrow-right"],
  "procedural-city": ["sliders", "layers", "lock", "refresh"],
  "rhythm-rider": ["music", "speed", "code", "sparkles"],
  "ink-vfx": ["sword", "brush", "layers", "sparkles"],
  "one-more-second": ["message", "watch", "sparkles", "headphones"],
  "oasis-environment": ["tree", "layers", "droplet", "brush"],
};

export default function Diagram({ project }: { project: ProjectRecord }) {
  const [bpm, setBpm] = useState(90);
  const [speed, setSpeed] = useState(24.1);
  const spacing = (60 / bpm) * speed;
  const markerCount = Math.min(8, Math.floor(554 / (spacing * 4.5)) + 1);
  return (
    <figure className="diagram">
      <div className="diagram-heading">
        <span className="diagram-note">Conceptual flow</span>
      </div>
      <ol
        className="flow-steps"
        style={{ "--flow-count": project.flow.length } as CSSProperties}
      >
        {project.flow.map((step, i) => (
          <li key={step.label}>
            <span className="flow-icon">
              <Icon name={flowIcons[project.slug]?.[i] ?? "layers"} />
            </span>
            <strong>{step.label}</strong>
          </li>
        ))}
      </ol>
      <details className="diagram-details">
        <summary aria-label="Diagram explanation" title="Diagram explanation">
          <Icon name="info" />
          <Icon name="chevron-down" />
        </summary>
        {project.flow.map((step) => (
          <p key={step.label}>
            <strong>{step.label}.</strong> {step.detail}
          </p>
        ))}
        <p>
          The diagram explains the implementation described in this case; it is
          not a screenshot of the game or editor.
        </p>
      </details>
      {project.slug === "rhythm-rider" ? (
        <div className="beat-demo">
          <div className="beat-controls">
            <label htmlFor="beat-bpm">
              <span className="sr-only">Tempo</span>
              <Icon name="music" />
              <output htmlFor="beat-bpm">{bpm} BPM</output>
              <input
                id="beat-bpm"
                type="range"
                min="60"
                max="180"
                step="5"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
              />
            </label>
            <label htmlFor="beat-speed">
              <span className="sr-only">Player speed</span>
              <Icon name="speed" />
              <output htmlFor="beat-speed">{speed} units/s</output>
              <input
                id="beat-speed"
                type="range"
                min="4"
                max="32"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </label>
          </div>
          <svg
            className="beat-track"
            viewBox="0 0 600 90"
            role="img"
            aria-label={`Illustrated obstacle spacing: ${spacing.toFixed(1)} world units per beat`}
          >
            <path
              d="M20 45H580"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth="2"
            />
            {Array.from({ length: markerCount }, (_, i) => (
              <g key={i} transform={`translate(${26 + i * spacing * 4.5}, 0)`}>
                <rect y="28" width="8" height="34" rx="2" fill="currentColor" />
                <text
                  y="82"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="12"
                >
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
          <p className="formula">
            60 / {bpm} × {speed} ={" "}
            <strong>{spacing.toFixed(1)} units per beat</strong>
          </p>
          <p className="small-text">
            Starts at the inspected scene's 90 BPM and 24.1 units/s. This is an
            illustration, not live game telemetry; a fixed offset is omitted.
          </p>
        </div>
      ) : null}
    </figure>
  );
}
