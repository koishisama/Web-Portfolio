import type { VisualAsset } from "../types/project";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

type GalleryGridProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  gallery: VisualAsset[];
  captionMode?: "none" | "all" | "video";
};

export default function GalleryGrid({
  eyebrow = "Media",
  title = "Project media",
  description,
  gallery,
  captionMode = "none"
}: GalleryGridProps) {
  return (
    <section className="page-section">
      <div className="page-shell">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="gallery-grid">
          {gallery.map((asset) => (
            <MediaPlaceholder
              key={asset.title}
              asset={asset}
              variant="gallery"
              showCaption={
                captionMode === "all" ||
                (captionMode === "video" && asset.mediaType === "video")
              }
              className={`gallery-media gallery-media--${asset.mediaType ?? "image"}${asset.mediaType === "video" ? asset.controls ? " gallery-media--interactive" : " gallery-media--loop" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
