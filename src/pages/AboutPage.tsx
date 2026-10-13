import { Link } from "react-router-dom";
import ContactCTA from "../components/ContactCTA";
import { Picture } from "../components/Media";
import { projects } from "../data/projects";

export default function AboutPage() {
  const city = projects.find((project) => project.slug === "procedural-city");
  return (
    <>
      <header className="page-header container about-heading">
        <p className="eyebrow">About / Hongtao Gao</p>
        <h1>
          Between how it works
          <br />
          and how it feels.
        </h1>
        <p>
          Game Programmer &amp; Technical Artist.
          <br />
          Working with Unity and Unreal Engine.
        </p>
      </header>
      <section
        className="about-story container"
        aria-labelledby="about-story-heading"
      >
        <h2 id="about-story-heading">
          I like the moment
          <br />
          when it all connects.
        </h2>
        <div>
          <p>
            My background is in Game and Immersive Media at Monash University. I
            work across game programming and technical art, building interfaces,
            gameplay feedback, real-time effects and editor tools.
          </p>
          <p>
            A card battler needs decisions a player can read. A rhythm game
            needs a reliable event and an effect that feels in time. A
            procedural tool needs enough structure to repeat a result and enough
            control to let an artist change it.
          </p>
          <p>
            Team projects have also taught me to care about the connections:
            menus, dialogue, audio and the final integration that makes separate
            contributions feel like one game.
          </p>
        </div>
      </section>
      {city ? (
        <section
          className="about-world light-surface"
          aria-labelledby="about-world-heading"
        >
          <div className="container">
            <Link
              className="about-world-image"
              to="/projects/procedural-city"
              aria-label="Explore Procedural City"
            >
              <Picture
                asset={city.cover}
                sizes="(max-width: 1600px) 91vw, 1460px"
              />
            </Link>
            <div className="about-world-caption">
              <h2 id="about-world-heading">Room for the next iteration.</h2>
              <p>
                Procedural City connects rules and repeatability with decisions
                an artist can keep making.
              </p>
              <Link className="text-link" to="/projects/procedural-city">
                Inside the tool ↗
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      <section
        className="capability-section container"
        aria-labelledby="capabilities"
      >
        <div className="section-top">
          <h2 id="capabilities">What I bring to a project.</h2>
          <p>Capabilities, connected to the work.</p>
        </div>
        <div className="capability-grid">
          <article>
            <h3>Gameplay &amp; interfaces</h3>
            <p>
              C#, interaction flow, UI state, event-driven feedback and team
              integration.
            </p>
            <Link className="text-link" to="/projects/deinosavros">
              Deinosavros ↗
            </Link>
            <Link className="text-link" to="/projects/one-more-second">
              One More Second ↗
            </Link>
          </article>
          <article>
            <h3>Real-time effects</h3>
            <p>
              Niagara, materials, effects shaped around animation, and readable
              gameplay responses.
            </p>
            <Link className="text-link" to="/projects/ink-vfx">
              Ink VFX ↗
            </Link>
            <Link className="text-link" to="/projects/rhythm-rider">
              Rhythm Rider ↗
            </Link>
          </article>
          <article>
            <h3>Tools &amp; iteration</h3>
            <p>
              Python, Blueprint, editor utilities, seeded generation and
              controls for artists.
            </p>
            <Link className="text-link" to="/projects/procedural-city">
              Procedural City ↗
            </Link>
          </article>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
