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
    <section className="contact-page container">
      <header className="page-header">
        <h1>Get in touch</h1>
        <p>You can reach me by email, or find my work on GitHub.</p>
      </header>
      <div className="contact-options">
        <a className="email-address" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <button
          type="button"
          className="button button-secondary"
          onClick={copyEmail}
        >
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
      <div className="contact-links">
        <a href={`mailto:${site.email}`}>Write an email</a>
        <a href={site.github} target="_blank" rel="noreferrer">
          github.com/koishisama
        </a>
      </div>
    </section>
  );
}
