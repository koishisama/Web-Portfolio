import { useRef, useState } from "react";
import type { ShowcaseAsset } from "../types/project";
import Media from "./Media";

export default function MediaDialog({
  asset,
  triggerLabel,
}: {
  asset: ShowcaseAsset;
  triggerLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="button button-secondary showcase-trigger"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        {triggerLabel} <span aria-hidden="true">↗</span>
      </button>
      <dialog
        ref={dialog}
        className="media-dialog"
        aria-label={asset.title}
        onClose={() => {
          for (const video of dialog.current?.querySelectorAll("video") ?? [])
            video.pause();
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className="media-dialog-header">
          <h2>{asset.title}</h2>
          <button
            type="button"
            className="media-dialog-close"
            onClick={() => dialog.current?.close()}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="media-dialog-body">
          {open ? (
            <Media asset={asset} sizes="(max-width: 800px) 94vw, 1100px" />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
