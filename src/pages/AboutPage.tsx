import { Link } from "react-router-dom";
import { Picture } from "../components/Media";
import { image } from "../data/media";
import ContactCTA from "../components/ContactCTA";

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
        <header className="page-header">
          <h1>A little about me</h1>
          <p>
            I’m Hongtao Gao, a game programmer and technical artist with a
            background in Game and Immersive Media at Monash University.
          </p>
        </header>
        <p>
          I work across Unity and Unreal Engine. My projects range from game
          interfaces and beat-based gameplay to Niagara effects, materials and
          tools for generating a city.
        </p>
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
        <section>
          <h2>Programming and technical art, together</h2>
          <p>
            In <Link to="/projects/deinosavros">Deinosavros</Link>, my work
            connects menus, map decisions and combat through the interface. In{" "}
            <Link to="/projects/rhythm-rider">Rhythm Rider</Link>, gameplay and
            effects communicate timing. For{" "}
            <Link to="/projects/procedural-city">Procedural City</Link>, the
            goal is to give generation a useful editing workflow.
          </p>
          <p>
            My <Link to="/projects/ink-vfx">Ink VFX</Link> study focuses on
            complete effect cycles, materials and animation timing.{" "}
            <Link to="/projects/oasis-environment">Oasis</Link> connects
            material detail with a wider environment composition.
          </p>
        </section>
        <section>
          <h2>Working with a team</h2>
          <p>
            For <Link to="/projects/one-more-second">One More Second</Link>,
            seven people worked for 72 hours. I contributed menus, the final
            dialogue system, pickups, skill and drag feedback, audio and final
            integration. The case pages distinguish my part from the complete
            team game.
          </p>
        </section>
      </article>
      <ContactCTA />
    </>
  );
}
