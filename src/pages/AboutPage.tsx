import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ToolStack from "../components/ToolStack";
import ContactCTA from "../components/ContactCTA";
import { siteMeta } from "../data/site";

const focusAreas = [
  {
    title: "Programming",
    description:
      "Gameplay systems, interaction logic, and player-facing responsiveness inside Unity."
  },
  {
    title: "VFX",
    description:
      "Real-time feedback, scene energy, and readable visual communication for gameplay moments."
  },
  {
    title: "Environment",
    description:
      "Modeling, composition, and environment presentation that support both atmosphere and gameplay."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="page-section page-header">
        <div className="page-shell">
          <p className="eyebrow">About</p>
          <h1 className="display-title">{siteMeta.ownerName}</h1>
          <p className="hero-statement">{siteMeta.roleLabel}</p>
          <p className="lead">{siteMeta.aboutIntro}</p>
        </div>
      </section>

      <Reveal className="page-section">
        <div className="page-shell two-column-layout">
          <div className="body-copy">
            {siteMeta.aboutDetails.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="panel">
            <p className="eyebrow">Education Context</p>
            <h2>Student work presented with production-minded structure</h2>
            <p>
              The scaffold treats school projects as real portfolio cases by emphasizing
              ownership, process, and outcome rather than assignment labels alone.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Focus Areas"
            title="Three strengths framed as one hybrid profile"
            description="The site is organized to show how coding, VFX, and environment production reinforce each other."
          />
          <div className="contribution-grid">
            {focusAreas.map((area) => (
              <article key={area.title} className="panel contribution-card">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Toolkit"
            title="Tools already wired into the portfolio scaffold"
            description="This list is pulled from shared site data so it can be updated in one place."
          />
          <div className="panel tools-panel">
            <ToolStack tools={siteMeta.tools} />
          </div>
        </div>
      </Reveal>

      <ContactCTA
        title="The About page is ready for your real bio and links."
        description="Replace placeholder identity details and extend this page with awards, timeline, or professional experience once you are ready."
      />
    </>
  );
}
