import type { ProjectCategory, ProjectRecord, VisualAsset } from "../types/project";

const assetPath = (relativePath: string) =>
  new URL(`../../Assets/${relativePath}`, import.meta.url).href;

const createAsset = (
  config: Omit<VisualAsset, "alt"> & { alt?: string }
): VisualAsset => ({
  ...config,
  alt: config.alt ?? `${config.title} media`
});

const createImageAsset = (
  title: string,
  caption: string,
  accent: string,
  overlay: string,
  relativePath: string,
  options: Partial<VisualAsset> = {}
) =>
  createAsset({
    title,
    caption,
    accent,
    overlay,
    src: assetPath(relativePath),
    mediaType: "image",
    ...options
  });

const createVideoAsset = (
  title: string,
  caption: string,
  accent: string,
  overlay: string,
  relativePath: string,
  options: Partial<VisualAsset> = {}
) =>
  createAsset({
    title,
    caption,
    accent,
    overlay,
    src: assetPath(relativePath),
    mediaType: "video",
    controls: true,
    ...options
  });

export const projects: ProjectRecord[] = [
  {
    slug: "rhythm-rider",
    title: "Rhythm-Rider",
    category: "game",
    subtitle:
      "A Unity rhythm racing project focused on gameplay, VFX, and neon environment design.",
    roles: ["Programmer", "VFX Artist", "Environment Designer"],
    tools: ["Unity", "C#", "FMOD", "Shader Graph", "Level Design"],
    projectType: "Student team project",
    heroImage: createVideoAsset(
      "Rhythm-Rider",
      "Ambient background footage for the opening section.",
      "#3dd9d6",
      "linear-gradient(180deg, rgba(5, 10, 16, 0.12), rgba(5, 10, 16, 0.62))",
      "Rhythm Rider background.mp4",
      {
        poster: assetPath(
          "Rhythm Rider images resources/Screenshot 2026-05-28 205923.png"
        ),
        eyebrow: "Selected Project",
        tags: ["Unity", "Rhythm", "Racing"],
        autoPlay: true,
        muted: true,
        loop: false,
        controls: false,
        alt: "Rhythm-Rider opening background footage"
      }
    ),
    thumbnail: createImageAsset(
      "Rhythm-Rider",
      "A street-level frame that captures the neon identity of the project world.",
      "#61f7cb",
      "linear-gradient(180deg, rgba(4, 9, 14, 0.1), rgba(4, 9, 14, 0.7))",
      "Rhythm Rider images resources/Screenshot 2026-05-28 205923.png",
      {
        eyebrow: "Featured",
        tags: ["Programming", "VFX", "Environment"],
        alt: "Rhythm-Rider environment preview screenshot"
      }
    ),
    summary:
      "A Unity rhythm racing project combining gameplay systems, VFX, and environment design.",
    highlights: [
      "Gameplay systems built in Unity with C#.",
      "VFX for speed, timing, and damage feedback.",
      "Neon environment design for clarity and mood."
    ],
    gallery: [
      createVideoAsset(
        "Demonstration Video",
        "Gameplay footage from the current Rhythm-Rider build.",
        "#34d7ff",
        "linear-gradient(180deg, rgba(6, 14, 19, 0.06), rgba(6, 14, 19, 0.3))",
        "Rhythm Rider demonstration video2.mp4",
        {
          poster: assetPath(
            "Rhythm Rider images resources/Screenshot 2026-05-28 225208.png"
          ),
          eyebrow: "Demonstration Video",
          tags: ["Prototype", "Unity"]
        }
      ),
      createImageAsset(
        "Track Overview",
        "A clean gameplay frame that emphasizes road layout, HUD, and city signage.",
        "#53d9ff",
        "linear-gradient(180deg, rgba(6, 16, 24, 0.08), rgba(6, 16, 24, 0.42))",
        "Rhythm Rider images resources/Screenshot 2026-05-28 184834.png",
        {
          eyebrow: "Gameplay Still",
          tags: ["UI", "Track Framing"]
        }
      ),
      createImageAsset(
        "Street Composition",
        "A second gameplay still focused on the project logo, road flow, and skyline framing.",
        "#79ffe2",
        "linear-gradient(180deg, rgba(8, 12, 18, 0.08), rgba(8, 12, 18, 0.5))",
        "Rhythm Rider images resources/Screenshot 2026-05-28 184852.png",
        {
          eyebrow: "Environment"
        }
      ),
        createImageAsset(
          "City Identity Shot",
          "A wider environment-focused shot showing the visual language of the track and surrounding buildings.",
        "#d2a0ff",
        "linear-gradient(180deg, rgba(12, 8, 18, 0.08), rgba(12, 8, 18, 0.46))",
        "Rhythm Rider images resources/Screenshot 2026-05-28 205923.png",
          {
            eyebrow: "World Building"
          }
        ),
        createImageAsset(
          "Neon Track View",
          "A new gameplay frame showing the project from another racing angle.",
          "#5de6ff",
          "linear-gradient(180deg, rgba(6, 14, 24, 0.08), rgba(6, 14, 24, 0.42))",
          "Rhythm Rider images resources/Screenshot 2026-05-28 225108.png",
          {
            eyebrow: "Gameplay"
          }
        ),
        createImageAsset(
          "City Lane Shot",
          "A closer street-level frame with more emphasis on the road and surrounding signs.",
          "#7bffe0",
          "linear-gradient(180deg, rgba(7, 14, 18, 0.08), rgba(7, 14, 18, 0.42))",
          "Rhythm Rider images resources/Screenshot 2026-05-28 225154.png",
          {
            eyebrow: "Street View"
          }
        ),
        createImageAsset(
          "Gameplay Environment Frame",
          "A new still focused on track atmosphere, lighting, and environment density.",
          "#8fd4ff",
          "linear-gradient(180deg, rgba(7, 12, 18, 0.08), rgba(7, 12, 18, 0.42))",
          "Rhythm Rider images resources/Screenshot 2026-05-28 225208.png",
          {
            eyebrow: "Environment"
          }
        )
      ],
    contributions: [
      {
        title: "Programming",
        summary:
          "Focused on gameplay flow and player feedback.",
        bullets: [
          "Implemented gameplay logic in Unity with C#.",
          "Built the main rhythm racing flow.",
          "Connected movement, score, and timing feedback."
        ]
      },
      {
        title: "VFX",
        summary:
          "Focused on atmosphere and gameplay feedback.",
        bullets: [
          "Post-processing and a rain system for atmosphere.",
          "Hit shake and a red screen border for damage feedback.",
          "Car trails and visible wind streaks for speed."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "Focused on a readable neon track space.",
        bullets: [
          "Designed a neon city setting for the track.",
          "Used layout and signage to guide attention.",
          "Balanced atmosphere with gameplay readability."
        ]
      }
    ],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "Rhythm racing gameplay and VFX feedback" },
      { label: "Role", value: "Programming, VFX, and environment design" },
      { label: "Media", value: "Gameplay video and environment screenshots" }
    ],
    caseStudySections: [
      {
        title: "Project Overview",
        body: [
          "Rhythm-Rider is a Unity rhythm racing project.",
          "My role covered programming, VFX, and environment design."
        ],
        bullets: [
          "Rhythm racing concept",
          "Programming, VFX, and environment work",
          "Student team project"
        ]
      },
      {
        title: "Systems and Feedback",
        body: [
          "The project is built around timing, movement, and feedback.",
          "The media shows how gameplay, HUD, and effects work together."
        ],
        bullets: [
          "Gameplay flow",
          "Timing and response logic",
          "Visual feedback connected to player state"
        ]
      },
      {
        title: "Visual Direction and Effects",
        body: [
          "The environment and effects were designed to stay energetic and readable.",
          "Lighting, signage, and road framing support the overall feel of the track."
        ]
      }
    ],
    reflection:
      "This project brings gameplay, VFX, and environment work together in one playable piece.",
    status: "ready"
  },
  {
    slug: "single-vfx-studies",
    title: "Single VFX Studies",
    category: "vfx",
    subtitle:
      "A focused set of standalone effect clips exploring timing, motion, and readable real-time visual impact.",
    roles: ["VFX Artist"],
    tools: ["Unity", "Shader Graph", "Post-processing", "Timing Studies"],
    projectType: "Standalone VFX studies",
    heroImage: createVideoAsset(
      "Storm VFX",
      "A standalone effect clip used to introduce the VFX studies section.",
      "#7fd3ff",
      "linear-gradient(180deg, rgba(5, 12, 18, 0.12), rgba(5, 12, 18, 0.62))",
      "Single VFXs/storm.mp4",
      {
        eyebrow: "VFX Studies",
        tags: ["Storm", "Timing"],
        autoPlay: true,
        muted: true,
        loop: true,
        controls: false,
        alt: "Standalone storm visual effect clip"
      }
    ),
    thumbnail: createVideoAsset(
      "Electric Sphere",
      "A short looping VFX study.",
      "#86f4e0",
      "linear-gradient(180deg, rgba(7, 14, 14, 0.12), rgba(7, 14, 14, 0.62))",
      "Single VFXs/Lighting Ball.mp4",
      {
        eyebrow: "VFX",
        tags: ["Lighting", "Effects"],
        autoPlay: true,
        muted: true,
        loop: true,
        controls: false,
          alt: "Lighting ball visual effect preview"
        }
      ),
    summary:
      "A set of short real-time effect studies focused on timing, motion, and impact.",
    highlights: [
      "Short studies built around clear effect ideas.",
      "Focused on motion, energy, and visual timing.",
      "Presented as quick looping clips."
    ],
      gallery: [
        createVideoAsset(
          "Electric Sphere",
          "An energy sphere that fires lightning toward a target.",
          "#86f4e0",
          "linear-gradient(180deg, rgba(7, 14, 14, 0.06), rgba(7, 14, 14, 0.3))",
          "Single VFXs/Lighting Ball.mp4",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            controls: false
          }
        ),
        createVideoAsset(
          "GPU Tornado",
          "A tornado effect simulated with GPU particles.",
          "#7fd3ff",
          "linear-gradient(180deg, rgba(5, 12, 18, 0.06), rgba(5, 12, 18, 0.3))",
          "Single VFXs/storm.mp4",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            controls: false
          }
        ),
        createVideoAsset(
          "Layered Water Ring",
          "A composite water ring built from stacked effects.",
          "#8ff9ff",
          "linear-gradient(180deg, rgba(7, 13, 18, 0.06), rgba(7, 13, 18, 0.3))",
          "Single VFXs/Water Ring effect.mp4",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            controls: false
          }
        )
      ],
    contributions: [
      {
        title: "Standalone Effect Design",
        summary:
          "Focused effect studies presented outside a full game scene.",
        bullets: [
          "Built as self-contained visual studies.",
          "Centered on clarity, motion, and readable timing.",
          "Useful for showing VFX range as its own discipline."
        ]
      },
      {
        title: "Visual Language",
        summary:
          "Each study is built around a direct visual idea and readable motion.",
        bullets: [
          "Explored lighting-driven and energy-driven forms.",
          "Used compact clips to foreground the effect itself.",
          "Separated these studies from other projects to keep each section clear."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Standalone real-time visual effect studies" },
      { label: "Role", value: "VFX artist" },
      { label: "Format", value: "Short effect clips" },
      { label: "Media", value: "Three standalone VFX videos" }
    ],
    caseStudySections: [
      {
        title: "Study Focus",
        body: [
          "Each clip isolates one effect idea and keeps the presentation short and direct."
        ]
      },
      {
        title: "Effect Focus",
        body: [
          "The studies look at lighting behavior, storm energy, and circular motion in real time."
        ],
        bullets: ["Timing", "Impact", "Readable motion"]
      }
    ],
    reflection:
      "These clips focus on timing, shape, and visual clarity.",
    status: "ready"
  },
  {
    slug: "ar-interactive-scene",
    title: "AR Interactive Scene",
    category: "game",
    subtitle:
      "An interactive AR scene built around a futuristic gate, a hidden ancient treasure, and environment storytelling.",
    roles: ["Environment Modeler", "Interaction Developer"],
    tools: ["Unity", "C#", "AR Interaction", "Maya"],
    projectType: "Student interactive scene",
    heroImage: createImageAsset(
      "AR Interactive Scene",
      "A scene capture focused on the gate, interactive space, and overall atmosphere.",
      "#66d9ff",
      "linear-gradient(180deg, rgba(6, 13, 18, 0.12), rgba(6, 13, 18, 0.62))",
      "AR&VR resources/Screenshot 2026-04-26 225435.png",
      {
        eyebrow: "Interactive Scene",
        tags: ["AR", "Environment"],
        alt: "AR interactive scene screenshot"
      }
    ),
    thumbnail: createImageAsset(
      "AR Interactive Scene",
      "A frame from the AR environment and interaction project.",
      "#7de5ff",
      "linear-gradient(180deg, rgba(8, 12, 18, 0.08), rgba(8, 12, 18, 0.58))",
      "AR&VR resources/Screenshot 2026-04-26 225435.png",
      {
        eyebrow: "AR",
        tags: ["Interaction", "Modeling"]
      }
    ),
    summary:
      "An interactive AR scene combining environment modeling with a futuristic gate and hidden ancient treasure.",
    highlights: [
      "Environment content modeled for an interactive AR setup.",
      "Built around a futuristic gate and a hidden ancient treasure.",
      "Focused on readable interaction and scene presentation."
    ],
    gallery: [
      createVideoAsset(
        "Demonstration Video",
        "A short video showing AR interaction, the gate, and the hidden treasure setup.",
        "#4de3ff",
        "linear-gradient(180deg, rgba(5, 15, 22, 0.06), rgba(5, 15, 22, 0.3))",
        "AR scene demonstration .mp4",
        {
          poster: assetPath("AR&VR resources/Screenshot 2026-04-26 225435.png"),
          eyebrow: "Demonstration Video",
          tags: ["Interaction", "AR"]
        }
      ),
      createImageAsset(
        "Wide Scene View",
        "A shot focused on the overall space and mood of the scene.",
        "#7cf7d4",
        "linear-gradient(180deg, rgba(6, 15, 16, 0.08), rgba(6, 15, 16, 0.42))",
        "AR&VR resources/Screenshot 2026-04-26 143500.png",
        {
          eyebrow: "Environment"
        }
      ),
      createImageAsset(
        "Gate Detail",
        "A closer frame focused on the main interactive structure in the scene.",
        "#8ae1ff",
        "linear-gradient(180deg, rgba(5, 13, 19, 0.08), rgba(5, 13, 19, 0.42))",
        "AR&VR resources/Screenshot 2026-04-26 144522.png",
        {
          eyebrow: "Detail"
        }
      ),
      createImageAsset(
        "Treasure Scene Frame",
        "A supporting shot showing another angle of the interactive space.",
        "#6ed6ff",
        "linear-gradient(180deg, rgba(7, 14, 18, 0.08), rgba(7, 14, 18, 0.42))",
        "AR&VR resources/Screenshot 2026-04-26 224224.png",
        {
          eyebrow: "Process"
        }
      ),
      createImageAsset(
        "Treasure Focus",
        "A closer scene frame that helps show the treasure and surrounding detail.",
        "#9df6e6",
        "linear-gradient(180deg, rgba(6, 16, 18, 0.08), rgba(6, 16, 18, 0.45))",
        "AR&VR resources/Screenshot 2026-04-26 225435.png",
        {
          eyebrow: "Treasure"
        }
      )
    ],
    contributions: [
      {
        title: "Environment Modeling",
        summary:
          "Focused on building a complete AR scene with clear visual focal points.",
        bullets: [
          "Modeled the gate, treasure, and core environment pieces.",
          "Used contrast between futuristic design and ancient treasure to shape the scene.",
          "Built the layout to keep key interactive elements readable."
        ]
      },
      {
        title: "Interaction Implementation",
        summary:
          "Focused on object-based interaction and scene response in AR.",
        bullets: [
          "Implemented interaction logic inside Unity.",
          "Built the scene around discovery of the gate and the hidden treasure.",
          "Kept the interactive flow clear and easy to follow."
        ]
      }
    ],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "AR interaction and environmental storytelling" },
      { label: "Role", value: "Modeling and interaction implementation" },
      { label: "Media", value: "Demonstration video and scene screenshots" }
    ],
    caseStudySections: [
      {
        title: "Scene Intent",
        body: [
          "This project combines environment work with interactive AR presentation.",
          "The scene is built around a futuristic gate that hides an ancient treasure."
        ]
      },
      {
        title: "Implementation Notes",
        body: [
          "The project focuses on readable AR interaction, key object emphasis, and scene clarity."
        ],
        bullets: ["Gate interaction", "Treasure reveal", "Scene readability"]
      }
    ],
    reflection:
      "The project combines AR interaction with a modeled scene and a simple discovery-focused setup.",
    status: "ready"
  },
  {
    slug: "vr-abandoned-mine-scene",
    title: "VR Abandoned Mine Scene",
    category: "game",
    subtitle:
      "A VR cave and abandoned mine scene built around environmental mood, player interaction, and close-range exploration.",
    roles: ["Environment Modeler", "Environment Designer", "Interaction Developer"],
    tools: ["Unity", "C#", "VR Interaction", "Maya"],
    projectType: "Student interactive scene",
    heroImage: createVideoAsset(
      "VR Abandoned Mine Scene",
      "A looping cave view used to introduce the abandoned mine scene.",
      "#77c6ff",
      "linear-gradient(180deg, rgba(5, 11, 18, 0.12), rgba(5, 11, 18, 0.64))",
      "VR Scene/Cave VR scene2.mp4",
      {
        eyebrow: "Interactive Scene",
        tags: ["VR", "Mine"],
        autoPlay: true,
        muted: true,
        loop: true,
        controls: false,
        alt: "VR abandoned mine looping cave preview"
      }
    ),
    thumbnail: createVideoAsset(
      "VR Abandoned Mine Scene",
      "A looping project preview from the cave and mine environment.",
      "#8be0d2",
      "linear-gradient(180deg, rgba(6, 13, 15, 0.08), rgba(6, 13, 15, 0.58))",
      "VR Scene/Cave VR scene3.mp4",
      {
        eyebrow: "VR",
        tags: ["Interaction", "Environment"],
        autoPlay: true,
        muted: true,
        loop: true,
        controls: false,
        alt: "VR abandoned mine project preview"
      }
    ),
    summary:
      "A VR cave and abandoned mine scene focused on environmental atmosphere and object interaction.",
    highlights: [
      "A cave and abandoned mine environment built for VR exploration.",
      "Interactive scene elements designed for close player engagement.",
      "Short loop clips and longer walkthrough footage for presentation."
    ],
    gallery: [
      createVideoAsset(
        "Demonstration Video",
        "A full demonstration of the cave scene, mine atmosphere, and player interaction.",
        "#4bd8ff",
        "linear-gradient(180deg, rgba(6, 12, 20, 0.06), rgba(6, 12, 20, 0.3))",
        "VR Scene/Cave VR scene.mp4",
        {
          eyebrow: "Demonstration Video",
          tags: ["VR", "Interaction"]
        }
      ),
      createVideoAsset(
        "Walkthrough Video",
        "A second pass through the space showing more of the layout and interaction flow.",
        "#80d0ff",
        "linear-gradient(180deg, rgba(6, 12, 20, 0.06), rgba(6, 12, 20, 0.3))",
        "VR Scene/Cave VR scene1.mp4",
        {
          eyebrow: "Walkthrough Video",
          tags: ["Environment", "Exploration"]
        }
      ),
      createVideoAsset(
        "Mine Prop Interaction",
        "A short looping clip focused on close interaction with scene objects.",
        "#9ff0da",
        "linear-gradient(180deg, rgba(7, 14, 16, 0.06), rgba(7, 14, 16, 0.3))",
        "VR Scene/Cave VR scene2.mp4",
        {
          eyebrow: "Interaction Clip",
          autoPlay: true,
          muted: true,
          loop: true,
          controls: false
        }
      ),
      createVideoAsset(
        "Cave Space Preview",
        "A short looping clip showing the cave layout and atmosphere in motion.",
        "#7eb9ff",
        "linear-gradient(180deg, rgba(6, 12, 19, 0.06), rgba(6, 12, 19, 0.3))",
        "VR Scene/Cave VR scene3.mp4",
        {
          eyebrow: "Environment Clip",
          autoPlay: true,
          muted: true,
          loop: true,
          controls: false
        }
      ),
      createVideoAsset(
        "Abandoned Mine Detail",
        "A short looping clip focused on another part of the mine environment.",
        "#8cd9c0",
        "linear-gradient(180deg, rgba(7, 13, 15, 0.06), rgba(7, 13, 15, 0.3))",
        "VR Scene/Cave VR scene4.mp4",
        {
          eyebrow: "Detail Clip",
          autoPlay: true,
          muted: true,
          loop: true,
          controls: false
        }
      )
    ],
    contributions: [
      {
        title: "Environment Modeling",
        summary:
          "Focused on building the cave and abandoned mine space for VR exploration.",
        bullets: [
          "Modeled the cave and mine environment content for an explorable VR scene.",
          "Used props, structure, and spacing to support the abandoned mine mood.",
          "Built the environment to hold up during close-range player movement."
        ]
      },
      {
        title: "Interaction Implementation",
        summary:
          "Focused on object interaction and player response inside the scene.",
        bullets: [
          "Implemented interactive scene elements in Unity with C#.",
          "Designed the scene so players can engage with multiple objects in the environment.",
          "Used interaction to make the cave feel more active and discoverable."
        ]
      }
    ],
    facts: [
      { label: "Engine", value: "Unity" },
      { label: "Focus", value: "VR interaction and abandoned mine atmosphere" },
      { label: "Role", value: "Modeling, design, and interaction implementation" },
      { label: "Media", value: "Demonstration videos and looping clips" }
    ],
    caseStudySections: [
      {
        title: "Scene Intent",
        body: [
          "This project is built as a VR cave and abandoned mine scene with a focus on mood and exploration.",
          "The environment is designed to feel worn, enclosed, and interactive at player scale."
        ]
      },
      {
        title: "Interaction Notes",
        body: [
          "The scene allows players to interact with multiple objects throughout the environment.",
          "The recorded clips show both full-scene walkthroughs and shorter moments of interaction."
        ],
        bullets: ["Object interaction", "Close-range exploration", "Environmental storytelling"]
      }
    ],
    reflection:
      "The project combines cave environment work with VR interaction and short presentation clips.",
    status: "ready"
  },
  {
    slug: "factory-environment",
    title: "Factory Environment",
    category: "environment",
    subtitle:
      "An industrial environment study centered on full-scene modeling, mechanical repetition, and moody lighting.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Maya", "Substance Painter", "Lighting"],
    projectType: "Student environment assignment",
    heroImage: createImageAsset(
      "Factory Environment",
      "A close environmental frame with strong material contrast and industrial mood.",
      "#ffc369",
      "linear-gradient(180deg, rgba(16, 10, 7, 0.12), rgba(16, 10, 7, 0.68))",
      "Factory Enviroment image resources/Screenshot 2026-05-28 191039.png",
      {
        eyebrow: "Environment Study",
        tags: ["Industrial", "Modeling"],
        alt: "Factory environment industrial scene screenshot"
      }
    ),
    thumbnail: createImageAsset(
      "Factory Environment",
      "A frame from the industrial environment study.",
      "#ffad4c",
      "linear-gradient(180deg, rgba(16, 10, 7, 0.08), rgba(16, 10, 7, 0.6))",
      "Factory Enviroment image resources/Screenshot 2026-05-28 191022.png",
      {
        eyebrow: "Industrial"
      }
    ),
    summary:
      "An industrial environment study focused on modeling, structure, and lighting.",
    highlights: [
      "Built from self-modeled environment content.",
      "Focused on hard-surface repetition and industrial form.",
      "Uses lighting contrast to shape mood and depth."
    ],
    gallery: [
      createImageAsset(
        "Red Door Composition",
        "A strong composition shot that pairs close industrial detail with depth into the wider space.",
        "#ffb25f",
        "linear-gradient(180deg, rgba(18, 11, 7, 0.08), rgba(18, 11, 7, 0.42))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 191039.png",
        {
          eyebrow: "Main View"
        }
      ),
      createImageAsset(
        "Gear Wall Detail",
        "A darker frame that focuses on the repeated mechanical silhouette language of the scene.",
        "#ffc481",
        "linear-gradient(180deg, rgba(16, 11, 8, 0.08), rgba(16, 11, 8, 0.46))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 191058.png",
        {
          eyebrow: "Detail"
        }
      ),
      createImageAsset(
        "Wide Factory View",
        "A wider angle used to show scale, composition, and environmental density.",
        "#e3a95f",
        "linear-gradient(180deg, rgba(18, 12, 8, 0.08), rgba(18, 12, 8, 0.42))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 190913.png",
        {
          eyebrow: "Wide View"
        }
      ),
      createImageAsset(
        "Pipe and Structure Frame",
        "A frame that highlights larger industrial shapes and the scene's vertical structure.",
        "#e1b16c",
        "linear-gradient(180deg, rgba(18, 12, 8, 0.08), rgba(18, 12, 8, 0.42))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 191022.png",
        {
          eyebrow: "Structure"
        }
      ),
      createImageAsset(
        "Secondary Environment Angle",
        "A supporting shot used to broaden the scene presentation beyond one focal area.",
        "#f3bb79",
        "linear-gradient(180deg, rgba(18, 12, 8, 0.08), rgba(18, 12, 8, 0.42))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 191046.png",
        {
          eyebrow: "Alternate Angle"
        }
      ),
      createImageAsset(
        "Industrial Layout View",
        "A broad environmental shot showing the composition of pipes, walls, and mechanical rhythm.",
        "#f0ca90",
        "linear-gradient(180deg, rgba(18, 12, 8, 0.08), rgba(18, 12, 8, 0.42))",
        "Factory Enviroment image resources/Screenshot 2026-05-28 191120.png",
        {
          eyebrow: "Layout"
        }
      )
    ],
    contributions: [
      {
        title: "Modeling",
        summary:
          "Focused on structure, repetition, and hard-surface scene building.",
        bullets: [
          "Modeled the scene elements independently.",
          "Used hard-surface repetition and density to define the industrial identity.",
          "Focused on environmental form and believable scene construction."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "Focused on layout, lighting, and clear focal points.",
        bullets: [
          "Built visual hierarchy through framing and shadow.",
          "Used composition to guide the eye through the scene.",
          "Balanced heavy industrial detail with readable focal points."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Industrial modeling and atmosphere" },
      { label: "Ownership", value: "All environment content modeled independently" },
      { label: "Project Type", value: "Student environment study" },
      { label: "Media", value: "Multiple environment renders" }
    ],
    caseStudySections: [
      {
        title: "Scene Construction",
        body: [
          "This scene focuses on repetition, structure, and material contrast.",
          "Multiple views help show the full space instead of a single hero render."
        ]
      },
      {
        title: "Lighting and Mood",
        body: [
          "The darker industrial palette keeps the scene grounded and mechanical.",
          "Lighting is used to support texture and large-form readability."
        ]
      }
    ],
    reflection:
      "The project focuses on hard-surface modeling, repetition, and atmosphere.",
    status: "ready"
  },
  {
    slug: "low-poly-sakura-scene",
    title: "Low Poly Sakura Scene",
    category: "environment",
    subtitle:
      "A stylized sakura environment built around low poly forms, soft color atmosphere, and calm spatial composition.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Maya", "Color Styling", "Scene Composition"],
    projectType: "Student environment assignment",
    heroImage: createImageAsset(
      "Low Poly Sakura Scene",
      "A wide atmospheric frame that establishes the low poly sakura world and its color palette.",
      "#ff9dcf",
      "linear-gradient(180deg, rgba(20, 10, 19, 0.12), rgba(20, 10, 19, 0.62))",
      "Sakura scene image resources/Screenshot 2025-11-14 180725.png",
      {
        eyebrow: "Stylized Environment",
        tags: ["Low Poly", "Sakura"],
        alt: "Low poly sakura environment screenshot"
      }
    ),
    thumbnail: createImageAsset(
      "Low Poly Sakura Scene",
      "A softer pink frame for the stylized environment project tile.",
      "#f490c7",
      "linear-gradient(180deg, rgba(18, 10, 18, 0.08), rgba(18, 10, 18, 0.58))",
      "Sakura scene image resources/Screenshot 2025-09-23 184239.png",
      {
        eyebrow: "Stylized"
      }
    ),
    summary:
      "A low poly sakura scene focused on stylized shapes, color, and atmosphere.",
    highlights: [
      "Built with a simple low poly shape language.",
      "Focused on soft color and calm composition.",
      "Presented through both stills and scene footage."
    ],
    gallery: [
      createVideoAsset(
        "Sakura Showcase",
        "A recorded scene showcase used to present the environment in motion.",
        "#ff9dcf",
        "linear-gradient(180deg, rgba(18, 10, 18, 0.06), rgba(18, 10, 18, 0.3))",
        "Sakura scene showcase.mp4",
        {
          poster: assetPath(
            "Sakura scene image resources/Screenshot 2025-11-14 180725.png"
          ),
          eyebrow: "Video",
          tags: ["Showcase", "Environment"]
        }
      ),
      createVideoAsset(
        "Interactive Walkthrough",
        "A second clip that gives the sakura scene a more lived-in, exploratory presentation.",
        "#f8b7df",
        "linear-gradient(180deg, rgba(18, 10, 18, 0.06), rgba(18, 10, 18, 0.3))",
        "Sakura scene interaction demonstration.mp4",
        {
          poster: assetPath(
            "Sakura scene image resources/Screenshot 2025-09-23 184239.png"
          ),
          eyebrow: "Walkthrough",
          tags: ["Atmosphere", "Scene Motion"]
        }
      ),
      createImageAsset(
        "Wide Sakura View",
        "A broad render that captures the overall shape language and environment pacing.",
        "#ffb6de",
        "linear-gradient(180deg, rgba(19, 11, 17, 0.08), rgba(19, 11, 17, 0.42))",
        "Sakura scene image resources/Screenshot 2025-11-14 180725.png",
        {
          eyebrow: "Wide View"
        }
      ),
      createImageAsset(
        "Petal Field Composition",
        "A brighter scene still that highlights the stylized foliage and color grouping.",
        "#ffd7ef",
        "linear-gradient(180deg, rgba(19, 11, 17, 0.08), rgba(19, 11, 17, 0.42))",
        "Sakura scene image resources/Screenshot 2025-09-23 184239.png",
        {
          eyebrow: "Color Study"
        }
      )
    ],
    contributions: [
      {
        title: "Stylized Modeling",
        summary:
          "Focused on simplified forms and a consistent low poly language.",
        bullets: [
          "Modeled the environment with a controlled low poly language.",
          "Used repeated shape families to keep the world cohesive.",
          "Balanced softness and readability across foliage, buildings, and terrain."
        ]
      },
      {
        title: "Environment Design",
        summary:
          "Focused on color harmony, pacing, and atmosphere.",
        bullets: [
          "Designed the scene around soft color and gentle composition.",
          "Used environmental spacing to keep the world readable.",
          "Presented the project through both stills and motion clips."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Stylized low poly environment design" },
      { label: "Ownership", value: "All environment content modeled independently" },
      { label: "Project Type", value: "Student environment study" },
      { label: "Media", value: "Scene videos and rendered stills" }
    ],
    caseStudySections: [
      {
        title: "Stylized Direction",
        body: [
          "This scene uses lighter shapes, softer palette choices, and a calmer mood.",
          "It contrasts with the more industrial and realistic environment work."
        ]
      },
      {
        title: "Atmosphere and Presentation",
        body: [
          "The selected renders and videos show both still composition and scene motion."
        ]
      }
    ],
    reflection:
      "The scene focuses on soft color, simple forms, and calm composition.",
    status: "ready"
  },
  {
    slug: "realistic-corner",
    title: "Realistic Corner",
    category: "environment",
    subtitle:
      "A realistic interior corner study focused on furniture composition, material finish, and warm natural lighting.",
    roles: ["Environment Modeler", "Environment Designer"],
    tools: ["Maya", "Substance Painter", "Lighting"],
    projectType: "Student environment assignment",
    heroImage: createImageAsset(
      "Realistic Corner",
      "A warm interior render that establishes the scene's scale, prop arrangement, and lighting.",
      "#d9c49c",
      "linear-gradient(180deg, rgba(18, 14, 10, 0.12), rgba(18, 14, 10, 0.64))",
      "realistic Conor image resources/Screenshot 2026-05-28 184105.png",
      {
        eyebrow: "Realistic Study",
        tags: ["Interior", "Lighting"],
        alt: "Realistic interior corner environment screenshot"
      }
    ),
    thumbnail: createImageAsset(
      "Realistic Corner",
      "Project tile frame for the realistic interior corner study.",
      "#d1b58c",
      "linear-gradient(180deg, rgba(17, 13, 10, 0.08), rgba(17, 13, 10, 0.6))",
      "realistic Conor image resources/Screenshot 2026-05-28 184105.png",
      {
        eyebrow: "Realistic"
      }
    ),
    summary:
      "A realistic interior scene focused on prop layout, material finish, and warm lighting.",
    highlights: [
      "Focused on realistic materials and interior mood.",
      "Built around a compact space with close detail.",
      "Presented with both a still and a short walkthrough."
    ],
    gallery: [
      createVideoAsset(
        "Realistic Corner Walkthrough",
        "A video pass that helps the interior feel spatial rather than purely still-image based.",
        "#d5bc95",
        "linear-gradient(180deg, rgba(18, 15, 12, 0.06), rgba(18, 15, 12, 0.3))",
        "realistic corner.mp4",
        {
          poster: assetPath(
            "realistic Conor image resources/Screenshot 2026-05-28 184105.png"
          ),
          eyebrow: "Video",
          tags: ["Interior", "Presentation"]
        }
      ),
      createImageAsset(
        "Interior Beauty Shot",
        "A still image focused on warm light, furniture layout, and material response.",
        "#eedfc1",
        "linear-gradient(180deg, rgba(18, 15, 12, 0.08), rgba(18, 15, 12, 0.42))",
        "realistic Conor image resources/Screenshot 2026-05-28 184105.png",
        {
          eyebrow: "Still Render"
        }
      )
    ],
    contributions: [
      {
        title: "Modeling and Finish",
        summary:
          "Focused on believable props, finish, and material response.",
        bullets: [
          "Modeled the furniture and supporting scene content.",
          "Focused on the relationship between surface finish and light.",
          "Used a compact scene size to emphasize close reading and material response."
        ]
      },
      {
        title: "Environment Direction",
        summary:
          "Focused on warm mood, layout, and visual balance.",
        bullets: [
          "Built a warm, readable interior mood.",
          "Used furniture placement and wall treatment to create hierarchy.",
          "Balanced realism with clean presentation."
        ]
      }
    ],
    facts: [
      { label: "Focus", value: "Realistic interior scene and material finish" },
      { label: "Ownership", value: "All environment content modeled independently" },
      { label: "Project Type", value: "Student environment study" },
      { label: "Media", value: "Interior video and still render" }
    ],
    caseStudySections: [
      {
        title: "Realism Goals",
        body: [
          "This project focuses on smaller-scale realism through prop arrangement, finish, and lighting."
        ]
      },
      {
        title: "Presentation Notes",
        body: [
          "The warm light and room composition give the scene a calm, finished feel."
        ]
      }
    ],
    reflection:
      "The scene focuses on interior detail, material finish, and warm lighting.",
    status: "ready"
  }
];

export const projectCategoryLabel: Record<ProjectCategory, string> = {
  game: "Game Projects",
  environment: "Environment Projects",
  vfx: "VFX Studies"
};

export const projectFilters = [
  { key: "all", label: "All Projects" },
  { key: "game", label: "Game Projects" },
  { key: "environment", label: "Environment Projects" },
  { key: "vfx", label: "VFX Studies" }
] as const;

export type ProjectFilterKey = (typeof projectFilters)[number]["key"];

export const featuredProject = projects[0];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.category === category);
}
