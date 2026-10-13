import { Link } from "react-router-dom";
export default function ContactCTA() {
  return (
    <section
      className="contact-cta container"
      aria-labelledby="contact-cta-heading"
    >
      <div>
        <span className="eyebrow">Get in touch</span>
        <h2 id="contact-cta-heading">
          Let's make something
          <br />
          <em>worth playing.</em>
        </h2>
      </div>
      <Link className="button button-primary" to="/contact">
        Start a conversation <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
