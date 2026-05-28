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
            Use these cards to add your recruiter-facing links and contact details.
          </p>
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Contact Cards"
            title="Ready for email and GitHub"
            description="Replace the temporary values below with your real contact details and links."
          />
          <div className="contact-grid">
            {siteMeta.contactCards.map((card) => (
              <article key={card.label} className="panel contact-card">
                <p className="eyebrow">{card.label}</p>
                <h2>
                  <a href={card.href} target="_blank" rel="noreferrer">
                    {card.value}
                  </a>
                </h2>
                <p>{card.note}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
