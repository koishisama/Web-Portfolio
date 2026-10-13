export type Track = "programming" | "technical-art";
export type ProjectTier = "featured" | "supporting" | "study";
export type MediaPurpose = "showcase" | "evidence" | "illustration";
export type VisualAsset = {
  id: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  srcSet?: string;
  poster?: string;
  posterSrcSet?: string;
  width: number;
  height: number;
  mediaType: "image" | "video";
  purpose: MediaPurpose;
  transcript?: string;
  subtitles?: string;
};
export type ShowcaseAsset = VisualAsset & {
  mediaType: "video";
  purpose: "showcase";
};
export type Breakdown = {
  id: string;
  layout?: "stack" | "split" | "wide";
  title: string;
  paragraphs: string[];
  media?: VisualAsset;
  comparison?: { label: string; asset: VisualAsset }[];
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
    | "Team project"
    | "Independent study"
    | "Game jam"
    | "Environment study";
  roles: string[];
  tools: string[];
  facts: { label: string; value: string }[];
  scope: string;
  version: string;
  cover: VisualAsset;
  showcase?: ShowcaseAsset;
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
