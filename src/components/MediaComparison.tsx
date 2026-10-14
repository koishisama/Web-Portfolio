import { useId, useState } from "react";
import type { VisualAsset } from "../types/project";
import Media from "./Media";
import MediaThumbnail from "./MediaThumbnail";

export default function MediaComparison({
  variants,
  sizes,
  initialAsset,
}: {
  variants: { label: string; asset: VisualAsset }[];
  sizes?: string;
  initialAsset?: VisualAsset;
}) {
  const options = initialAsset
    ? [
        {
          label: initialAsset.mediaType === "video" ? "Clip" : "Reference",
          asset: initialAsset,
        },
        ...variants,
      ]
    : variants;
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  return (
    <fieldset className="media-comparison">
      <legend className="sr-only">Compare captured variants</legend>
      <div className="comparison-controls">
        {options.map((variant, index) => (
          <button
            type="button"
            key={variant.label}
            aria-label={variant.label}
            aria-pressed={selected === index}
            aria-controls={panelId}
            onClick={() => setSelected(index)}
          >
            <MediaThumbnail
              asset={variant.asset}
              label={variant.label}
              selected={selected === index}
            />
          </button>
        ))}
      </div>
      <div id={panelId} className="comparison-panel" aria-live="polite">
        <Media
          key={options[selected].asset.src}
          asset={options[selected].asset}
          sizes={sizes}
        />
      </div>
    </fieldset>
  );
}
