import { Link } from "react-router-dom";
import ContactCTA from "../components/ContactCTA";
export default function AboutPage() {
  return (
    <>
      <div className="container about-page">
        <header className="page-header">
          <p className="eyebrow">About / Hongtao Gao</p>
          <h1>
            I like the moment
            <br />
            <span>when it all connects.</span>
          </h1>
          <p>
            When a system becomes understandable. When an effect makes an action
            feel right. When a tool makes the next iteration easier.
          </p>
        </header>
        <div className="about-main">
          <div className="about-monogram" aria-hidden="true">
            <span>
              h<span>g</span>.
            </span>
            <div>LOGIC × EXPRESSION</div>
          </div>
          <div className="about-story">
            <h2>Code, craft and everything between.</h2>
            <p>
              My background is in Game and Immersive Media at Monash University.
              I work across game programming and technical art, using Unity and
              Unreal Engine to build interfaces, gameplay feedback, real-time
              effects and editor tools.
            </p>
            <p>
              I enjoy work where those disciplines meet. A card-sacrifice
              interface asks for careful state handling. A rhythm game's
              feedback asks for both a reliable event and a readable effect. A
              procedural tool needs enough structure to be repeatable and enough
              control to be useful to an artist.
            </p>
            <p>
              Team projects have also taught me to care about the seams: menus,
              dialogue, audio and the final integration that makes separate
              contributions feel like one game.
            </p>
            <Link className="text-link" to="/projects">
              See that approach in the work ↗
            </Link>
          </div>
        </div>
        <section className="capability-section" aria-labelledby="capabilities">
          <p className="eyebrow">Project-backed skills</p>
          <h2 id="capabilities">What I bring to a project.</h2>
          <div className="capability-grid">
            <div>
              <span className="capability-index">01</span>
              <h3>Gameplay & interfaces</h3>
              <p>
                C#, interaction flow, UI state, event-driven feedback and team
                integration.
              </p>
              <Link to="/projects/deinosavros">Deinosavros ↗</Link>
              <Link to="/projects/one-more-second">One More Second ↗</Link>
            </div>
            <div>
              <span className="capability-index">02</span>
              <h3>Real-time effects</h3>
              <p>
                Niagara, materials, animation-aware effects and readable
                gameplay responses.
              </p>
              <Link to="/projects/ink-vfx">Ink VFX ↗</Link>
              <Link to="/projects/rhythm-rider">Rhythm Rider ↗</Link>
            </div>
            <div>
              <span className="capability-index">03</span>
              <h3>Tools & iteration</h3>
              <p>
                Python, Blueprint, editor utilities, seeded generation and
                controls for artists.
              </p>
              <Link to="/projects/procedural-city">Procedural City ↗</Link>
            </div>
          </div>
        </section>
      </div>
      <ContactCTA />
    </>
  );
}
