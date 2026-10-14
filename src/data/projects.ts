import type { PublishedProjectRecord } from "../types/project";
import { image, video, showcase } from "./media";
import { studies } from "./studies";
import { oasis } from "./oasis";

const mainProjects: PublishedProjectRecord[] = [
  {
    slug: "deinosavros",
    title: "Deinosavros",
    subtitle: "Readable decisions, from battle to the next encounter.",
    summary:
      "Combat, route choices and chance encounters in a team card battler. My contribution connects menus, map interfaces and combat UI.",
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
      "Recorded from the current Unity 6000.3 project. Production input handlers drive the demonstration; combat, resource costs, rewards and Chance resolve normally. The 76.6-second main film is one continuous sequence with original game audio. Additional chapters are separate takes at normal speed.",
    cover: image(
      "deinosavros",
      "hero",
      "Deinosavros combat with player resources, enemy states and a hand of cards",
      "The battlefield, player resources and available cards remain visible together.",
    ),
    showcase: {
      ...showcase(
        "deinosavros",
        "Deinosavros: combat, route choices and Chance",
        "One continuous encounter: battle, earned reward, route choice, Chance recovery and return to the map. Script-driven production inputs with original game audio; normal gameplay rules remain active.",
        "Cards spend elixir while timed attacks continue. Victory unlocks a card reward. The map offers reachable destinations; the selected Opportunity reveals Hidden Spring, restoring health from 181 to 200. Continue returns to the map.",
      ),
      width: 1280,
      height: 720,
      poster: image("deinosavros", "showcase-poster", "Combat in progress", "")
        .src,
      posterSrcSet: image(
        "deinosavros",
        "showcase-poster",
        "Combat in progress",
        "",
      ).srcSet,
      subtitles: "/media/deinosavros/showcase.vtt",
    },
    context:
      "Deinosavros is a team card battler that connects encounters through a branching route. Combat changes the player's resources, rewards carry forward, and map choices lead to battles, chance events or recovery. My interface work makes those changes readable across menus, the battlefield and the map. The challenge is continuity: a player should understand the current state before deciding what to do next.",
    contributions: [
      "Programmed menu navigation and map interfaces.",
      "Connected card selection, sacrifice previews and confirmation feedback.",
      "Presented pending effects and departure prompts in the map flow.",
      "Implemented combat and map UI as part of the wider team project.",
    ],
    breakdown: [
      {
        id: "combat-feedback",
        layout: "wide",
        title: "Read the battle without losing the hand",
        paragraphs: [
          "The combat interface brings player resources, enemy states and available cards into one view. A card action needs to be understood in relation to what it costs and what changes after it resolves. Health and resource displays provide that context while the hand remains available for the next decision.",
          "My responsibility is the presentation of these states. The team's combat rules and artwork supply the wider experience; showing the battlefield explains where my UI is used without claiming ownership of every system on screen. The main recording and the closeups serve different purposes: one establishes the encounter, the other makes the interface readable.",
        ],
        media: image(
          "deinosavros",
          "combat",
          "Combat resources, cards and enemy feedback",
          "The hand and status displays frame the current encounter without hiding the battlefield.",
        ),
        comparison: [
          {
            label: "Combat & reward",
            asset: {
              ...video(
                "deinosavros",
                "Combat and an earned reward",
                "The first encounter resolves through legal card plays and native damage. Original game audio.",
                "Nine legal card actions support the timed battle. After the final enemy falls, victory presents three cards and the chosen reward carries into the map.",
                "combat-and-reward",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "deinosavros",
                "showcase-poster",
                "Active combat",
                "",
              ).src,
              subtitles: "/media/deinosavros/combat-and-reward.vtt",
            },
          },
          {
            label: "A later encounter",
            asset: {
              ...video(
                "deinosavros",
                "A later battle after the offering",
                "Separate take: the next battle and its earned reward, with original audio. Normal speed; no forced result.",
                "The offering carries into another encounter. Legal card plays and the native combat loop resolve the battle before another reward selection.",
                "later-battle",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "deinosavros",
                "later-battle",
                "Next combat encounter",
                "",
              ).src,
              subtitles: "/media/deinosavros/later-battle.vtt",
            },
          },
          {
            label: "Reward interface",
            asset: image(
              "deinosavros",
              "reward",
              "Three reward cards after victory",
              "The reward screen follows an earned victory. This take selected Radiant Ward.",
            ),
          },
        ],
      },
      {
        id: "card-decisions",
        layout: "split",
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
        id: "card-identity",
        layout: "wide",
        title: "Select an instance, not just a card type",
        paragraphs: [
          "Duplicate cards make identity important. MapSacrificePreview carries the selected instance and a CanConfirm state, rather than matching on a display name alone. The handler checks the open and busy states before committing, so repeated input cannot become repeated transactions.",
        ],
        media: image(
          "deinosavros",
          "detail-2",
          "Pending effect information in the map interface",
          "The result remains visible after the immediate selection step.",
        ),
      },
      {
        id: "route-and-chance",
        layout: "split",
        title: "Carry the decision into the next encounter",
        paragraphs: [
          "The route map places destinations beside the persistent deck and player state. Node selection and travel belong to the same interaction: the interface needs to identify the destination and then carry the player into the next scene without losing context.",
          "Chance encounters introduce another reveal and consequence. Pending benefits and departure prompts keep relevant information visible before the next commitment. I describe this as interface work around the run; the chance rules and wider progression remain part of the team game.",
        ],
        media: {
          ...video(
            "deinosavros",
            "Map selection, Chance reveal and continuation",
                "A reachable route choice reveals Hidden Spring. Health recovers from 181 to 200 before returning to the map.",
            "Two reachable nodes are inspected. Selecting Opportunity enters the Chance scene. Hidden Spring restores health, and Continue carries the updated state back to the route.",
            "map-and-chance",
          ),
          width: 1280,
          height: 720,
          poster: image("deinosavros", "route", "Reachable route selection", "")
            .src,
          subtitles: "/media/deinosavros/map-and-chance.vtt",
        },
        comparison: [
          {
            label: "Route choice",
            asset: image(
              "deinosavros",
              "route",
              "Reachable map destinations",
              "Reachable route nodes remain visible alongside the deck and persistent player state.",
            ),
          },
          {
            label: "Chance result",
            asset: image(
              "deinosavros",
              "chance",
              "Hidden Spring recovery result",
              "The revealed outcome explains both the health change and the next action.",
            ),
          },
        ],
      },
      {
        id: "recorded-detail",
        layout: "wide",
        title: "Inspect, cancel, then commit",
        paragraphs: [
          "This controlled detail shows the reversible states directly. Preview and cancellation leave room to inspect; confirmation applies the selected change and keeps the resulting benefit visible.",
        ],
        comparison: [
          {
            label: "Offering into combat",
            asset: {
              ...video(
                "deinosavros",
                "Preview, cancel, confirm and enter combat",
                "A separate genuine run: inspect the offering, cancel, confirm and continue to the next battle. Original audio.",
                "The offering panel opens and previews a selected card. Cancellation leaves the choice reversible. Reopening and confirming creates a pending benefit, which is applied through the next encounter's production flow.",
                "offering-to-combat",
              ),
              width: 1280,
              height: 720,
              poster: image("deinosavros", "offering", "Offering preview", "")
                .src,
              subtitles: "/media/deinosavros/offering-to-combat.vtt",
            },
          },
          {
            label: "Isolated UI walkthrough",
            asset: {
              ...video(
                "deinosavros",
                "A card decision, from preview to confirmation",
                "Current map interface: preview, cancel, confirm and inspect the pending benefit. Controlled UI walkthrough; no audio.",
                "A scripted play session opens the offering panel, inspects a card, cancels the choice, reopens it and confirms. The pending benefit remains visible after commitment.",
              ),
              width: 1600,
              height: 900,
              poster: image(
                "deinosavros",
                "detail-1",
                "Card sacrifice preview",
                "",
              ).src,
            },
          },
        ],
      },
    ],
    flow: [
      {
        label: "Combat",
        detail: "Read resources, choose a card and observe its response",
      },
      {
        label: "Result",
        detail: "Resolve the encounter and carry rewards forward",
      },
      { label: "Route", detail: "Choose an available destination on the map" },
      { label: "Chance", detail: "Reveal an outcome and read its consequence" },
      {
        label: "Continue",
        detail: "Enter the next encounter with persistent state",
      },
    ],
    result: [
      "The interface carries a decision across different scales: a card changes a battle, a reward changes the deck, and a route choice opens another encounter. Keeping those transitions explicit helps the player understand what carried forward.",
      "My main takeaway is to separate inspection from commitment, then keep the resulting state visible. That also makes invalid or repeated input easier to reason about.",
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
      "The main film combines fresh fixed-step editor and native Play-in-Editor views with the existing tool-panel recording. The lock/rebuild chapter uses one camera and the production Python API. Temporary cameras preserve the scene's lighting and native animation timing; source assets remain unchanged.",
    cover: image(
      "procedural-city",
      "hero",
      "A modular city generated in Unreal Engine",
      "An overview of the generated blocks, streets and skyline.",
    ),
    showcase: {
      ...showcase(
        "procedural-city",
        "Procedural City: generate, preserve and refine",
        "A 42-second edit of the city, editor controls, a same-camera local rebuild and street-level composition. Scripted native captures; silent.",
        "An overview leads into residential and industrial blocks. The tool panel changes a preset and locks a block. The locked left block remains intact while the right block is rerolled. Street and plaza views show the resulting environment.",
      ),
      poster: image(
        "procedural-city",
        "showcase-poster",
        "Generated city overview",
        "",
      ).src,
      posterSrcSet: image(
        "procedural-city",
        "showcase-poster",
        "Generated city overview",
        "",
      ).srcSet,
      subtitles: "/media/procedural-city/showcase.vtt",
    },
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
        id: "a-repeatable-starting-point",
        layout: "split",
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
        id: "preserve-the-block-that-already-works",
        layout: "wide",
        title: "Preserve the block that already works",
        paragraphs: [
          "Global generation skips locked blocks. This lets an artist preserve a particular skyline, landmark arrangement or neighborhood while exploring alternatives around it. A lock is meaningful only if later operations respect it.",
          "Changing grid or road dimensions would invalidate those relationships, so the tool rejects that change while blocks remain locked. This is a deliberate constraint that protects the user's existing choices.",
          "In this same-camera capture, the left block is locked while the right block is rerolled. Comparing instance transforms and materials across all 64 blocks confirmed that only Block_01_02 changed. This checks a concrete edit operation, without turning it into a broad performance claim.",
        ],
        media: {
          ...video(
            "procedural-city",
            "A locked block beside a local rebuild",
            "The camera and scene settings stay fixed. Only the right block is rerolled; the locked left block keeps its geometry. Silent.",
            "The first view establishes two neighboring blocks. Rerolling the right block changes its building arrangement while the left block and surrounding city remain unchanged.",
            "locked-neighbor",
          ),
          poster: image(
            "procedural-city",
            "rebuild-before",
            "Before the local rebuild",
            "",
          ).src,
          subtitles: "/media/procedural-city/locked-neighbor.vtt",
        },
        comparison: [
          {
            label: "Before local rebuild",
            asset: image(
              "procedural-city",
              "rebuild-before",
              "Locked left block and neighboring block before a local rebuild",
              "Before: the central road separates locked Block_01_01 on the left from the rebuild target Block_01_02 on the right.",
            ),
          },
          {
            label: "After local rebuild",
            asset: image(
              "procedural-city",
              "rebuild-after",
              "Unchanged locked block beside the rebuilt neighboring block",
              "After: the right block's building and detail seed offsets advance from 0 to 1. The locked left block and the other 62 blocks retain their instance and material state.",
            ),
          },
        ],
      },
      {
        id: "rebuild-locally-then-continue-editing",
        layout: "split",
        title: "Rebuild locally, then continue editing",
        paragraphs: [
          "A local rebuild reads the saved state for the selected block. Rerolling advances the building and detail offsets rather than requiring a completely new city. The implementation groups editor changes into an undoable transaction.",
          "The saved validation work checks generation rules, editor behavior and persistence. Traffic density also exposes a performance tradeoff, so I avoid describing a single editor measurement as a guaranteed frame rate for every scene or packaged build.",
        ],
        media: image(
          "procedural-city",
          "plaza",
          "Landmark plaza in the generated city",
          "Local composition remains an artistic decision within the procedural layout.",
        ),
        comparison: [
          {
            label: "Street composition",
            asset: {
              ...video(
                "procedural-city",
                "Street-level composition",
                "A fixed-step camera shot in the existing Play-in-Editor scene. Silent; this view demonstrates composition rather than traffic behavior.",
                "A camera moves through the street-level environment, bringing facades, road markings and street furniture into view.",
                "street-traffic",
              ),
              poster: image(
                "procedural-city",
                "street",
                "Street-level view",
                "",
              ).src,
              subtitles: "/media/procedural-city/street-traffic.vtt",
            },
          },
          {
            label: "Plaza detail",
            asset: image(
              "procedural-city",
              "plaza",
              "Generated plaza composition",
              "An open space provides a focal point within the repeated city grid.",
            ),
          },
        ],
      },
      {
        id: "recorded-detail",
        layout: "wide",
        title: "An editing workflow at the tool panel",
        paragraphs: [
          "Preset changes, block locking and local variation share one editing workflow. The panel exposes those choices, while the unobstructed geometry comparison above shows what they preserve and change.",
        ],
        comparison: [
          {
            label: "Panel controls",
            asset: {
              ...video(
                "procedural-city",
                "Preset and lock controls",
                "A focused excerpt from the existing editor delivery recording. Production tool commands drive the visible controls. Silent.",
                "The editor panel changes the preset, protects a selected block and adjusts the surrounding generated layout.",
                "editor-controls",
              ),
              poster: image(
                "procedural-city",
                "detail-1",
                "City tool panel",
                "",
              ).src,
              subtitles: "/media/procedural-city/editor-controls.vtt",
            },
          },
          {
            label: "Earlier editor recording",
            asset: video(
              "procedural-city",
              "Procedural City editor demonstration",
              "Recorded editor workflow with scripted tool commands and traffic. No audio.",
              "The demonstration shows the city tool panel, generated city variations and traffic in the Unreal editor. The visible changes are driven by actual controller commands.",
            ),
          },
        ],
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
      "Recorded from the current Unity 2022.3 project through production movement handlers, with normal collision, judgement and scoring. The main edit contains four normal-speed excerpts from one completed run. Original music and effects are retained with a uniform 2 dB gain reduction. Earlier controlled effects footage is labeled separately.",
    cover: image(
      "rhythm-rider",
      "run",
      "Rhythm Rider's neon three-lane track",
      "A readable track framed by the game's neon environment.",
    ),
    showcase: {
      ...showcase(
        "rhythm-rider",
        "Rhythm Rider: input, feedback and the finish",
        "Four normal-speed excerpts from one successful run: earned Perfect/combo feedback, later obstacle patterns and the finish. Scripted production inputs; original game audio.",
        "Timed lane changes and jumps earn cyan Perfect feedback and a gold combo response. Explicit cuts move to the later pattern phases and finish. The existing GAME OVER results panel reports 119 Perfects, no hits and three lives remaining.",
      ),
      width: 1280,
      height: 720,
      poster: image(
        "rhythm-rider",
        "earned-perfect",
        "Earned Perfect response",
        "",
      ).src,
      posterSrcSet: image(
        "rhythm-rider",
        "earned-perfect",
        "Earned Perfect response",
        "",
      ).srcSet,
      subtitles: "/media/rhythm-rider/showcase.vtt",
    },
    context:
      "Rhythm Rider is a three-lane runner where lane changes and jumps clear obstacles along a musical track. I worked on the relationship between the song's beat structure, obstacle placement and the effects that acknowledge successful input. The challenge was to connect those responsibilities while keeping the track, the judgement and the player's next action readable at speed.",
    contributions: [
      "Connected beat indices to obstacle timing and world-space placement.",
      "Worked on gameplay flow and feedback in the Unity project.",
      "Implemented distinct scan feedback for Perfect dodges and combo bonuses.",
      "Exposed effect controls for colour, intensity, width, duration and softness.",
    ],
    breakdown: [
      {
        id: "translate-time-into-distance",
        layout: "split",
        title: "Translate time into distance",
        paragraphs: [
          "The obstacle generator converts a beat index into a time using seconds per beat, then turns that time into a position using the player's speed and an offset. Song duration bounds the generated sequence, while difficulty phases choose patterns.",
          "This makes spacing understandable through the same timing relationship that drives the level. The interactive diagram illustrates that relationship. It does not claim audio-clock synchronization, latency compensation or sample-accurate input handling.",
        ],
        media: image(
          "rhythm-rider",
          "pattern-normal",
          "Obstacles and lane layout in Rhythm Rider",
          "Beat timing is translated into positions along the track.",
        ),
        comparison: [
          {
            label: "Normal phase",
            asset: {
              ...video(
                "rhythm-rider",
                "The normal obstacle phase",
                "An excerpt after the 40-second phase change in the same completed run. Original audio; normal speed.",
                "Lane changes and jumps navigate the normal phase's obstacle combinations.",
                "normal-patterns",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "rhythm-rider",
                "pattern-normal",
                "Normal obstacle pattern",
                "",
              ).src,
              subtitles: "/media/rhythm-rider/normal-patterns.vtt",
            },
          },
          {
            label: "Dense phase",
            asset: {
              ...video(
                "rhythm-rider",
                "The later dense obstacle phase",
                "A later excerpt after the 70-second phase change. Same run, original audio and normal speed.",
                "The later phase combines lane choices and jumps through denser obstacle arrangements.",
                "dense-patterns",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "rhythm-rider",
                "pattern-dense",
                "Dense obstacle pattern",
                "",
              ).src,
              subtitles: "/media/rhythm-rider/dense-patterns.vtt",
            },
          },
          {
            label: "Earlier gameplay excerpt",
            asset: {
              ...video(
                "rhythm-rider",
                "Earlier Rhythm Rider gameplay",
                "Original portfolio footage with its original audio. The source revision is unverified; the new main film demonstrates the current project.",
                "The car moves through the earlier neon course, with obstacles and score feedback visible.",
              ),
              width: 1600,
              height: 932,
            },
          },
        ],
      },
      {
        id: "give-different-successes-different-signals",
        layout: "wide",
        title: "Give different successes different signals",
        paragraphs: [
          "A Perfect dodge and a combo bonus communicate different information. The feedback controller listens for separate gameplay events and gives them separate visual treatments: a cyan scan for the dodge and a gold scan for the bonus.",
          "The controller applies mesh-overlay feedback with a MaterialPropertyBlock. Colour, width, intensity, duration and softness can be tuned without folding presentation code into the scoring logic.",
        ],
        media: image(
          "rhythm-rider",
          "earned-perfect",
          "Cyan Perfect scan earned by a timed lane change",
          "A real movement judgement triggers the cyan scan, score response and Perfect label together.",
        ),
      },
      {
        id: "treat-clarity-as-part-of-the-implementation",
        layout: "split",
        title: "Treat clarity as part of the implementation",
        paragraphs: [
          "A strong effect must remain readable at game speed. Separating the two signals helps communicate both the immediate success and the larger combo state, while keeping the response attached to a specific event.",
          "This breakdown distinguishes the event-driven controller from the wider Shader Graph and environment work. It also leaves cross-machine timing behavior as a separate validation question rather than treating one successful recording as proof on every device.",
        ],
        media: image(
          "rhythm-rider",
          "earned-combo",
          "Gold combo scan and a 2x multiplier",
          "Five consecutive Perfect actions trigger the gold response and unlock the 2x score multiplier.",
        ),
      },
      {
        id: "compare-the-responses-in-motion",
        layout: "wide",
        title: "Compare the responses in motion",
        paragraphs: [
          "The gameplay excerpt earns both responses through the normal judgement path. The isolated effects clip makes their material changes easier to compare by invoking the existing controller methods directly; it is labeled as a controlled visual demonstration.",
        ],
        comparison: [
          {
            label: "Earned in gameplay",
            asset: {
              ...video(
                "rhythm-rider",
                "Earned Perfect and combo feedback",
                "Timed movement earns cyan Perfect feedback and the gold combo response. Original audio; normal speed.",
                "A lane change earns the first Perfect. The fifth consecutive Perfect unlocks the gold response and 2x multiplier, followed by more lane changes and jumps.",
                "earned-feedback",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "rhythm-rider",
                "earned-perfect",
                "Earned cyan Perfect",
                "",
              ).src,
              subtitles: "/media/rhythm-rider/earned-feedback.vtt",
            },
          },
          {
            label: "Isolated effect comparison",
            asset: {
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
      },
      {
        id: "recorded-detail",
        layout: "wide",
        title: "Finish the run and read the result",
        paragraphs: [
          "The finish trigger leads into the existing results screen, where score, judgement counts and remaining lives summarize the run. A separate missed-input take shows how collisions remove lives and end an unsuccessful attempt.",
        ],
        media: {
          ...video(
            "rhythm-rider",
            "The finish and results",
            "The same run reaches the authored finish. Its existing results panel is titled GAME OVER, with three lives remaining. Original audio.",
            "The car reaches the finish trigger. The source game's results panel reports 29,765 points, 119 Perfects, no hits and three lives remaining.",
            "finish",
          ),
          width: 1280,
          height: 720,
          poster: image("rhythm-rider", "results", "Run results", "").src,
          subtitles: "/media/rhythm-rider/finish.vtt",
        },
        comparison: [
          {
            label: "Result interface",
            asset: image(
              "rhythm-rider",
              "results",
              "Results after reaching the finish",
              "The game's existing panel summarizes score, elapsed time, judgement counts and remaining lives.",
            ),
          },
          {
            label: "Missed inputs",
            asset: {
              ...video(
                "rhythm-rider",
                "Missed inputs and life loss",
                "Separate take: avoidance inputs stop after the opening sequence; collisions then remove lives and end the attempt. Original audio.",
                "The car collides with obstacles. Each valid hit removes a life, and the final collision leads to the failure result.",
                "missed-input",
              ),
              width: 1280,
              height: 720,
              poster: image(
                "rhythm-rider",
                "life-loss",
                "Life loss after collision",
                "",
              ).src,
              subtitles: "/media/rhythm-rider/missed-input.vtt",
            },
          },
        ],
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
      "Captured from the selected final Unreal 5.7 project. Native montages and effect timing are preserved through fixed-step cinematic capture, with temporary cameras and a shadowless fill light. This is a visual effect study, not a collision or damage test. The earlier parameter comparison uses the same final project; temporary changes were restored without saving assets.",
    cover: image(
      "ink-vfx",
      "showcase-poster",
      "Ink-style attack effect in Unreal Engine",
      "The area burst combines an expanding ink ring with ground and airborne marks.",
    ),
    showcase: {
      ...showcase(
        "ink-vfx",
        "Ink VFX: Three attack cycles",
        "One complete melee, projectile and area cycle, cut together at their original animation speed. Silent final-project capture.",
        "A sword arc breaks into droplets. A palm charge releases a projectile across the full scene, ending in a splash that dissipates. An area attack builds into an expanding ring and layered burst, then clears. Temporary cameras and shadowless fill light improve the silhouettes; the original effects and montage timing are retained.",
      ),
      poster: image("ink-vfx", "showcase-poster", "Area burst", "").src,
      posterSrcSet: image("ink-vfx", "showcase-poster", "Area burst", "")
        .srcSet,
      subtitles: "/media/ink-vfx/showcase.vtt",
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
        id: "start-with-the-motion-of-the-attack",
        layout: "split",
        title: "Start with the motion of the attack",
        paragraphs: [
          "The melee treatment follows the active part of the swing. Its trail needs enough continuity to describe the arc, but a short enough lifetime to avoid hiding the character. The sword-slash system and its ribbon and trail materials provide separate places to shape that response.",
          "I evaluate the effect at normal playback speed before looking at isolated frames. The comparison changes TailErosion from its saved 0.78 to 0.0, revealing a subtle change in the trailing edge. Disabling OuterEdge_InkDrops isolates the ribbon and shows how the droplets break up its silhouette.",
        ],
        media: image(
          "ink-vfx",
          "melee-still",
          "Ink melee attack",
          "The trail describes the direction and active span of the swing.",
        ),
        comparison: [
          {
            label: "Melee in motion",
            asset: {
              ...video(
                "ink-vfx",
                "Melee animation and ink trail",
                "The saved attack loops at its original animation speed. Silent final-project capture.",
                "The character swings the sword, its ink arc breaks into droplets, and the trail clears during recovery. The native loop repeats for inspection.",
                "melee",
              ),
              poster: image("ink-vfx", "melee-still", "Sword arc", "").src,
              subtitles: "/media/ink-vfx/melee.vtt",
            },
          },
          {
            label: "Final: erosion 0.78",
            asset: image(
              "ink-vfx",
              "erosion-final",
              "Sword trail with TailErosion 0.78",
              "Saved TailErosion 0.78, both emitters active. Same camera and animation frame for all three captures.",
            ),
          },
          {
            label: "Erosion 0.0",
            asset: image(
              "ink-vfx",
              "erosion-zero",
              "Sword trail with TailErosion 0.0",
              "TailErosion 0.0: compare the light, trailing edge of the ribbon. Both emitters remain active.",
            ),
          },
          {
            label: "Ribbon only",
            asset: image(
              "ink-vfx",
              "ribbon-only",
              "Sword ribbon with the droplet emitter disabled",
              "TailErosion restored to 0.78. OuterEdge_InkDrops disabled through Niagara's emitter API; Sword_Blade_Trail remains active.",
            ),
          },
        ],
      },
      {
        id: "separate-anticipation-travel-and-impact",
        layout: "wide",
        title: "Separate anticipation, travel and impact",
        paragraphs: [
          "The projectile family separates a palm charge from the moving projectile. Material assets provide charge strands, the projectile trail and splash layers, so anticipation and impact can use different shapes while keeping the same ink vocabulary.",
          "That separation gives the effect a readable rhythm: gather energy, release it, then let the result dissipate. The presentation focuses on those stages rather than attributing every visible layer to a single emitter.",
        ],
        media: {
          ...video(
            "ink-vfx",
            "The complete projectile cycle",
            "One uninterrupted angle includes the charge, full flight, endpoint splash and dissipation. The native loop repeats for inspection. No audio.",
            "Ink gathers at the hand, travels across the scene, then opens into a splash at the endpoint and disappears. The visual endpoint is an authored Niagara effect; the scene does not demonstrate enemy collision or damage.",
            "projectile-wide",
          ),
          poster: image(
            "ink-vfx",
            "projectile-impact",
            "Projectile endpoint splash",
            "",
          ).src,
          subtitles: "/media/ink-vfx/projectile-wide.vtt",
        },
        comparison: [
          {
            label: "Charge",
            asset: image(
              "ink-vfx",
              "projectile-charge",
              "Ink gathering at the character's palm",
              "Anticipation gathers a compact shape before release.",
            ),
          },
          {
            label: "Flight",
            asset: image(
              "ink-vfx",
              "projectile-flight",
              "The ink projectile in flight",
              "The traveling head and trailing ink describe the direction of motion.",
            ),
          },
          {
            label: "Endpoint splash",
            asset: image(
              "ink-vfx",
              "projectile-impact",
              "Ink splash at the projectile endpoint",
              "A brief, wider silhouette marks the end of travel.",
            ),
          },
          {
            label: "Dissipated",
            asset: image(
              "ink-vfx",
              "projectile-dissipated",
              "The cleared scene after the projectile disappears",
              "The splash clears after the release, leaving room for the next action.",
            ),
          },
        ],
      },
      {
        id: "make-the-area-effect-read-at-character-scale",
        layout: "split",
        title: "Make the area effect read at character scale",
        paragraphs: [
          "The area family includes bone-driven charge and an area burst. Ground materials, rings and sprite layers describe the radius and release, while the character remains the reference for scale.",
          "Reading the burst beside the character makes its radius easier to judge. Reviewing the final scene in motion also exposes how ground shapes and airborne marks overlap, which a single isolated frame cannot explain.",
        ],
        media: image(
          "ink-vfx",
          "area-still",
          "Ink area attack",
          "A radial release makes the area of influence visible.",
        ),
        comparison: [
          {
            label: "Area attack in motion",
            asset: {
              ...video(
                "ink-vfx",
                "Area attack and recovery",
                "A complete area attack with its native animation loop. Silent final-project capture.",
                "The character gathers energy, releases an expanding ring and layered ink burst, then recovers as the effect clears.",
                "area",
              ),
              poster: image("ink-vfx", "area-still", "Area burst", "").src,
              subtitles: "/media/ink-vfx/area.vtt",
            },
          },
          {
            label: "After the burst",
            asset: image(
              "ink-vfx",
              "area-dissipated",
              "The area effect during recovery",
              "The marks disperse so the character becomes readable again.",
            ),
          },
        ],
      },
      {
        id: "recorded-detail",
        layout: "wide",
        title: "Check the charge from a second angle",
        paragraphs: [
          "The wider shot establishes the full path. A second angle helps inspect the hand and release, while the earlier close-up remains useful for comparing anticipation and the area burst. Keeping those views together makes the coverage of each camera explicit.",
        ],
        media: image(
          "ink-vfx",
          "projectile-side-still",
          "The projectile release from the side",
          "A second view brings the hand, release and splash closer to the camera.",
        ),
        comparison: [
          {
            label: "Closer side angle",
            asset: {
              ...video(
                "ink-vfx",
                "Projectile release from a second angle",
                "A separate native loop from a closer side angle. No audio.",
                "The character charges and releases ink. This closer view complements the full-trajectory view above.",
                "projectile-side",
              ),
              poster: image(
                "ink-vfx",
                "projectile-side-still",
                "Projectile side view",
                "",
              ).src,
              subtitles: "/media/ink-vfx/projectile-side.vtt",
            },
          },
          {
            label: "Earlier close-up",
            asset: {
              ...video(
                "ink-vfx",
                "Earlier attack close-up",
                "Earlier final-project close-up: melee, projectile charge/release and area burst. No audio.",
                "This earlier camera shows the hand charge and release but does not show the complete unobstructed projectile path.",
              ),
              width: 1280,
              height: 720,
            },
          },
        ],
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
      "The available films cover the opening dialogue and a controlled tool response from the current jam project. They do not show a complete rescue, scene progression or the final dialogue. The tool excerpt invokes production handlers and is separate from normal-input gameplay evidence.",
    cover: image(
      "one-more-second",
      "hero",
      "One More Second firefighter game",
      "Time-altering tools in a mall rescue scenario.",
    ),

    context:
      "One More Second was made by seven people in 72 hours for GMTK Game Jam 2026. The player is a firefighter in a burning mall, using pocket watches to change how objects behave. My contribution concentrated on the interfaces and integration that turn separate mechanics into an understandable playable flow.",
    contributions: [
      "Menus and the final dialogue system.",
      "Timer pickups, skill cues and drag-and-drop feedback.",
      "Audio integration and final project integration.",
    ],
    breakdown: [
      {
        id: "connect-the-interaction-to-its-response",
        layout: "split",
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
        id: "a-tool-response-in-the-running-project",
        layout: "wide",
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
      {
        id: "recorded-detail",
        layout: "wide",
        title: "Hand off from the menu to play",
        paragraphs: [
          "The opening establishes the rescue setting before the gameplay scene begins. The menu, portraits and progressive dialogue carry that handoff, giving the player a clear starting point for the team's time-tool mechanics.",
        ],
        media: {
          ...video(
            "one-more-second",
            "One More Second opening and dialogue",
            "Opening menu and dialogue excerpt from a scripted play session. No audio.",
            "The real opening menu starts the game and advances the configured dialogue into the gameplay scene. The wait for opening audio is trimmed; no soundtrack is added.",
          ),
          width: 1600,
          height: 900,
        },
      },
    ],
    flow: [
      { label: "Introduce", detail: "Menus and dialogue establish the task" },
      { label: "Interact", detail: "Select, drag and use a tool" },
      { label: "Respond", detail: "Visual, timer and audio feedback" },
      {
        label: "Integrate",
        detail: "UI, feedback and audio connected across the game",
      },
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
