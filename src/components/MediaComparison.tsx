import { useId, useState } from "react";
import type { VisualAsset } from "../types/project";
import Media from "./Media";

export default function MediaComparison({
  variants,
  sizes,
}: {
  variants: { label: string; asset: VisualAsset }[];
  sizes?: string;
}) {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  return (
    <fieldset className="media-comparison">
      <legend>Compare captured variants</legend>
      <div className="comparison-controls">
        {variants.map((variant, index) => (
          <button
            type="button"
            key={variant.label}
            aria-pressed={selected === index}
            aria-controls={panelId}
            onClick={() => setSelected(index)}
          >
            {variant.label}
          </button>
        ))}
      </div>
      <div id={panelId} aria-live="polite">
        <Media
          key={variants[selected].asset.src}
          asset={variants[selected].asset}
          sizes={sizes}
        />
      </div>
    </fieldset>
  );
}
