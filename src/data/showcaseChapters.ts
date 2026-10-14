import { image } from "./media";
import type { ProjectRecord, VisualAsset } from "../types/project";

export type ShowcaseChapter = {
  id: string;
  label: string;
  asset: VisualAsset;
  section?: string;
  duration?: number;
};

const durations: Record<string, Record<string, number>> = {
  deinosavros: {
    showcase: 76.6,
    "combat-and-reward": 47.9,
    "map-and-chance": 28.73,
    "offering-to-combat": 32,
  },
  "procedural-city": {
    showcase: 42,
    "editor-controls": 14.8,
    "locked-neighbor": 8,
    "street-traffic": 7,
  },
  "rhythm-rider": {
    showcase: 61.91,
    "earned-feedback": 17,
    "normal-patterns": 15,
    "dense-patterns": 15,
    finish: 14.9,
  },
  "ink-vfx": { showcase: 8.23, melee: 7, "projectile-wide": 10.97, area: 8 },
  "oasis-environment": { showcase: 24.5, courtyard: 5, water: 4.5, sand: 5 },
  "one-more-second": { demo: 17.8, "tool-response": 12.47 },
};
const selection: Record<
  string,
  { id: string; label: string; poster: string }[]
> = {
  deinosavros: [
    { id: "showcase", label: "Full sequence", poster: "showcase-poster" },
    {
      id: "combat-and-reward",
      label: "Combat & reward",
      poster: "showcase-poster",
    },
    { id: "map-and-chance", label: "Map & Chance", poster: "route" },
    { id: "offering-to-combat", label: "Offering choice", poster: "offering" },
  ],
  "procedural-city": [
    {
      id: "showcase",
      label: "City & tool overview",
      poster: "showcase-poster",
    },
    { id: "editor-controls", label: "Editor controls", poster: "detail-1" },
    {
      id: "locked-neighbor",
      label: "Lock & rebuild",
      poster: "rebuild-before",
    },
    { id: "street-traffic", label: "Street view", poster: "street" },
  ],
  "rhythm-rider": [
    { id: "showcase", label: "Gameplay highlights", poster: "earned-perfect" },
    {
      id: "earned-feedback",
      label: "Perfect & combo",
      poster: "earned-perfect",
    },
    {
      id: "normal-patterns",
      label: "Normal pattern",
      poster: "pattern-normal",
    },
    { id: "dense-patterns", label: "Dense pattern", poster: "pattern-dense" },
    { id: "finish", label: "Finish & results", poster: "results" },
  ],
  "ink-vfx": [
    { id: "showcase", label: "Three attacks", poster: "showcase-poster" },
    { id: "melee", label: "Melee", poster: "melee-still" },
    { id: "projectile-wide", label: "Projectile", poster: "projectile-impact" },
    { id: "area", label: "Area attack", poster: "area-still" },
  ],
  "oasis-environment": [
    { id: "showcase", label: "Environment film", poster: "showcase-poster" },
    { id: "courtyard", label: "Courtyard reveal", poster: "courtyard-still" },
    { id: "water", label: "Water surface", poster: "water-still" },
    { id: "sand", label: "Sand detail", poster: "sand-still" },
  ],
  "one-more-second": [
    { id: "demo", label: "Opening dialogue", poster: "detail-1" },
    {
      id: "tool-response",
      label: "Controlled tool response",
      poster: "detail-2",
    },
  ],
};

export function getShowcaseChapters(project: ProjectRecord): ShowcaseChapter[] {
  const available: { asset: VisualAsset; section?: string }[] = [];
  if (project.showcase) available.push({ asset: project.showcase });
  for (const section of project.breakdown) {
    if (section.media?.mediaType === "video")
      available.push({ asset: section.media, section: section.id });
    for (const variant of section.comparison ?? []) {
      if (variant.asset.mediaType === "video")
        available.push({ asset: variant.asset, section: section.id });
    }
  }
  return (selection[project.slug] ?? []).flatMap((item) => {
    const found = available.find(({ asset }) =>
      asset.src.endsWith(`/${item.id}.mp4`),
    );
    if (!found)
      throw new Error(`Missing curated chapter: ${project.slug}/${item.id}`);
    const poster = image(project.slug, item.poster, item.label, "");
    return [
      {
        id: item.id,
        label: item.label,
        section: found.section,
        duration: durations[project.slug]?.[item.id],
        asset: {
          ...found.asset,
          poster: poster.src,
          posterSrcSet: poster.srcSet,
        },
      },
    ];
  });
}
