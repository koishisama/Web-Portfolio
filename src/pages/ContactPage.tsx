import { useState } from "react";
import { site } from "../data/site";
export default function ContactPage() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }
  return (
    <div className="contact-page container">
      <header className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>
          Good work starts
          <br />
          <span>with a conversation.</span>
        </h1>
        <p>
          For game programming, technical art or a project that connects the
          two, get in touch.
        </p>
      </header>
      <div className="contact-options">
        <section className="contact-email">
          <span className="eyebrow">01 / Email</span>
          <h2>Say hello.</h2>
          <a className="email-address" href={`mailto:${site.email}`}>
            {site.email}
            <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-buttons">
            <a className="button button-primary" href={`mailto:${site.email}`}>
              Write an email ↗
            </a>
            <button className="button button-secondary" onClick={copyEmail}>
              {copyState === "copied" ? "Email copied ✓" : "Copy email"}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyState === "copied"
              ? "The email address is on your clipboard."
              : copyState === "failed"
                ? "Clipboard access is unavailable. Select the email address above to copy it, or use the email link."
                : ""}
          </p>
        </section>
        <section className="contact-github">
          <span className="eyebrow">02 / GitHub</span>
          <h2>A look at the code.</h2>
          <p>My public repositories and the source for this portfolio.</p>
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            github.com/koishisama ↗
          </a>
        </section>
      </div>
    </div>
  );
}
