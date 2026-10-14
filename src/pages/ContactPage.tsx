import { useState } from "react";
import { site } from "../data/site";
import Icon from "../components/Icon";
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
      </header>
      <div className="contact-options">
        <a className="email-address" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <button
          type="button"
          className="icon-button copy-button"
          aria-label={copyState === "copied" ? "Email copied" : "Copy email"}
          title="Copy email"
          onClick={copyEmail}
        >
          <Icon name={copyState === "copied" ? "check" : "copy"} />
        </button>
      </div>
      <p
        className={copyState === "failed" ? "copy-status" : "sr-only"}
        role="status"
      >
        {copyState === "copied"
          ? "The email address is on your clipboard."
          : copyState === "failed"
            ? "Clipboard access is unavailable. Select the email address above to copy it, or use the email link."
            : ""}
      </p>
      <div className="contact-links">
        <a
          className="icon-button"
          href={`mailto:${site.email}`}
          aria-label="Write an email"
          title="Write an email"
        >
          <Icon name="mail" />
        </a>
        <a
          className="icon-button"
          href={site.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repositories"
          title="GitHub repositories"
        >
          <Icon name="code" />
        </a>
      </div>
    </section>
  );
}
