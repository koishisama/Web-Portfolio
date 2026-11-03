export const site = {
  name: "Hongtao Gao",
  role: "Game Programmer & Technical Artist",
  description:
    "Gameplay systems, expressive effects and tools for making worlds. Selected Unity and Unreal Engine work by Hongtao Gao.",
  tagline:
    "I build gameplay systems, interfaces and tools — and the shaders and effects that make them readable.",
  email: "mm2212425586@gmail.com",
  github: "https://github.com/koishisama",
  url: "https://web-portfolio-eta-eosin.vercel.app",
  // Place the PDF at public/Hongtao-Gao-CV.pdf; leave empty to hide every CV button.
  resume: "/Hongtao-Gao-CV.pdf",
  availability: "Open to gameplay & technical art roles",
  // Optional extra profiles; entries with an empty href are not rendered.
  profiles: [
    { label: "LinkedIn", href: "" },
    { label: "itch.io", href: "" },
    { label: "ArtStation", href: "" },
  ],
  // Optional portrait at public/media/portrait.webp; empty shows a monogram.
  portrait: "",
};
export const tracks = {
  programming: "Programming",
  "technical-art": "Technical Art",
} as const;

export const skillGroups = [
  {
    title: "Programming",
    icon: "code",
    items: ["C#", "Python", "Blueprint", "UI state & flow", "Networking (TCP)", "Git"],
  },
  {
    title: "Technical art",
    icon: "sparkles",
    items: ["Niagara", "Materials", "Shader Graph", "URP", "Procedural generation", "Animation timing"],
  },
  {
    title: "Engines & tools",
    icon: "layers",
    items: ["Unity", "Unreal Engine 5", "Editor Utility Widgets", "FMOD", "Maya", "Substance Painter"],
  },
] as const;

export const timeline = [
  {
    period: "Education",
    title: "Game and Immersive Media",
    place: "Monash University",
    detail: "Team productions, gameplay programming and real-time art in Unity and Unreal Engine.",
  },
  {
    period: "2026",
    title: "GMTK Game Jam — One More Second",
    place: "Team of 7 · 72 hours",
    detail: "Menus, final dialogue system, pickups, skill feedback, audio and final integration.",
  },
] as const;
