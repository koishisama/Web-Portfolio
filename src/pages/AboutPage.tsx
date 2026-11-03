import { Link } from "react-router-dom";
import { Picture } from "../components/Media";
import { image } from "../data/media";
import { site, skillGroups, timeline } from "../data/site";
import ContactCTA from "../components/ContactCTA";
import Icon, { type IconName } from "../components/Icon";

const street = image(
  "procedural-city",
  "street",
  "A street in the Procedural City environment",
  "Street detail from my Procedural City editor-tool study.",
);
export default function AboutPage() {
  return (
    <>
      <article className="about-page container">
        <header className="page-header about-header">
          <div className="about-portrait">
            {site.portrait ? (
              <img src={site.portrait} alt={site.name} width="240" height="240" />
            ) : (
              <span aria-hidden="true">HG</span>
            )}
          </div>
          <div>
            <h1>A little about me</h1>
            <p>
              I’m Hongtao Gao, a game programmer and technical artist with a
              background in Game and Immersive Media at Monash University.
            </p>
            <div className="hero-actions">
              {site.resume ? (
                <a className="button button-primary" href={site.resume} download>
                  <Icon name="download" /> Download CV
                </a>
              ) : null}
              <Link className="button button-ghost" to="/contact">
                <Icon name="mail" /> Get in touch
              </Link>
            </div>
          </div>
        </header>
        <p>
          I work across Unity and Unreal Engine. My projects range from game
          interfaces and beat-based gameplay to Niagara effects, materials and
          tools for generating a city.
        </p>
        <section className="about-skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>
                  <Icon name={group.icon as IconName} /> {group.title}
                </h3>
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading">Education &amp; experience</h2>
          <ol className="timeline">
            {timeline.map((entry) => (
              <li key={entry.title}>
                <span className="timeline-period">{entry.period}</span>
                <h3>{entry.title}</h3>
                <p className="timeline-place">{entry.place}</p>
                <p>{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <figure className="about-photo">
          <Link
            to="/projects/procedural-city"
            aria-label="Explore Procedural City"
          >
            <Picture
              asset={street}
              eager
              sizes="(max-width: 800px) calc(100vw - 40px), 800px"
            />
          </Link>
          <figcaption>{street.caption}</figcaption>
        </figure>
        <p>
          <Link className="text-link" to="/reflection">
            Read my degree reflection
          </Link>
        </p>
      </article>
      <ContactCTA />
    </>
  );
}
