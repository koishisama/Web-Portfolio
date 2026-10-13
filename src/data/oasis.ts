import type { PublishedProjectRecord } from "../types/project";
import { image, video } from "./media";
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
    "Normal-render capture of the selected Oasis map, 13 October 2026. The footage presents scene and material motion, not an interaction or collision test.",
  cover: image(
    "oasis-environment",
    "hero",
    "A desert courtyard surrounding water and trees",
    "The fort enclosure frames the water and hero tree as a focal point.",
  ),
  demo: video(
    "oasis-environment",
    "Oasis environment and material motion",
    "Scripted camera views of the rendered scene and materials. No audio.",
    "A sandstone enclosure surrounds an oasis. The sequence moves from an overview to close views of the water and sand surfaces.",
  ),
  context:
    "Oasis explores the contrast between a dry desert enclosure and a cooler central water feature. I used a modular fort, layered rocks and desert vegetation to build a sheltered composition, then developed material treatments that give the space subtle motion.",
  contributions: [
    "Composed the environment around the water and hero tree.",
    "Integrated modular resources and material instances.",
    "Worked on animated sand and water materials.",
  ],
  breakdown: [
    {
      title: "Give the water a clear role",
      paragraphs: [
        "The water is both a material study and the scene's visual destination. It contrasts with the surrounding sand and masonry, while the rocks and vegetation connect it to the larger courtyard. Close views reveal surface motion that is less visible in the overview.",
      ],
      media: image(
        "oasis-environment",
        "detail-1",
        "Water and shoreline materials in Oasis",
        "A closer look at the moving water surface and its surrounding materials.",
      ),
    },
    {
      title: "Connect motion to the environment",
      paragraphs: [
        "The sand treatment adds motion to the broad ground surface. Reusable materials and instances keep that work connected to the rest of the environment rather than treating each placed asset as a separate visual problem.",
        "The study also involved asset references, pivots and material consistency. It is an environment integration case, not a claim that every model and texture was made from scratch.",
      ],
      media: image(
        "oasis-environment",
        "detail-2",
        "Sand surface within the Oasis scene",
        "The sand close-up complements the wider view of the assembled environment.",
      ),
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
