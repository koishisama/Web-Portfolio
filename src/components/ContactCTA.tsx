import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function ContactCTA() {
  return (
    <section
      className="contact-cta container"
      aria-labelledby="contact-cta-heading"
    >
      <h2 id="contact-cta-heading">
        Let's talk
        <br />
        about games.
      </h2>
      <div>
        <p>
          Game programming, technical art,
          <br />
          and the space between.
        </p>
        <a className="contact-direct" href={`mailto:${site.email}`}>
          {site.email} ↗
        </a>
        <Link className="text-link" to="/contact">
          Get in touch ↗
        </Link>
      </div>
    </section>
  );
}
