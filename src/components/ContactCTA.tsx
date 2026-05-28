import { Link } from "react-router-dom";

type ContactCTAProps = {
  title?: string;
  description?: string;
};

export default function ContactCTA({
  title = "Get in touch or explore more work.",
  description = "Reach out by email or explore more work on GitHub."
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
              Open Contact
            </Link>
            <Link className="button button--ghost" to="/projects">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
