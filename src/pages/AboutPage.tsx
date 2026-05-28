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
            <h2>Student projects with hands-on production roles</h2>
            <p>
              Most of the work here comes from student projects, with a focus on clear
              ownership across implementation, VFX, and environment production.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="page-section">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Focus Areas"
            title="Main areas of work"
            description="Programming, VFX, and environment production are the three main areas across the current projects."
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
            title="Tools used across these projects"
            description="A small selection of software and workflows used across the current work."
          />
          <div className="panel tools-panel">
            <ToolStack tools={siteMeta.tools} />
          </div>
        </div>
      </Reveal>

      <ContactCTA
        title="Get in touch or explore more work."
        description="Reach out by email or explore more work on GitHub."
      />
    </>
  );
}
