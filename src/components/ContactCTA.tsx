import { Link } from "react-router-dom";

type ContactCTAProps = {
  title?: string;
  description?: string;
};

export default function ContactCTA({
  title = "Open the contact page for links and details.",
  description = "Use it for email and GitHub updates."
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
