import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { siteMeta } from "../data/site";

export default function ContactPage() {
  return (
    <>
      <section className="page-section page-header">
        <div className="page-shell">
          <p className="eyebrow">Contact</p>
          <h1 className="display-title">Contact and external links</h1>
          <p className="lead">
            These cards are scaffolded as placeholders so real recruiter-facing links can be
            dropped in later without changing the layout.
          </p>
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Contact Cards"
            title="Ready for email, GitHub, LinkedIn, and resume"
            description="Swap the placeholder values below with your real contact details and downloadable files."
          />
          <div className="contact-grid">
            {siteMeta.contactCards.map((card) => (
              <article key={card.label} className="panel contact-card">
                <p className="eyebrow">{card.label}</p>
                <h2>{card.value}</h2>
                <p>{card.note}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
