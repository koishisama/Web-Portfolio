import { Link } from "react-router-dom";
import { site } from "../data/site";
import Icon from "./Icon";

export default function ContactCTA() {
  return (
    <section className="contact-cta" aria-labelledby="contact-cta-heading">
      <div className="container contact-cta-inner">
        <div>
          <h2 id="contact-cta-heading">Get in touch</h2>
        </div>
        <div>
          <a className="contact-direct" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link
            className="icon-button"
            to="/contact"
            aria-label="Contact details"
            title="Contact details"
          >
            <Icon name="arrow-up-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
