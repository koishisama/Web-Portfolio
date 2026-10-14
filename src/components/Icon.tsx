const paths = {
  play: "M8 5l11 7-11 7z",
  pause: "M8 4v16M16 4v16",
  expand: "M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6",
  "arrow-up-right": "M7 17L17 7M7 7h10v10",
  "arrow-left": "M19 12H5m6-6-6 6 6 6",
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  close: "m6 6 12 12M18 6 6 18",
  info: "M12 16v-5m0-3v.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  sparkles:
    "m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6zM20 2v4m-2-2h4",
  route:
    "M6 4v13a3 3 0 0 0 6 0V7a3 3 0 0 1 6 0v13M3 4a3 3 0 1 0 6 0 3 3 0 1 0-6 0m12 16a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
  check: "m5 12 4 4L19 6",
  "chevron-down": "m6 9 6 6 6-6",
  mail: "M3 5h18v14H3zM3 5l9 7 9-7",
  copy: "M9 9h12v12H9zM15 5V3H3v12h2",
  layers: "m12 3 10 5-10 5L2 8zm-10 10 10 5 10-5M2 18l10 5 10-5",
  sliders: "M4 21v-7m0-6V3m8 18v-5m0-6V3m8 18V10m0-6V3M1 8h6m2 8h6m2-12h6",
  lock: "M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4m-4 5v2",
  refresh: "M20 7a9 9 0 0 0-15-2L2 8m0-6v6h6m-4 9a9 9 0 0 0 15 2l3-3m0 6v-6h-6",
  music:
    "M9 18V5l12-3v14M9 8l12-3M3 19a3 2 0 1 0 6 0 3 2 0 1 0-6 0m12-2a3 2 0 1 0 6 0 3 2 0 1 0-6 0",
  speed:
    "M3 19a10 10 0 1 1 18 0M12 13l5-5M6 16h.01M5 10h.01M10 5h.01M18 16h.01M11 15a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  cards: "M7 3h13v17H7zM4 6H2v16h13m-1-15 3 4-3 4-3-4z",
  sword: "M3 21l6-6m-4-4 8 8M8 12l10-10h4v4L12 16",
  dice: "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1M7 7h.01M17 7h.01M12 12h.01M7 17h.01M17 17h.01",
  watch: "M8 2h8v4m-8 16h8v-4M5 12a7 7 0 1 0 14 0 7 7 0 1 0-14 0m7-4v4l3 2",
  message: "M3 3h18v14H8l-5 4zM7 7h10M7 11h7",
  headphones: "M3 14v-3a9 9 0 0 1 18 0v3M3 12h4v9H3zm14 0h4v9h-4z",
  droplet: "M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13m-4 13a4 4 0 0 0 4 4",
  tree: "m12 2 6 7h-3l5 7H4l5-7H6zm0 14v6",
  brush:
    "m13 12 8-10 1 1-7 12M12 13c-4-4-8 1-6 4 0 3-3 4-3 4s9 1 10-4c1-2 0-3-1-4",
  link: "m9 15 6-6m-6 9-2 2a4 4 0 0 1-6-6l3-3m11-5 2-2a4 4 0 0 1 6 6l-3 3",
  trophy:
    "M8 3h8v6a4 4 0 0 1-8 0zM8 5H3v3a5 5 0 0 0 6 5m7-8h5v3a5 5 0 0 1-6 5m-3 0v6m-4 2h8m-6-2v2m4-2v2",
};
export type IconName = keyof typeof paths;
export default function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={name === "play" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={name === "play" ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
