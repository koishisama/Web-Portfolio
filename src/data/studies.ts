import type { PublishedProjectRecord } from "../types/project";
import { image, video, showcase } from "./media";

export const studies: PublishedProjectRecord[] = [
  {
    slug: "single-vfx-studies",
    title: "Single VFX Studies",
    subtitle: "Shape, motion and a clear visual idea.",
    summary:
      "Three compact effect studies: an electric sphere, a tornado and a layered water ring.",
    tracks: ["technical-art"],
    tier: "study",
    rank: 10,
    publication: "published",
    projectType: "Independent study",
    roles: ["VFX artist"],
    tools: ["Real-time VFX", "Timing", "Motion studies"],
    facts: [
      { label: "Focus", value: "Effect shape and motion" },
      { label: "Format", value: "Three recorded studies" },
    ],
    scope:
      "I created these standalone effect studies to explore readable motion and distinct visual forms outside a full game scene.",
    version:
      "Recorded studies from the original portfolio. The tornado footage includes editor gizmos.",
    cover: image(
      "single-vfx-studies",
      "hero",
      "Electric sphere above branching blue arcs",
      "An illuminated sphere sends branching blue arcs toward a circular target.",
    ),
    showcase: {
      ...showcase(
        "single-vfx-studies",
        "Electric sphere study",
        "A short recording of the sphere and its electrical arcs.",
        "A sphere hovers above a circular platform. Its glow intensifies and branching blue arcs extend toward the surface below.",
        "electric-sphere",
      ),
      width: 1280,
      height: 720,
    },
    context:
      "Each study starts with a simple visual idea. The electric sphere directs energy toward a target, the tornado uses a vertical silhouette, and the water ring emphasizes circular movement. Presenting them separately makes their shape and timing easier to read.",
    contributions: [
      "Created three self-contained real-time effect studies.",
      "Explored branching, vertical and circular motion as distinct visual languages.",
      "Presented the effects as short clips that keep attention on the effect itself.",
    ],
    breakdown: [
      {
        id: "build-a-recognizable-silhouette",
        layout: "split",
        title: "Build a recognizable silhouette",
        paragraphs: [
          "The tornado concentrates its shape into a twisting column, framed by cloud forms and diagonal rainfall. The narrow base and wider upper mass distinguish it from the other studies before the viewer follows individual particles.",
        ],
        media: image(
          "single-vfx-studies",
          "detail-1",
          "Tornado, clouds and rainfall in an editor capture",
          "A twisting dark column is surrounded by cloud shapes and diagonal rain streaks. Editor gizmos remain visible.",
        ),
      },
      {
        id: "organize-movement-around-a-shape",
        layout: "wide",
        title: "Organize movement around a shape",
        paragraphs: [
          "The water study layers concentric rings with smaller scattered particles. Its central opening remains visible, giving the movement a clear circular structure.",
        ],
        media: image(
          "single-vfx-studies",
          "detail-2",
          "Blue water rings above a circular platform",
          "Concentric blue rings and scattered particles hover above the target.",
        ),
      },
      {
        id: "tornado-in-motion",
        layout: "split",
        title: "Tornado in motion",
        paragraphs: [
          "The recording shows the full moving effect, including the relationship between the column, clouds and rainfall.",
        ],
        media: {
          ...video(
            "single-vfx-studies",
            "Tornado study recording",
            "A recorded editor view of the tornado and surrounding rainfall.",
            "A dark tornado column twists beneath a cloud mass while rain moves diagonally through the scene. Editor gizmos are visible.",
            "tornado",
          ),
          width: 1280,
          height: 720,
          poster: image("single-vfx-studies", "detail-1", "Tornado study", "")
            .src,
        },
      },
      {
        id: "water-ring-in-motion",
        layout: "wide",
        title: "Water ring in motion",
        paragraphs: [
          "The short clip provides the timing information that a still frame cannot: the continuous motion of the rings and their smaller surrounding particles.",
        ],
        media: {
          ...video(
            "single-vfx-studies",
            "Water ring study recording",
            "Concentric rings and moving water particles.",
            "Glowing blue rings hover above a circular platform while small water particles move around their perimeter.",
            "water-ring",
          ),
          width: 1280,
          height: 720,
          poster: image(
            "single-vfx-studies",
            "detail-2",
            "Water ring study",
            "",
          ).src,
        },
      },
    ],
    flow: [],
    result: [
      "The studies exercise three different ways to direct attention through motion. Their small scope makes silhouette, density and timing the main subjects of the presentation.",
    ],
    credits: [
      {
        name: "Hongtao Gao",
        detail:
          "Standalone visual effect studies presented in the original portfolio.",
      },
    ],
    links: [],
  },
  {
    slug: "factory-environment",
    title: "Factory Environment",
    subtitle: "Industrial rhythm through repeated forms.",
    summary:
      "An environment modeling study built around pipework, mechanical repetition and a dark industrial atmosphere.",
    tracks: ["technical-art"],
    tier: "study",
    rank: 11,
    publication: "published",
    projectType: "Environment study",
    roles: ["Environment modeler", "Environment designer"],
    tools: ["Maya", "Substance Painter", "Lighting"],
    facts: [
      { label: "Focus", value: "Industrial environment modeling" },
      { label: "Format", value: "Student environment study" },
    ],
    scope:
      "I modeled the environment content and developed the scene layout and lighting. This study focuses on hard-surface forms and the way repeated elements organize a space.",
    version: "Selected environment renders from the original portfolio.",
    cover: image(
      "factory-environment",
      "hero",
      "Industrial pipework and a gear-covered wall",
      "A ground-level view frames tall pipework and the repeated mechanical forms behind it.",
    ),
    context:
      "The factory is built around repetition: vertical pipes, cylindrical structures and large gear silhouettes establish a dense industrial space. I used changes in scale, shadow and a small number of stronger accents to keep that repetition from becoming visually uniform.",
    contributions: [
      "Modeled the environment elements independently.",
      "Arranged hard-surface structures into a layered industrial scene.",
      "Used framing and lighting to establish depth and focal points.",
    ],
    breakdown: [
      {
        id: "a-focal-point-within-the-machinery",
        layout: "split",
        title: "A focal point within the machinery",
        paragraphs: [
          "The red door gives the eye a clear place to settle among dark pipes and brickwork. Its simple rectangle contrasts with the surrounding mechanical shapes, while the walkway leads farther into the space.",
        ],
        media: image(
          "factory-environment",
          "detail-1",
          "Red industrial door beside gears and a walkway",
          "The red door creates a distinct focal point beside the gear wall and elevated walkway.",
        ),
      },
      {
        id: "repetition-with-depth",
        layout: "wide",
        title: "Repetition with depth",
        paragraphs: [
          "The gear wall supplies a repeated background rhythm. Larger pipes and cylindrical machinery interrupt it in the foreground, separating the scene into readable layers.",
          "Multiple viewpoints show how the same modeled elements contribute to both the overall composition and smaller framed views.",
        ],
        media: image(
          "factory-environment",
          "detail-2",
          "Gear silhouettes behind factory pipes",
          "Repeated gear silhouettes sit behind pipes and cylindrical machinery.",
        ),
      },
    ],
    flow: [],
    result: [
      "The study brings modeling, material finish and composition together in a compact industrial environment. Repetition establishes the setting; contrast gives each view a focal point.",
    ],
    credits: [
      {
        name: "Hongtao Gao",
        detail:
          "Environment modeling, scene layout and presentation for this student study, as documented in the original portfolio.",
      },
    ],
    links: [],
  },
  {
    slug: "low-poly-sakura-scene",
    title: "Low Poly Sakura Scene",
    subtitle: "Simple forms, soft color and room to breathe.",
    summary:
      "A stylized valley study with faceted pink foliage, layered terrain and a calm atmospheric palette.",
    tracks: ["technical-art"],
    tier: "study",
    rank: 12,
    publication: "published",
    projectType: "Environment study",
    roles: ["Environment modeler", "Environment designer"],
    tools: ["Maya", "Color styling", "Scene composition"],
    facts: [
      { label: "Focus", value: "Stylized low-poly environment" },
      { label: "Format", value: "Student environment study" },
    ],
    scope:
      "I modeled the environment and developed its layout, color relationships and presentation. The scene explores a consistent low-poly shape language across foliage, buildings and terrain.",
    version:
      "Environment stills and a recorded scene showcase from the original portfolio.",
    cover: image(
      "low-poly-sakura-scene",
      "hero",
      "A building beneath faceted pink sakura trees",
      "The building and pink canopy anchor the layered valley composition.",
    ),
    showcase: {
      ...showcase(
        "low-poly-sakura-scene",
        "Sakura scene showcase",
        "A recorded camera pass through the stylized valley and its moving petals.",
        "The camera moves through a purple valley with faceted pink trees, pale grass and distant rock forms. Bright petals drift across foreground and background layers.",
        "demo",
      ),
      width: 1280,
      height: 720,
    },
    context:
      "This environment uses simplified geometry and a limited palette to create a softer mood than my industrial work. Pink foliage and pale grass sit against muted purple terrain, while layers of haze separate the near and distant forms.",
    contributions: [
      "Modeled the environment using a consistent low-poly shape language.",
      "Developed a soft palette and repeated shape families for scene cohesion.",
      "Composed the terrain, foliage and buildings to create depth and clear spacing.",
    ],
    breakdown: [
      {
        id: "separate-the-valley-into-layers",
        layout: "split",
        title: "Separate the valley into layers",
        paragraphs: [
          "Rock shelves, tree silhouettes and drifting petals create several scales of detail. The large terrain shapes establish depth before smaller foliage and particles add texture.",
        ],
        media: image(
          "low-poly-sakura-scene",
          "detail-1",
          "Layered rock shelves and drifting petals",
          "A showcase frame reveals separated rock shelves and bright petals moving through the valley.",
        ),
      },
      {
        id: "repeat-shapes-without-filling-every-space",
        layout: "wide",
        title: "Repeat shapes without filling every space",
        paragraphs: [
          "Faceted canopies give the trees a shared visual language. Open areas between them let the eye follow the terrain, while pale grass provides a quieter transition along the ground.",
          "The moving showcase complements the stills by showing how foreground and background forms separate as the camera travels through the scene.",
        ],
        media: image(
          "low-poly-sakura-scene",
          "detail-2",
          "Pink trees and pale grass in the valley",
          "Faceted trees and soft ground foliage frame a view through the rocky landscape.",
        ),
      },
    ],
    flow: [],
    result: [
      "The project explores how a consistent palette and simplified forms can hold a scene together. The final presentation emphasizes atmosphere, spacing and the relationship between large shapes and small moving details.",
    ],
    credits: [
      {
        name: "Hongtao Gao",
        detail:
          "Environment modeling, color direction and scene presentation for this student study, as documented in the original portfolio.",
      },
    ],
    links: [],
  },
  {
    slug: "realistic-corner",
    title: "Realistic Corner",
    subtitle: "A small space, read through its details.",
    summary:
      "An interior modeling study focused on furniture arrangement, material response and warm directional light.",
    tracks: ["technical-art"],
    tier: "study",
    rank: 13,
    publication: "published",
    projectType: "Environment study",
    roles: ["Environment modeler", "Environment designer"],
    tools: ["Maya", "Substance Painter", "Lighting"],
    facts: [
      { label: "Focus", value: "Interior modeling and materials" },
      { label: "Format", value: "Student environment study" },
    ],
    scope:
      "I modeled the furniture and supporting scene content, arranged the interior and developed its warm lighting and material presentation.",
    version:
      "An interior render and recorded walkthrough from the original portfolio. Detail images are frames from that walkthrough.",
    cover: image(
      "realistic-corner",
      "hero",
      "A furnished corner with warm lighting",
      "The full arrangement combines a chair, tables, wall art, books and plants.",
    ),
    showcase: {
      ...showcase(
        "realistic-corner",
        "Interior walkthrough",
        "A recorded camera pass moves from the full arrangement to furniture and surface details.",
        "The camera approaches a furnished corner, then examines wall art, a floor lamp, books on a round table, the timber floor and a low shelf beside a potted plant.",
        "demo",
      ),
      width: 1280,
      height: 720,
    },
    context:
      "A compact interior gives each object a visible role. I used a chair, tables, books, wall art and plants to build a readable arrangement, then used warm light to connect their surfaces and cast shadows across the floor.",
    contributions: [
      "Modeled the furniture and supporting environment content.",
      "Developed material finishes for close viewing.",
      "Composed the room and lighting to establish a warm interior mood.",
    ],
    breakdown: [
      {
        id: "let-light-describe-the-surfaces",
        layout: "split",
        title: "Let light describe the surfaces",
        paragraphs: [
          "The tabletop and timber floor provide broad surfaces for the light to cross. Plant shadows add a more detailed pattern without changing the underlying simplicity of the arrangement.",
        ],
        media: image(
          "realistic-corner",
          "detail-1",
          "Books on a table above a timber floor",
          "A close frame shows books on a small table and plant shadows across the floor.",
        ),
      },
      {
        id: "give-the-corner-a-human-scale",
        layout: "wide",
        title: "Give the corner a human scale",
        paragraphs: [
          "Books, a small shelf and the planter create detail around the chair. Their relative sizes make the corner feel furnished and usable rather than a collection of isolated props.",
          "The walkthrough moves from the complete arrangement to these close views, showing how object placement and material finish support the same scene.",
        ],
        media: image(
          "realistic-corner",
          "detail-2",
          "A low bookshelf beside a planter and chair",
          "Standing books and the nearby planter add detail at seating height.",
        ),
      },
    ],
    flow: [],
    result: [
      "The finished study connects prop modeling with the way light falls across a room. Its small scale keeps attention on composition, surface finish and the relationship between objects.",
    ],
    credits: [
      {
        name: "Hongtao Gao",
        detail:
          "Furniture and environment modeling, layout and lighting for this student study, as documented in the original portfolio.",
      },
    ],
    links: [],
  },
];
