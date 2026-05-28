export type ProjectCategory = "game" | "environment";

export type ProjectStatus = "ready" | "placeholder";

export type VisualAsset = {
  title: string;
  caption: string;
  alt: string;
  accent: string;
  overlay: string;
  eyebrow?: string;
  tags?: string[];
};

export type CaseStudySection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export type Contribution = {
  title: string;
  summary: string;
  bullets: string[];
};

export type Fact = {
  label: string;
  value: string;
};

export type ProjectRecord = {
  slug: string;
  title: string;
  category: ProjectCategory;
  subtitle: string;
  roles: string[];
  tools: string[];
  projectType: string;
  heroImage: VisualAsset;
  thumbnail: VisualAsset;
  summary: string;
  highlights: string[];
  gallery: VisualAsset[];
  caseStudySections: CaseStudySection[];
  contributions: Contribution[];
  facts: Fact[];
  reflection: string;
  status: ProjectStatus;
};
