import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function ContactCTA() {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-heading">
      <div className="container contact-cta-inner">
        <div>
          <h2 id="contact-cta-heading">Get in touch</h2>
          <p>
            For game programming, technical art or a project that connects the
            two.
          </p>
        </div>
        <div>
          <a className="contact-direct" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link className="text-link" to="/contact">
            Contact details
          </Link>
        </div>
      </div>
    </section>
  );
}
