import index from "./asset-index.json";
import type { VisualAsset } from "../types/project";
type AssetEntry = { width: number; height: number; variants: number[] };
const assets = index as Record<string, AssetEntry>;
export function image(
  slug: string,
  id: string,
  title: string,
  caption: string,
): VisualAsset {
  const key = `${slug}/${id}`;
  const info = assets[key];
  const variants = info?.variants ?? [480, 960, 1600];
  const largest = Math.max(...variants);
  return {
    id,
    title,
    caption,
    alt: title,
    src: `/media/${key}-${largest}.jpg`,
    srcSet: variants
      .map((width) => `/media/${key}-${width}.webp ${width}w`)
      .join(", "),
    width: info?.width ?? 1600,
    height: info?.height ?? 900,
    mediaType: "image",
  };
}
export function video(
  slug: string,
  title: string,
  caption: string,
  transcript: string,
  id = "demo",
): VisualAsset {
  const variants = assets[`${slug}/hero`]?.variants ?? [480, 960, 1600];
  const posterWidth = Math.max(...variants.filter((width) => width <= 960));
  return {
    id,
    title,
    caption,
    transcript,
    alt: title,
    src: `/media/${slug}/${id}.mp4`,
    poster: `/media/${slug}/hero-${posterWidth}.webp`,
    width: 1920,
    height: 1080,
    mediaType: "video",
  };
}
