export type Track = "programming" | "technical-art";
export type ProjectTier = "featured" | "supporting" | "study";
export type VisualAsset = {
  id: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  srcSet?: string;
  poster?: string;
  width: number;
  height: number;
  mediaType: "image" | "video";
  transcript?: string;
  subtitles?: string;
};
export type Breakdown = {
  title: string;
  paragraphs: string[];
  media?: VisualAsset;
};
export type ProjectRecord = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  tracks: Track[];
  tier: ProjectTier;
  rank: number;
  publication: "published" | "draft";
  completionStatus?: "in-progress" | "completed" | "archived";
  projectType:
    "Team project" | "Independent study" | "Game jam" | "Environment study";
  roles: string[];
  tools: string[];
  facts: { label: string; value: string }[];
  scope: string;
  version: string;
  cover: VisualAsset;
  demo?: VisualAsset;
  contributions: string[];
  context: string;
  breakdown: Breakdown[];
  flow: { label: string; detail: string }[];
  result: string[];
  credits: { name: string; detail: string; href?: string }[];
  links: {
    label: string;
    href: string;
    kind: "play" | "source" | "documentation";
  }[];
};

export type PublishedProjectRecord = ProjectRecord & {
  publication: "published";
};
