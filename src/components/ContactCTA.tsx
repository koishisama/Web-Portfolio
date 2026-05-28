import { Link } from "react-router-dom";

type ContactCTAProps = {
  title?: string;
  description?: string;
};

export default function ContactCTA({
  title = "Ready to replace placeholders with final media and recruiter-ready details.",
  description = "This scaffold is built to accept polished screenshots, gameplay clips, resume links, and external profiles without changing the page structure."
}: ContactCTAProps) {
  return (
    <section className="page-section">
      <div className="page-shell">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">Next Step</p>
            <h2>{title}</h2>
            <p className="section-description">{description}</p>
          </div>
          <div className="button-row">
            <Link className="button button--primary" to="/contact">
              Open Contact Page
            </Link>
            <Link className="button button--ghost" to="/projects">
              Review Project Layout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
