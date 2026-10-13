import type { PublishedProjectRecord } from "../types/project";
import { image, video, showcase } from "./media";
export const oasis: PublishedProjectRecord = {
  slug: "oasis-environment",
  title: "Oasis",
  subtitle: "A little relief in the desert.",
  summary:
    "A material and environment study in Unreal Engine: moving water, animated sand and a sheltered courtyard built from modular resources.",
  tracks: ["technical-art"],
  tier: "supporting",
  rank: 6,
  publication: "published",
  projectType: "Environment study",
  roles: ["Technical artist", "Environment assembly"],
  tools: ["Unreal Engine", "Materials", "Landscape"],
  facts: [
    { label: "Engine", value: "Unreal Engine 5.7" },
    { label: "Focus", value: "Materials & environment" },
  ],
  scope:
    "My contribution is environment direction, material work and resource integration. The modular fort, vegetation, rocks and texture sources are credited separately.",
  version:
    "Five camera shots from the selected Oasis map, with the existing lighting, geometry and materials retained. Fixed-step cinematic capture preserves native material timing. The footage presents composition and motion, not a player collision test or a real-time performance measurement.",
  cover: image(
    "oasis-environment",
    "showcase-poster",
    "A desert courtyard surrounding water and trees",
    "The fort enclosure frames the water and hero tree as a focal point.",
  ),
  showcase: {
    ...showcase(
      "oasis-environment",
      "Oasis: From stone entrance to water",
      "Five normal-render camera shots: arrival, courtyard reveal, water, flowing sand and a final overview. Native lighting and material motion; no audio.",
      "The camera approaches a stone arch at eye height, then passes the ruined wall to reveal the central pool. Separate closer views show the water surface and moving sand beside the masonry. A wider view closes on the pool, tree and enclosing fort.",
    ),
    poster: image("oasis-environment", "showcase-poster", "Oasis courtyard", "")
      .src,
    posterSrcSet: image(
      "oasis-environment",
      "showcase-poster",
      "Oasis courtyard",
      "",
    ).srcSet,
    subtitles: "/media/oasis-environment/showcase.vtt",
  },
  context:
    "Oasis explores the contrast between a dry desert enclosure and a cooler central water feature. I used a modular fort, layered rocks and desert vegetation to build a sheltered composition, then developed material treatments that give the space subtle motion.",
  contributions: [
    "Composed the environment around the water and hero tree.",
    "Integrated modular resources and material instances.",
    "Worked on animated sand and water materials.",
  ],
  breakdown: [
    {
      id: "give-the-water-a-clear-role",
      layout: "split",
      title: "Give the water a clear role",
      paragraphs: [
        "The water is both a material study and the scene's visual destination. It contrasts with the surrounding sand and masonry, while the rocks and vegetation connect it to the larger courtyard. Close views reveal surface motion that is less visible in the overview.",
      ],
      media: {
        ...video(
          "oasis-environment",
          "Water surface and shoreline",
          "The water moves within the rock-framed pool. Native scene materials and lighting; no audio.",
          "A closer camera view shows the animated surface beside the central tree, with the surrounding fort and rocks still visible.",
          "water",
        ),
        poster: image("oasis-environment", "water-still", "Water surface", "")
          .src,
        subtitles: "/media/oasis-environment/water.vtt",
      },
    },
    {
      id: "connect-motion-to-the-environment",
      layout: "wide",
      title: "Connect motion to the environment",
      paragraphs: [
        "The sand treatment adds motion to the broad ground surface. Reusable materials and instances keep that work connected to the rest of the environment rather than treating each placed asset as a separate visual problem.",
        "The study also involved asset references, pivots and material consistency. It is an environment integration case, not a claim that every model and texture was made from scratch.",
      ],
      media: {
        ...video(
          "oasis-environment",
          "Flowing sand beside the ruins",
          "The sand treatment in the assembled environment. Native material timing; no audio.",
          "The camera crosses the sand surface beside broken masonry while the pool remains in the background.",
          "sand",
        ),
        poster: image("oasis-environment", "sand-still", "Sand and masonry", "")
          .src,
        subtitles: "/media/oasis-environment/sand.vtt",
      },
      comparison: [
        {
          label: "Sand detail",
          asset: image(
            "oasis-environment",
            "sand-still",
            "Sand treatment beside ruined stonework",
            "The material connects the open ground to the surrounding masonry.",
          ),
        },
        {
          label: "Water detail",
          asset: image(
            "oasis-environment",
            "water-still",
            "Water around the central tree",
            "The cooler pool provides a contrast to the dry ground and walls.",
          ),
        },
      ],
    },
    {
      id: "recorded-detail",
      layout: "wide",
      title: "Reveal the courtyard through the ruins",
      paragraphs: [
        "The approach lets the pool appear gradually between the fort and broken walls. The tree holds the center of the composition; the final wider view brings those framing elements together.",
      ],
      media: {
        ...video(
          "oasis-environment",
          "Courtyard reveal",
          "A separate camera move passes the ruin and reveals the pool. No geometry or lighting changes; no audio.",
          "Starting beside the broken wall, the camera moves past its end and turns toward the water and tree.",
          "courtyard",
        ),
        poster: image(
          "oasis-environment",
          "courtyard-still",
          "Courtyard reveal",
          "",
        ).src,
        subtitles: "/media/oasis-environment/courtyard.vtt",
      },
      comparison: [
        {
          label: "Entrance",
          asset: image(
            "oasis-environment",
            "arrival-still",
            "The stone arch at eye height",
            "The entrance frames the first view into the enclosure.",
          ),
        },
        {
          label: "Overview",
          asset: image(
            "oasis-environment",
            "showcase-poster",
            "The complete Oasis courtyard composition",
            "Fort walls, foliage and ruins frame the water and central tree.",
          ),
        },
        {
          label: "Earlier camera study",
          asset: video(
            "oasis-environment",
            "Earlier environment camera study",
            "Earlier scripted overview and material views. No audio.",
            "A sandstone enclosure surrounds the oasis; separate closer views study its water and sand.",
          ),
        },
      ],
    },
  ],
  flow: [],
  result: [
    "The result is a compact environment in which materials support composition. A useful next iteration would strengthen the custom focal assets while preserving the calm center and readable route.",
  ],
  credits: [
    {
      name: "Poly Haven",
      detail:
        "CC0 fort, vegetation, rocks, surface textures and Wasteland Clouds Pure Sky. Includes Modular Fort 01, Namaqualand assets, Tree Small 02, Quiver Trees and Wild Rooibos Bush.",
      href: "https://polyhaven.com",
    },
    {
      name: "Sand Ripples Displacement",
      detail:
        "User-supplied source resource, credited separately from the Poly Haven collection.",
    },
    {
      name: "Epic Games",
      detail:
        "Existing Unreal Engine First Person framework and engine meshes.",
    },
  ],
  links: [],
};
