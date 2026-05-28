import type { ProjectCategory, ProjectRecord } from "../types/project";

const createAsset = (
  title: string,
  caption: string,
  accent: string,
  overlay: string,
  eyebrow?: string,
  tags?: string[]
) => ({
  title,
  caption,
  alt: `${title} placeholder media`,
  accent,
  overlay,
  eyebrow,
  tags
});

export const projects: ProjectRecord[] = [
  {
    slug: "rhythm-rider",
    title: "Rhythm-Rider",
    category: "game",
    subtitle:
      "A Unity rhythm racing project combining gameplay systems, VFX feedback, and stylized environment direction.",
    roles: ["Programmer", "VFX Artist", "Environment Designer"],
    tools: ["Unity", "C#", "Shader Graph", "Timeline", "Post-processing"],
    projectType: "Student team project",
    heroImage: createAsset(
      "Rhythm-Rider Hero",
      "Flagship project media slot for a gameplay trailer or marquee still.",
      "#3dd9d6",
      "radial-gradient(circle at 20% 20%, rgba(61, 217, 214, 0.55), transparent 45%), linear-gradient(135deg, rgba(8, 15, 23, 0.95), rgba(10, 28, 33, 0.8))",
      "Flagship Project",
      ["Unity", "Rhythm", "Racing"]
    ),
    thumbnail: createAsset(
      "Rhythm-Rider Preview",
      "Homepage and projects index preview frame.",
      "#61f7cb",
      "linear-gradient(135deg, rgba(6, 13, 19, 1), rgba(18, 40, 46, 0.88))",
      "Featured",
      ["Programming", "VFX", "Environment"]
    ),
    summary:
      "Rhythm-Rider is the strongest anchor for the site because it demonstrates hybrid authorship across gameplay programming, VFX response, and environment design within one cohesive racing experience.",
    highlights: [
      "Designed to showcase a complete mix of technical and visual ownership.",
      "Built in Unity with system-level implementation and stylized feedback loops.",
      "Structured as the main recruiter-facing case study for the portfolio."
    ],
    gallery: [
      createAsset(
        "Gameplay Capture",
        "Reserved for in-race footage and rhythm timing feedback.",
        "#38c1f6",
        "linear-gradient(135deg, rgba(6, 18, 29, 0.96), rgba(15, 48, 69, 0.82))",
        "Gameplay"
      ),
      createAsset(
        "Effects Breakdown",
        "Reserved for boost, hit, or timing-driven effects moments.",
        "#78ffd6",
        "linear-gradient(135deg, rgba(9, 17, 21, 0.95), rgba(18, 54, 41, 0.84))",
        "VFX"
      ),
      createAsset(
        "Environment Frame",
        "Reserved for track mood, set dressing, and scene composition stills.",
        "#ffd06a",
        "linear-gradient(135deg, rgba(21, 14, 8, 0.95), rgba(57, 35, 18, 0.82))",
        "Environment"
      )
    ],
    contributions: [
      {
        title: "Programming",
        summary:
          "The case study should foreground gameplay systems, event logic, and player-facing responsiveness.",
        bullets: [
          "Gameplay implementation in Unity with C#.",
          "System ownership for core playable flow and feedback loops.",
          "Clear structure for describing rhythm timing, movement, or race-state logic."
        ]
      },
      {
        title: "VFX",
        summary:
          "The VFX column should show how effects supported speed, timing, and impact clarity.",
        bullets: [
          "Moment-based effects tied to player actions or timing cues.",
          "Readable visual feedback for boost, rhythm, and state changes.",
          "Placeholder media slots ready for close-up effect shots."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "The environment section should prove scene authorship rather than treating the setting as background only.",
        bullets: [
          "Track and scene presentation aligned with the game's tempo and identity.",
          "Visual framing for movement, readability, and energy.",
          "A clear place to discuss environment decisions once final media is added."
        ]
      }
    ],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Role", value: "Programming, VFX, Environment Design" },
      { label: "Project Type", value: "Student game project" },
      { label: "Status", value: "Media-ready case study scaffold" }
    ],
    caseStudySections: [
      {
        title: "Project Overview",
        body: [
          "This page is structured to position Rhythm-Rider as the portfolio's flagship case. It leads with clarity on what the game is, what role you held, and why the project matters for recruiting.",
          "When real assets are added, this section should become the opening elevator pitch for the project."
        ],
        bullets: [
          "Explain the game in one sentence.",
          "Describe what made the project technically and visually interesting.",
          "Set up why your hybrid role matters."
        ]
      },
      {
        title: "Systems and Features",
        body: [
          "The case study scaffold includes a dedicated section for implementation details so the page can grow into a serious recruiter-facing technical breakdown.",
          "It is already shaped to support rhythm sync, feedback systems, player state, VFX timing, and environment support."
        ],
        bullets: [
          "Gameplay systems",
          "Rhythm or timing logic",
          "Player feedback and response",
          "Environment support for readability"
        ]
      },
      {
        title: "Results and Reflection",
        body: [
          "The closing section is designed to hold lessons learned, outcomes, and what this project says about your role on a team.",
          "Once filled with real details, this becomes the strongest recruiting proof on the site."
        ]
      }
    ],
    reflection:
      "Rhythm-Rider should read as the portfolio's most complete case study, balancing technical explanation, visual polish, and clear ownership.",
    status: "ready"
  },
  {
    slug: "vr-interactive-scene",
    title: "VR Interactive Scene",
    category: "game",
    subtitle:
      "A VR-focused scene combining full environment modeling with implemented interaction beats.",
    roles: ["Environment Modeler", "Interaction Developer"],
    tools: ["Unity", "C#", "VR Interaction Toolkit", "Blender"],
    projectType: "Student interactive scene",
    heroImage: createAsset(
      "VR Scene Hero",
      "Reserved for a headset view or interaction showcase frame.",
      "#66d9ff",
      "linear-gradient(145deg, rgba(5, 14, 18, 0.98), rgba(18, 43, 51, 0.86))",
      "Interactive Scene",
      ["VR", "Interaction"]
    ),
    thumbnail: createAsset(
      "VR Scene Preview",
      "Project tile placeholder for VR interaction visuals.",
      "#7de5ff",
      "linear-gradient(135deg, rgba(8, 12, 18, 0.98), rgba(24, 44, 62, 0.86))"
    ),
    summary:
      "This project extends the game category by showing full environment authorship alongside implemented VR interaction, reinforcing technical and spatial versatility.",
    highlights: [
      "Environment modeled by one creator.",
      "Built to support interaction rather than static presentation alone.",
      "Useful bridge case between environment art and interactive implementation."
    ],
    gallery: [
      createAsset(
        "VR Interaction Shot",
        "Reserved for hand interaction or object manipulation media.",
        "#4de3ff",
        "linear-gradient(135deg, rgba(5, 18, 25, 0.96), rgba(19, 58, 72, 0.82))",
        "Interaction"
      ),
      createAsset(
        "Scene Layout",
        "Reserved for a wide environment composition frame.",
        "#7cf7d4",
        "linear-gradient(135deg, rgba(7, 16, 19, 0.95), rgba(23, 54, 45, 0.84))",
        "Environment"
      )
    ],
    contributions: [
      {
        title: "Environment Modeling",
        summary:
          "The page is prepared to emphasize full-scene authorship, asset creation, and composition decisions.",
        bullets: [
          "Modeled the environment and scene elements.",
          "Designed the scene to support immersion and interaction.",
          "Placeholder frames are ready for overview and detail shots."
        ]
      },
      {
        title: "Interaction Implementation",
        summary:
          "The scaffold makes room for technical explanation without overpowering the visual side of the project.",
        bullets: [
          "Implemented interaction logic inside Unity.",
          "Reserved a dedicated section for interaction notes.",
          "Supports future media showing gameplay or controller context."
        ]
      }
    ],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "VR interaction and environment production" },
      { label: "Project Type", value: "Student scene project" },
      { label: "Status", value: "Placeholder media active" }
    ],
    caseStudySections: [
      {
        title: "Scene Intent",
        body: [
          "This page is arranged to communicate both spatial atmosphere and interaction design, rather than treating the scene as a still environment piece."
        ]
      },
      {
        title: "Implementation Notes",
        body: [
          "A dedicated implementation section is reserved for VR interaction logic, object behavior, and user experience constraints."
        ],
        bullets: ["Input handling", "Interaction targets", "Player readability"]
      }
    ],
    reflection:
      "The VR scene page should feel like a hybrid case that connects modeling work with real interaction design.",
    status: "placeholder"
  },
  {
    slug: "factory-environment",
    title: "Factory Environment",
    category: "environment",
    subtitle:
      "A fully modeled factory scene focused on industrial mood, structural detail, and environment design decisions.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Blender", "Maya", "Substance Painter", "Lighting"],
    projectType: "Student environment assignment",
    heroImage: createAsset(
      "Factory Environment Hero",
      "Reserved for a wide industrial beauty shot.",
      "#ffc369",
      "linear-gradient(135deg, rgba(18, 10, 6, 0.98), rgba(66, 37, 14, 0.86))",
      "Environment Study",
      ["Industrial", "Modeling"]
    ),
    thumbnail: createAsset(
      "Factory Environment Preview",
      "Project tile placeholder for the factory scene.",
      "#ffad4c",
      "linear-gradient(135deg, rgba(14, 11, 8, 0.98), rgba(54, 34, 18, 0.86))"
    ),
    summary:
      "This scene is positioned as a focused environment case study that demonstrates independent modeling and world-building decisions.",
    highlights: [
      "All modeling created by one artist.",
      "Useful for showing structure, repetition control, and composition.",
      "Can be expanded with lighting, breakdown, and detail-callout media later."
    ],
    gallery: [
      createAsset(
        "Wide Factory Shot",
        "Reserved for the main environmental composition.",
        "#ffb25f",
        "linear-gradient(135deg, rgba(23, 14, 9, 0.96), rgba(64, 41, 20, 0.82))",
        "Wide Shot"
      ),
      createAsset(
        "Material Detail",
        "Reserved for close-up hard-surface or prop detail.",
        "#ffd79f",
        "linear-gradient(135deg, rgba(24, 16, 10, 0.96), rgba(78, 50, 24, 0.82))",
        "Detail"
      )
    ],
    contributions: [
      {
        title: "Modeling",
        summary:
          "The scaffold is built to showcase fully independent environment construction and asset ownership.",
        bullets: [
          "All scene assets modeled by the artist.",
          "Supports eventual breakdowns of large forms and focal props.",
          "Ready for before-and-after polish comparisons."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "The page structure makes room for explaining how layout, density, and industrial identity were shaped.",
        bullets: [
          "Scene composition and visual hierarchy.",
          "Environment elements chosen to reinforce the industrial theme.",
          "Reserved space for lighting and atmosphere commentary."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Industrial environment modeling" },
      { label: "Ownership", value: "All modeling created independently" },
      { label: "Project Type", value: "Student environment assignment" },
      { label: "Status", value: "Placeholder media active" }
    ],
    caseStudySections: [
      {
        title: "Scene Construction",
        body: [
          "This case page is meant to highlight environment structure, material rhythm, and the way repeated forms were controlled to keep the scene readable."
        ]
      },
      {
        title: "Visual Direction",
        body: [
          "The second section is reserved for discussing composition, lighting intent, and scene storytelling once final renders are inserted."
        ]
      }
    ],
    reflection:
      "The factory page should feel grounded, technical, and spatially confident, with strong emphasis on authorship.",
    status: "placeholder"
  },
  {
    slug: "low-poly-sakura-scene",
    title: "Low Poly Sakura Scene",
    category: "environment",
    subtitle:
      "A stylized environment scene built around low poly modeling, clear color composition, and calm atmosphere.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Blender", "Maya", "Color Styling", "Scene Composition"],
    projectType: "Student environment assignment",
    heroImage: createAsset(
      "Sakura Scene Hero",
      "Reserved for a wide beauty render with stylized foliage and shape language.",
      "#ff9dcf",
      "linear-gradient(135deg, rgba(19, 9, 18, 0.98), rgba(62, 24, 49, 0.84))",
      "Stylized Environment",
      ["Low Poly", "Sakura"]
    ),
    thumbnail: createAsset(
      "Sakura Scene Preview",
      "Project tile placeholder for the low poly sakura environment.",
      "#f490c7",
      "linear-gradient(135deg, rgba(17, 10, 18, 0.98), rgba(52, 23, 43, 0.86))"
    ),
    summary:
      "This environment adds range to the portfolio by balancing the industrial factory case with a stylized, more color-led scene.",
    highlights: [
      "All modeling created independently.",
      "Strong fit for showing stylized environment judgment.",
      "Useful contrast piece beside more realistic or technical work."
    ],
    gallery: [
      createAsset(
        "Sakura Overview",
        "Reserved for the main beauty render.",
        "#ff99d0",
        "linear-gradient(135deg, rgba(18, 11, 19, 0.95), rgba(71, 28, 59, 0.82))",
        "Beauty Shot"
      ),
      createAsset(
        "Shape Language Detail",
        "Reserved for foliage, prop, or composition detail.",
        "#ffd8e9",
        "linear-gradient(135deg, rgba(19, 11, 17, 0.95), rgba(77, 40, 68, 0.82))",
        "Detail"
      )
    ],
    contributions: [
      {
        title: "Stylized Modeling",
        summary:
          "The case scaffold supports a stronger art-direction conversation around simplification, silhouette, and low poly readability.",
        bullets: [
          "Scene assets modeled for a coherent stylized look.",
          "Prepared for detail callouts around shape language.",
          "Useful place to discuss restraint and cohesion."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "The layout is ready to explain how color, spacing, and atmosphere shaped the scene.",
        bullets: [
          "Soft environmental mood and pacing.",
          "Clear visual grouping and focal hierarchy.",
          "Supports final render swaps without layout change."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Stylized low poly environment" },
      { label: "Ownership", value: "All modeling created independently" },
      { label: "Project Type", value: "Student environment assignment" },
      { label: "Status", value: "Placeholder media active" }
    ],
    caseStudySections: [
      {
        title: "Stylized Direction",
        body: [
          "This page is scaffolded to describe how stylized choices were kept cohesive across props, foliage, and composition."
        ]
      },
      {
        title: "Scene Mood",
        body: [
          "A dedicated section is reserved for color balance, atmosphere, and how the final scene was presented."
        ]
      }
    ],
    reflection:
      "The sakura scene should add warmth and visual range without breaking the site's professional tone.",
    status: "placeholder"
  },
  {
    slug: "realistic-corner",
    title: "Realistic Corner",
    category: "environment",
    subtitle:
      "A realistic environment corner study focused on material finish, grounded detail, and intimate scene storytelling.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Blender", "Maya", "Substance Painter", "Lighting"],
    projectType: "Student environment assignment",
    heroImage: createAsset(
      "Realistic Corner Hero",
      "Reserved for a close, grounded beauty shot showing material treatment.",
      "#d9c49c",
      "linear-gradient(135deg, rgba(18, 14, 10, 0.98), rgba(55, 41, 25, 0.84))",
      "Realistic Study",
      ["Realism", "Detail"]
    ),
    thumbnail: createAsset(
      "Realistic Corner Preview",
      "Project tile placeholder for the realistic corner scene.",
      "#d1b58c",
      "linear-gradient(135deg, rgba(16, 12, 10, 0.98), rgba(49, 35, 22, 0.86))"
    ),
    summary:
      "This scene rounds out the environment collection with a more intimate, realism-driven case focused on finish and subtle material storytelling.",
    highlights: [
      "Good fit for showing realism and material care.",
      "Supports close-up breakdowns and lighting comparisons.",
      "Adds scale variation to the environment section."
    ],
    gallery: [
      createAsset(
        "Corner Beauty Shot",
        "Reserved for the main realistic corner render.",
        "#d5bc95",
        "linear-gradient(135deg, rgba(17, 14, 10, 0.95), rgba(57, 45, 30, 0.82))",
        "Beauty Shot"
      ),
      createAsset(
        "Surface Detail",
        "Reserved for material or prop detail callouts.",
        "#eedfc1",
        "linear-gradient(135deg, rgba(18, 15, 12, 0.95), rgba(64, 51, 37, 0.82))",
        "Detail"
      )
    ],
    contributions: [
      {
        title: "Modeling and Finish",
        summary:
          "This page is built to support a closer reading of prop detail, believable scale, and material consistency.",
        bullets: [
          "Modeled the scene and its supporting assets.",
          "Reserved space for close-up finish breakdowns.",
          "Good candidate for lighting and texture process notes."
        ]
      },
      {
        title: "Environment Direction",
        summary:
          "The layout lets the scene breathe while still giving room to explain how the corner was staged.",
        bullets: [
          "Intimate composition rather than large-scale layout.",
          "Grounded atmosphere and material storytelling.",
          "Supports future detail gallery expansion."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Realistic corner study" },
      { label: "Ownership", value: "All modeling created independently" },
      { label: "Project Type", value: "Student environment assignment" },
      { label: "Status", value: "Placeholder media active" }
    ],
    caseStudySections: [
      {
        title: "Realism Goals",
        body: [
          "This page is ready to explain what made the scene believable, including shape density, wear, and lighting treatment."
        ]
      },
      {
        title: "Presentation Notes",
        body: [
          "A second section is reserved for discussing camera choices, atmosphere, and how realism was communicated within a smaller scene."
        ]
      }
    ],
    reflection:
      "The realistic corner should feel calm, deliberate, and materially grounded inside the larger portfolio.",
    status: "placeholder"
  }
];

export const projectCategoryLabel: Record<ProjectCategory, string> = {
  game: "Game Projects",
  environment: "Environment Projects"
};

export const projectFilters = [
  { key: "all", label: "All Projects" },
  { key: "game", label: "Game Projects" },
  { key: "environment", label: "Environment Projects" }
] as const;

export type ProjectFilterKey = (typeof projectFilters)[number]["key"];

export const featuredProject = projects[0];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}
