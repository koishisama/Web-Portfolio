import type { VisualAsset } from "../types/project";
import assetIndex from "../data/asset-index.json";
import { image } from "../data/media";
import { Picture } from "./Media";
import Icon from "./Icon";

export default function MediaThumbnail({
  asset,
  label,
  selected,
  duration,
}: {
  asset: VisualAsset;
  label: string;
  selected: boolean;
  duration?: number;
}) {
  const video = asset.mediaType === "video";
  const posterMatch = asset.poster?.match(
    /^\/media\/([^/]+)\/(.+)-\d+\.(?:jpg|webp)$/,
  );
  const responsivePoster =
    video &&
    !asset.posterSrcSet &&
    posterMatch &&
    Object.prototype.hasOwnProperty.call(
      assetIndex,
      `${posterMatch[1]}/${posterMatch[2]}`,
    )
      ? image(posterMatch[1], posterMatch[2], asset.title, asset.caption)
      : undefined;
  return (
    <>
      <span className="thumb-image">
        <Picture
          asset={{
            ...asset,
            mediaType: "image",
            purpose: "illustration",
            src: video ? asset.poster! : asset.src,
            srcSet: video
              ? (asset.posterSrcSet ?? responsivePoster?.srcSet)
              : asset.srcSet,
            alt: `Preview: ${label}`,
          }}
          sizes="(max-width: 560px) calc((100vw - 56px) / 2), (max-width: 1200px) 24vw, 264px"
        />
        <span className="thumb-status">
          <Icon name={selected ? "check" : video ? "play" : "expand"} />
        </span>
        {duration ? (
          <span className="thumb-duration">
            {Math.floor(duration / 60)}:
            {String(Math.floor(duration % 60)).padStart(2, "0")}
          </span>
        ) : null}
      </span>
      <span className="thumb-title">{label}</span>
    </>
  );
}
