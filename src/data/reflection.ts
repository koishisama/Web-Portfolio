// Reflection content for the degree portfolio requirements.
// Entries whose text is empty render as a visible "to write" placeholder.

export type UnitEntry = {
  name: string;
  works: { title: string; slug?: string }[];
  note: string;
};

// Units whose coursework is shown as case studies.
export const units: UnitEntry[] = [
  {
    name: "Studio Project 1",
    works: [{ title: "Rhythm Rider", slug: "rhythm-rider" }],
    note: "My first team game: all of the programming and the shader effects.",
  },
  {
    name: "Studio Project 2",
    works: [{ title: "Deinosavros", slug: "deinosavros" }],
    note: "A team card battler: menus, map and combat UI. Shown at PAX.",
  },
  {
    name: "Technical Art",
    works: [
      { title: "Procedural City", slug: "procedural-city" },
      { title: "Ink VFX", slug: "ink-vfx" },
      { title: "Oasis", slug: "oasis-environment" },
    ],
    note: "Materials and VFX in Unreal Engine, and a procedural city tool in Unity.",
  },
];

// Smaller pieces of coursework, listed briefly.
export const otherUnits: UnitEntry[] = [
  {
    name: "AR & VR",
    works: [{ title: "VR environment" }],
    note: "Modular environment and spatial interaction in VR.",
  },
  {
    name: "Immersive Environment",
    works: [{ title: "Factory Environment" }, { title: "Low Poly Sakura Scene" }],
    note: "A modular factory environment and a stylised low-poly scene.",
  },
  {
    name: "Sonics",
    works: [{ title: "Interactive audio" }],
    note: "Original recording and Unity/FMOD integration.",
  },
];

// Work made outside unit coursework.
export const beyondCoursework: UnitEntry[] = [
  {
    name: "GMTK Game Jam 2026",
    works: [{ title: "One More Second", slug: "one-more-second" }],
    note: "7 people, 72 hours: menus, dialogue, feedback, audio and integration.",
  },
  {
    name: "Personal practice",
    works: [{ title: "Archer Duel", slug: "archer-duel" }],
    note: "Self-directed: a two-player game over a local server.",
  },
];

export type SkillEntry = {
  skill: string;
  evidence: { title: string; slug: string }[];
  growth: string;
};

// One line on how each skill developed, linked to the work that shows it.
export const skillsDeveloped: SkillEntry[] = [
  {
    skill: "Interface state & player-facing flow",
    evidence: [{ title: "Deinosavros", slug: "deinosavros" }],
    growth: "Moving from a whole game in Studio Project 1 to the interface layer in Studio Project 2 taught me how UI carries game state between screens.",
  },
  {
    skill: "Gameplay feedback & timing",
    evidence: [{ title: "Rhythm Rider", slug: "rhythm-rider" }],
    growth: "My first team project tied gameplay code to shaders, so every input gets a visible response.",
  },
  {
    skill: "Editor tooling & procedural generation",
    evidence: [{ title: "Procedural City", slug: "procedural-city" }],
    growth: "Technical Art took my procedural work from generating content to building a tool around it.",
  },
  {
    skill: "Real-time VFX & materials",
    evidence: [
      { title: "Ink VFX", slug: "ink-vfx" },
      { title: "Oasis", slug: "oasis-environment" },
    ],
    growth: "Building effects from material nodes and Blueprint deepened my understanding of the engine underneath.",
  },
  {
    skill: "Networked multiplayer",
    evidence: [{ title: "Archer Duel", slug: "archer-duel" }],
    growth: "Self-taught: setting up a local server and keeping one game state consistent across two clients.",
  },
  {
    skill: "Team integration under deadline",
    evidence: [{ title: "One More Second", slug: "one-more-second" }],
    growth: "Planning, building and finishing a whole game in 72 hours, and agreeing early who owns what.",
  },
];

export type Learning = { title: string; body: string };

export const keyLearnings: Learning[] = [
  {
    title: "A team needs a plan, open communication and ownership",
    body: "Lose any one of the three and the whole game is held back.",
  },
  {
    title: "Agree on boundaries before splitting the work",
    body: "Otherwise work overlaps in some places and goes missing in others — usually found too late, at integration.",
  },
  {
    title: "Materials are the same ideas in different tools",
    body: "Unreal material nodes, Unity shaders and Shader Graph express the same techniques — a dissolve is a noise threshold in all three — so I can move effects between engines.",
  },
];

export const proudest = {
  title: "Deinosavros, our Studio Project 2 game",
  body: "We took it much further in a short time than I expected. The team worked together really well, and it earned us the chance to show the game at PAX and an IT industry showcase.",
  project: { title: "Deinosavros", slug: "deinosavros" } as
    | { title: string; slug: string }
    | undefined,
};
