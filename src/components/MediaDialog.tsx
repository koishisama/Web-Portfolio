import { useRef, useState } from "react";
import type { ShowcaseAsset, VisualAsset } from "../types/project";
import Media, { Picture } from "./Media";
import Icon from "./Icon";

export default function MediaDialog({
  asset,
  triggerLabel,
  preview,
  eager = false,
}: {
  asset: ShowcaseAsset;
  triggerLabel: string;
  preview?: VisualAsset;
  eager?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={
          preview ? "project-cover-button" : "icon-button showcase-trigger"
        }
        aria-label={triggerLabel}
        title={triggerLabel}
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        {preview ? (
          <Picture
            asset={preview}
            eager={eager}
            sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 1200px) 45vw, 544px"
          />
        ) : null}
        <span className={preview ? "cover-play" : ""}>
          <Icon name="play" />
        </span>
      </button>
      <dialog
        ref={dialog}
        className="media-dialog"
        aria-label={asset.title}
        onClose={() => {
          for (const video of dialog.current?.querySelectorAll("video") ?? [])
            video.pause();
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="media-dialog-header">
          <h2>{asset.title}</h2>
          <button
            type="button"
            className="icon-button media-dialog-close"
            aria-label="Close"
            title="Close"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="media-dialog-body">
          {open ? (
            <Media
              asset={asset}
              playOnMount
              compactCaption
              sizes="(max-width: 800px) 94vw, 1100px"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
