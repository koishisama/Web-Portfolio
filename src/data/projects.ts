import type { PublishedProjectRecord } from "../types/project";
import { image, video } from "./media";
import { studies } from "./studies";
import { oasis } from "./oasis";

const mainProjects: PublishedProjectRecord[] = [
  {
    slug: "deinosavros",
    title: "Deinosavros",
    subtitle: "Make every decision legible.",
    summary:
      "Menu, map and combat interfaces for a team card battler. A closer look at reversible previews and deliberate confirmation.",
    tracks: ["programming"],
    tier: "featured",
    rank: 1,
    publication: "published",
    projectType: "Team project",
    roles: ["UI programmer"],
    tools: ["Unity", "C#", "UI state"],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "Menus, map & combat UI" },
    ],
    scope:
      "I programmed the menus and map interfaces, together with combat and map UI. The card-battle game, its artwork and its wider systems are a team effort.",
    version:
      "Captured from the current Unity 6000.3 project on 13 October 2026. UI events are script-driven; the video is a controlled interface demonstration, not an end-to-end gameplay test.",
    cover: image(
      "deinosavros",
      "hero",
      "Deinosavros card-sacrifice interface",
      "A decision presented with its selected card and consequence.",
    ),
    demo: {
      ...video(
        "deinosavros",
        "A card decision, from preview to confirmation",
        "Current map interface: preview, cancel, confirm and inspect the pending benefit. Controlled UI walkthrough; no audio.",
        "A scripted play session opens the offering panel, inspects a card, cancels the choice, reopens it and confirms. The pending benefit remains visible after commitment.",
      ),
      width: 1600,
      height: 900,
    },
    context:
      "A card choice is only useful when the player understands what will change. In Deinosavros, the interface has to explain a sacrifice without applying it too early. I approached the interaction as a sequence of visible states: inspection, selection, preview, confirmation and feedback. This case focuses on the boundary between reading a decision and committing it.",
    contributions: [
      "Programmed menu navigation and map interfaces.",
      "Connected card selection, sacrifice previews and confirmation feedback.",
      "Presented pending effects and departure prompts in the map flow.",
      "Implemented combat and map UI as part of the wider team project.",
    ],
    breakdown: [
      {
        title: "Preview a consequence before changing the game",
        paragraphs: [
          "Opening the panel and moving between cards must remain reversible. The preview carries the information needed to describe the choice, while the actual transaction is deferred until confirmation. Cancelling closes the interaction without turning inspection into an accidental sacrifice.",
          "This separation also gives the interface a clear responsibility: explain the current choice, expose whether it can be confirmed, and display the result only after the underlying operation succeeds.",
        ],
        media: image(
          "deinosavros",
          "detail-1",
          "Card selection and sacrifice preview",
          "The preview communicates a choice before it is committed.",
        ),
      },
      {
        title: "Select an instance, not just a card type",
        paragraphs: [
          "A deck can contain more than one copy of a card. The selected card therefore needs an instance identifier rather than a match on its display name alone. MapSacrificePreview carries that identity and a CanConfirm state so the panel can keep its controls aligned with the current selection.",
          "The confirmation handler checks that the panel is open and not busy before calling the commit operation. Controls are disabled during the transition, which guards against repeated input becoming repeated transactions.",
        ],
        media: image(
          "deinosavros",
          "detail-2",
          "Pending effect information in the map interface",
          "The result remains visible after the immediate selection step.",
        ),
      },
      {
        title: "Keep consequences visible across the flow",
        paragraphs: [
          "A successful selection is not the end of the interaction. Pending benefits and departure prompts carry context into the next decision. These states give the player a chance to understand what is active before moving on.",
          "The recorded verification work covers cancellation, duplicate card instances, repeated confirmation and different screen sizes. I use those scenarios to explain the design; the historical assertion totals are not presented as a new runtime benchmark.",
        ],
        media: image(
          "deinosavros",
          "detail-3",
          "Deinosavros map and persistent status",
          "Route choices share the interface with the player's deck and persistent status.",
        ),
      },
    ],
    flow: [
      { label: "Inspect", detail: "Read a card without changing the deck" },
      { label: "Preview", detail: "Pin an instance and show its consequence" },
      {
        label: "Confirm / cancel",
        detail: "Commit once, or leave the deck unchanged",
      },
      { label: "Feedback", detail: "Show the resulting pending state" },
    ],
    result: [
      "The useful outcome is a readable transaction: selection, consequence and commitment have separate roles. That makes invalid or repeated input easier to reason about.",
      "The same approach informs my other interface work: model the decision first, then connect presentation to explicit state changes.",
    ],
    credits: [
      {
        name: "Deinosavros team",
        detail:
          "Shared game production, artwork and systems beyond my interface contribution.",
      },
    ],
    links: [],
  },
  {
    slug: "procedural-city",
    title: "Procedural City",
    subtitle: "Generate a city. Keep the parts you love.",
    summary:
      "An Unreal editor tool with seeded rules, locked blocks and local regeneration. Built to leave room for an artist's decisions.",
    tracks: ["technical-art", "programming"],
    tier: "featured",
    rank: 2,
    publication: "published",
    projectType: "Independent study",
    roles: ["Tool developer", "Technical artist"],
    tools: ["Unreal Engine", "Python", "Blueprint", "Editor Utility Widgets"],
    facts: [
      { label: "Engine", value: "Unreal Engine" },
      { label: "Focus", value: "Procedural editor tooling" },
    ],
    scope:
      "I implemented the generation and editing workflow and integrated the environment assets. The third-party building, prop and texture sources are credited separately.",
    version:
      "Existing Unreal editor delivery recording, reused for this case. Generation uses Python, Blueprint and instanced meshes; the editor was not rerun for this presentation.",
    cover: image(
      "procedural-city",
      "hero",
      "A modular city generated in Unreal Engine",
      "An overview of the generated blocks, streets and skyline.",
    ),
    demo: video(
      "procedural-city",
      "Procedural City editor demonstration",
      "Recorded editor workflow with scripted tool commands and traffic. No audio.",
      "The demonstration shows the city tool panel, generated city variations and traffic in the Unreal editor. The visible changes are driven by actual controller commands.",
    ),
    context:
      "Procedural generation becomes more useful when an artist can keep a successful composition. I built this tool around a practical question: how can the city change without throwing away a block that already works? Seeded generation establishes a repeatable base, and block-level controls let the user refine that base incrementally.",
    contributions: [
      "Implemented seeded block generation and local rebuild operations.",
      "Built an artist-facing editor workflow with Blueprint and Editor Utility Widgets.",
      "Added block locking and separate building/detail seed offsets.",
      "Integrated modular assets and instanced mesh placement.",
    ],
    breakdown: [
      {
        title: "A repeatable starting point",
        paragraphs: [
          "The generator works from a grid, rules and seed values. Buildings and details use separate offsets so their variation can be changed independently. Instanced meshes support repeated modular elements without making each repeated piece a separate authored object.",
          "The system is an editor tool implemented through Python and Blueprint. Its purpose is to generate and refine authored city layouts; it is not presented as a native PCG Graph implementation.",
        ],
        media: image(
          "procedural-city",
          "detail-1",
          "City tool panel before a preset change",
          "Green Residential preset and lock controls in the recorded editor panel.",
        ),
      },
      {
        title: "Preserve the block that already works",
        paragraphs: [
          "Global generation skips locked blocks. This lets an artist preserve a particular skyline, landmark arrangement or neighborhood while exploring alternatives around it. A lock is meaningful only if later operations respect it.",
          "Changing grid or road dimensions would invalidate those relationships, so the tool rejects that change while blocks remain locked. This is a deliberate constraint that protects the user's existing choices.",
        ],
        media: image(
          "procedural-city",
          "detail-2",
          "City tool panel after a preset change",
          "Dense Downtown preset with one locked block reported. The panel obscures geometry, so this view demonstrates controls rather than geometric persistence.",
        ),
      },
      {
        title: "Rebuild locally, then continue editing",
        paragraphs: [
          "A local rebuild reads the saved state for the selected block. Rerolling advances the building and detail offsets rather than requiring a completely new city. The implementation groups editor changes into an undoable transaction.",
          "The saved validation work checks generation rules, editor behavior and persistence. Traffic density also exposes a performance tradeoff, so I avoid describing a single editor measurement as a guaranteed frame rate for every scene or packaged build.",
        ],
        media: image(
          "procedural-city",
          "detail-3",
          "Landmark plaza in the generated city",
          "Local composition remains an artistic decision within the procedural layout.",
        ),
      },
    ],
    flow: [
      { label: "Generate", detail: "Grid, rules and a repeatable seed" },
      { label: "Lock", detail: "Preserve selected blocks" },
      { label: "Regenerate", detail: "Change only unlocked areas" },
      { label: "Refine", detail: "Rebuild or reroll one block" },
    ],
    result: [
      "The tool supports an iterative workflow instead of a single generate-and-accept step. Repeatability and selective control make procedural output easier to art-direct.",
      "The next useful evaluation would compare iteration time across a fixed layout task. No unmeasured time saving or universal performance claim is attached to this project.",
    ],
    credits: [
      {
        name: "Poly Haven",
        detail:
          "Third-party environment resources integrated into the tool demonstration.",
        href: "https://polyhaven.com",
      },
    ],
    links: [],
  },
  {
    slug: "rhythm-rider",
    title: "Rhythm Rider",
    subtitle: "Turn a good input into a visible moment.",
    summary:
      "Gameplay programming and VFX for a three-lane rhythm runner, connecting beat-based obstacle placement with precise visual feedback.",
    tracks: ["programming", "technical-art"],
    tier: "featured",
    rank: 3,
    publication: "published",
    projectType: "Team project",
    roles: ["Gameplay programmer", "VFX artist"],
    tools: ["Unity", "C#", "URP", "Shader Graph"],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "Rhythm systems & feedback" },
    ],
    scope:
      "My work covers gameplay programming and visual effects within a team project. This case isolates beat-based placement and the Perfect/combo feedback system.",
    version:
      "The gameplay clip is existing portfolio footage; its source revision is unverified. The cyan/gold comparison is a new controlled capture from the Unity 2022.3 project, using the production feedback controller.",
    cover: image(
      "rhythm-rider",
      "hero",
      "Rhythm Rider's neon three-lane track",
      "A readable track framed by the game's neon environment.",
    ),
    demo: {
      ...video(
        "rhythm-rider",
        "Rhythm Rider gameplay",
        "Existing gameplay excerpt with original audio. The current feedback implementation is demonstrated separately below.",
        "The player moves through a neon three-lane course. Obstacles, scoring and visual feedback communicate the rhythm of the run.",
      ),
      width: 1600,
      height: 932,
    },
    context:
      "A rhythm runner needs its rules and its feedback to agree. I worked on the relationship between the song's beat structure, the placement of obstacles and the effects that acknowledge successful input. The technical challenge was to keep those responsibilities connected while giving each one a clear role.",
    contributions: [
      "Connected beat indices to obstacle timing and world-space placement.",
      "Worked on gameplay flow and feedback in the Unity project.",
      "Implemented distinct scan feedback for Perfect dodges and combo bonuses.",
      "Exposed effect controls for colour, intensity, width, duration and softness.",
    ],
    breakdown: [
      {
        title: "Translate time into distance",
        paragraphs: [
          "The obstacle generator converts a beat index into a time using seconds per beat, then turns that time into a position using the player's speed and an offset. Song duration bounds the generated sequence, while difficulty phases choose patterns.",
          "This makes spacing understandable through the same timing relationship that drives the level. The interactive diagram below illustrates that relationship. It does not claim audio-clock synchronization, latency compensation or sample-accurate input handling.",
        ],
        media: image(
          "rhythm-rider",
          "detail-1",
          "Obstacles and lane layout in Rhythm Rider",
          "Beat timing is translated into positions along the track.",
        ),
      },
      {
        title: "Give different successes different signals",
        paragraphs: [
          "A Perfect dodge and a combo bonus communicate different information. The feedback controller listens for separate gameplay events and gives them separate visual treatments: a cyan scan for the dodge and a gold scan for the bonus.",
          "The controller applies mesh-overlay feedback with a MaterialPropertyBlock. Colour, width, intensity, duration and softness can be tuned without folding presentation code into the scoring logic.",
        ],
        media: image(
          "rhythm-rider",
          "detail-2",
          "Current cyan Perfect scan on the player car",
          "Cyan Perfect feedback, captured by invoking the current production controller. Controlled effect demonstration.",
        ),
      },
      {
        title: "Treat clarity as part of the implementation",
        paragraphs: [
          "A strong effect must remain readable at game speed. Separating the two signals helps communicate both the immediate success and the larger combo state, while keeping the response attached to a specific event.",
          "This breakdown distinguishes the event-driven controller from the wider Shader Graph and environment work. It also leaves cross-machine timing behavior as a separate validation question rather than treating one successful recording as proof on every device.",
        ],
        media: image(
          "rhythm-rider",
          "detail-3",
          "Current gold combo-bonus scan on the player car",
          "Gold combo feedback, captured from the same controller and unchanged effect parameters.",
        ),
      },
      {
        title: "Compare the responses in motion",
        paragraphs: [
          "This controlled runtime clip invokes the existing Perfect and multiplier feedback methods in sequence. It demonstrates the current visual response; it does not validate the scoring or input path.",
        ],
        media: {
          ...video(
            "rhythm-rider",
            "Current Perfect and combo feedback comparison",
            "Script-triggered cyan and gold scans from the current project. No audio.",
            "The normal car appearance changes to a cyan scan and then to a gold scan. The existing production feedback methods are invoked in sequence.",
            "feedback",
          ),
          poster: image("rhythm-rider", "detail-2", "Current cyan scan", "")
            .src,
          subtitles: "/media/rhythm-rider/feedback.vtt",
        },
      },
    ],
    flow: [
      {
        label: "Beat index",
        detail: "Choose a position in the musical sequence",
      },
      { label: "Beat time", detail: "Index multiplied by seconds per beat" },
      { label: "World position", detail: "Time multiplied by player speed" },
      {
        label: "Feedback event",
        detail: "A distinct response to a successful input",
      },
    ],
    result: [
      "This project connects system design and technical art through a shared gameplay event. Placement describes the challenge; visual feedback explains the player's response.",
      "My main takeaway is to keep the source of truth in gameplay and expose a focused set of controls for presentation.",
    ],
    credits: [
      {
        name: "Rhythm Rider team",
        detail:
          "Shared game production and project assets outside the contributions described here.",
      },
    ],
    links: [],
  },
  {
    slug: "ink-vfx",
    title: "Ink VFX",
    subtitle: "Build the impact, layer by layer.",
    summary:
      "Ink-style melee, projectile and area attacks in Unreal Engine. Niagara, animated materials and character timing working together.",
    tracks: ["technical-art"],
    tier: "featured",
    rank: 4,
    publication: "published",
    projectType: "Independent study",
    roles: ["VFX artist", "Technical artist"],
    tools: ["Unreal Engine", "Niagara", "Materials", "Animation timing"],
    facts: [
      { label: "Engine", value: "Unreal Engine 5.7" },
      { label: "Focus", value: "Real-time combat effects" },
    ],
    scope:
      "I developed the ink-effect study and its integration. Character, animation and source resources are distinguished from the effects work.",
    version:
      "Fresh capture from the selected final Unreal 5.7 project on 13 October 2026. Native montage playback; transient cameras and fill lighting. Effect stills show composite layers, not isolated-layer or parameter A/B renders.",
    cover: image(
      "ink-vfx",
      "hero",
      "Ink-style attack effect in Unreal Engine",
      "A stylized attack built from motion, shape and a controlled lifetime.",
    ),
    demo: {
      ...video(
        "ink-vfx",
        "Ink attack showcase",
        "Final-project melee, projectile charge/release and area burst at normal playback speed. No audio.",
        "Native animation playback shows a melee trail, projectile charge and release, then an area burst. The projectile close-up does not show a complete unobstructed impact chain.",
      ),
      width: 1280,
      height: 720,
    },
    context:
      "The aim of this study is to make an ink-like effect read as an action. A slash needs to follow the character's motion, a projectile needs a clear direction, and an area attack needs a readable build-up and release. I combine Niagara with animated materials so the visual shape evolves with the attack rather than sitting on top of it.",
    contributions: [
      "Developed Niagara effects for melee, projectile and area attacks.",
      "Built material layers for brush marks, trails, ground shapes and charge motion.",
      "Coordinated effect timing with character animation.",
      "Organized related materials and instances for effect iteration.",
    ],
    breakdown: [
      {
        title: "Start with the motion of the attack",
        paragraphs: [
          "The melee treatment follows the active part of the swing. Its trail needs enough continuity to describe the arc, but a short enough lifetime to avoid hiding the character. The sword-slash system and its ribbon and trail materials provide separate places to shape that response.",
          "I evaluate the effect at normal playback speed before looking at isolated frames. A visually interesting still is not enough if the action loses its direction during motion.",
        ],
        media: image(
          "ink-vfx",
          "detail-1",
          "Ink melee attack",
          "The trail describes the direction and active span of the swing.",
        ),
      },
      {
        title: "Separate anticipation, travel and impact",
        paragraphs: [
          "The projectile family separates a palm charge from the moving projectile. Material assets provide charge strands, the projectile trail and splash layers, so anticipation and impact can use different shapes while keeping the same ink vocabulary.",
          "That separation gives the effect a readable rhythm: gather energy, release it, then let the result dissipate. The presentation focuses on those stages rather than attributing every visible layer to a single emitter.",
        ],
        media: image(
          "ink-vfx",
          "detail-2",
          "Ink projectile attack",
          "Charge and travel communicate different stages of the action.",
        ),
      },
      {
        title: "Make the area effect read at character scale",
        paragraphs: [
          "The area family includes bone-driven charge and an area burst. Ground materials, rings and sprite layers describe the radius and release, while the character remains the reference for scale.",
          "This case uses the selected final project as its source. Earlier control-cleanup reports describe a different version, so their parameter counts and successful checks are not carried forward as claims about this build.",
        ],
        media: image(
          "ink-vfx",
          "detail-3",
          "Ink area attack",
          "A radial release makes the area of influence visible.",
        ),
      },
    ],
    flow: [
      { label: "Anticipation", detail: "Gather shape and direct attention" },
      { label: "Motion", detail: "Follow the character or projectile" },
      { label: "Impact", detail: "State the hit or affected area" },
      { label: "Dissipation", detail: "Clear the frame for the next action" },
    ],
    result: [
      "The three attack families share a material language while keeping different silhouettes and timing. That balance makes the study useful beyond a single effect.",
      "I treat material organization and preview behavior as iteration concerns, not as evidence of a measured GPU speedup.",
    ],
    credits: [
      {
        name: "Epic Games",
        detail: "Manny character and the supplied starter scene.",
      },
      {
        name: "Mixamo",
        detail:
          "Source motions: Stable Sword Inward Slash, Standing 2H Magic Attack 02 and Standing 2H Magic Area Attack 01. My contribution is the VFX integration and timing.",
        href: "https://www.mixamo.com",
      },
    ],
    links: [],
  },
  {
    slug: "one-more-second",
    title: "One More Second",
    subtitle: "72 hours. Seven people. One last rescue.",
    summary:
      "A GMTK game jam about a firefighter with time-altering pocket watches. UI, dialogue, feedback, audio and final integration.",
    tracks: ["programming"],
    tier: "supporting",
    rank: 5,
    publication: "published",
    projectType: "Game jam",
    roles: ["Programmer", "Integration"],
    tools: ["Unity", "C#", "FMOD", "Git"],
    facts: [
      { label: "Team", value: "7 people" },
      { label: "Development", value: "72 hours" },
      { label: "Event", value: "GMTK Game Jam 2026" },
    ],
    scope:
      "I built the menus, final dialogue system, timer pickups, skill and drag feedback, integrated audio, and handled the final integration.",
    version:
      "Game jam project. Fresh menu/dialogue and tool-response captures from the current project on 13 October 2026 use scripted production handlers. Normal input and a complete rescue run were not validated by these captures.",
    cover: image(
      "one-more-second",
      "hero",
      "One More Second firefighter game",
      "Time-altering tools in a mall rescue scenario.",
    ),
    demo: {
      ...video(
        "one-more-second",
        "One More Second opening and dialogue",
        "Opening menu and dialogue excerpt from a scripted play session. No audio.",
        "The real opening menu starts the game and advances the configured dialogue into the gameplay scene. The wait for opening audio is trimmed; no soundtrack is added.",
      ),
      width: 1600,
      height: 900,
    },
    context:
      "One More Second was made by seven people in 72 hours for GMTK Game Jam 2026. The player is a firefighter in a burning mall, using pocket watches to change how objects behave. My contribution concentrated on the interfaces and integration that turn separate mechanics into an understandable playable flow.",
    contributions: [
      "Menus and the final dialogue system.",
      "Timer pickups, skill cues and drag-and-drop feedback.",
      "Audio integration and final project integration.",
    ],
    breakdown: [
      {
        title: "Connect the interaction to its response",
        paragraphs: [
          "Dragging a tool needs a readable target and a clear result. I worked on the feedback around those actions alongside menus, dialogue and timer-related UI, so the player can understand what the game expects and what their input changed.",
          "Final integration brought those pieces together with audio and the team's gameplay work. The limited schedule made the complete interaction loop the priority: enter the scene, understand an action, perform it and see its consequence.",
        ],
        media: image(
          "one-more-second",
          "detail-1",
          "One More Second opening dialogue",
          "Character portraits and progressive text reveal support the opening dialogue.",
        ),
      },
      {
        title: "A tool response in the running project",
        paragraphs: [
          "The controlled excerpt below calls the existing pickup and drag handlers. The timer disappears, the tool is unlocked and a red outline appears on the affected pipe. It isolates the response without claiming that a complete level or the normal input path has been tested.",
        ],
        media: {
          ...video(
            "one-more-second",
            "Timer pickup and tool feedback",
            "Controlled runtime handler demonstration of pickup, unlock and boost feedback. No audio.",
            "The existing pickup routine unlocks the tool. The production drag handlers apply a boost to a pipe and display its outline. Prerequisite positioning is excluded from the excerpt.",
            "tool-response",
          ),
          subtitles: "/media/one-more-second/tool-response.vtt",
          poster: image(
            "one-more-second",
            "detail-2",
            "Boost feedback on a pipe",
            "",
          ).src,
          width: 1600,
          height: 900,
        },
      },
    ],
    flow: [
      { label: "Introduce", detail: "Menus and dialogue establish the task" },
      { label: "Interact", detail: "Select, drag and use a tool" },
      { label: "Respond", detail: "Visual, timer and audio feedback" },
      { label: "Integrate", detail: "A complete playable rescue flow" },
    ],
    result: [
      "The finished jam is a useful example of collaborative delivery under a fixed deadline. My contribution was making the interfaces, feedback and audio work together in the final integrated game.",
    ],
    credits: [
      {
        name: "One More Second team",
        detail:
          "Seven-person jam team. Full release and creator credits are on itch.io.",
        href: "https://morton-mao.itch.io/one-more-second",
      },
    ],
    links: [
      {
        label: "Play on itch.io",
        href: "https://morton-mao.itch.io/one-more-second",
        kind: "play",
      },
    ],
  },
];

export const projects: PublishedProjectRecord[] = [
  ...mainProjects,
  oasis,
  ...studies,
];
export const featuredProjects = projects
  .filter((p) => p.tier === "featured")
  .sort((a, b) => a.rank - b.rank);
export function getProjectBySlug(slug: string | undefined) {
  return projects.find((p) => p.slug === slug);
}
