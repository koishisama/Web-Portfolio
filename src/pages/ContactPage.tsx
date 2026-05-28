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
          <p className="lead">Get in touch directly or explore more work online.</p>
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Contact Cards"
            title="Email and GitHub"
            description="Direct contact and project links."
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
