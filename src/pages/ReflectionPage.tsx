import { Link } from "react-router-dom";
import {
  beyondCoursework,
  keyLearnings,
  otherUnits,
  proudest,
  skillsDeveloped,
  units,
  type UnitEntry,
} from "../data/reflection";
import ContactCTA from "../components/ContactCTA";
import Icon from "../components/Icon";

function ToWrite({ children }: { children: string }) {
  return <p className="to-write">To write: {children}</p>;
}

function UnitList({ entries }: { entries: UnitEntry[] }) {
  return (
    <ol className="unit-list">
      {entries.map((unit) => (
        <li key={unit.name}>
          <div className="unit-code">{unit.name}</div>
          <div>
            <p>{unit.note}</p>
            <ul className="tag-list">
              {unit.works.map((work) => (
                <li key={work.title}>
                  {work.slug ? (
                    <Link to={`/projects/${work.slug}`}>{work.title}</Link>
                  ) : (
                    work.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ReflectionPage() {
  return (
    <>
      <article className="reflection-page container">
        <header className="page-header">
          <h1>Reflection</h1>
          <p>
            How the work across my degree fits together: the units it came
            from, the skills it built, what I learned and what I’m proudest of.
          </p>
          <nav className="reflection-toc" aria-label="Reflection sections">
            <a href="#journey">Degree journey</a>
            <a href="#skills">Skills developed</a>
            <a href="#learnings">Key learnings</a>
            <a href="#proudest">Proudest achievement</a>
          </nav>
        </header>

        <section id="journey" aria-labelledby="journey-heading">
          <h2 id="journey-heading">Degree journey</h2>
          <p className="section-lead">Coursework from my Monash units, plus work beyond them.</p>
          <UnitList entries={units} />
          <h3 className="unit-subheading">Other units</h3>
          <ul className="other-units">
            {otherUnits.map((unit) => (
              <li key={unit.name}>
                <strong>{unit.name}</strong> — {unit.works.map((work) => work.title).join(", ")}.{" "}
                {unit.note}
              </li>
            ))}
          </ul>
          <h3 className="unit-subheading">Beyond coursework</h3>
          <UnitList entries={beyondCoursework} />
        </section>

        <section id="skills" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills developed</h2>
          <div className="skill-evidence">
            {skillsDeveloped.map((entry) => (
              <article key={entry.skill}>
                <h3>{entry.skill}</h3>
                {entry.growth ? (
                  <p className="skill-growth">{entry.growth}</p>
                ) : (
                  <ToWrite>how this skill developed across your units.</ToWrite>
                )}
                <p className="skill-links">
                  {entry.evidence.map((work) => (
                    <Link key={work.slug} to={`/projects/${work.slug}`}>
                      {work.title} <Icon name="arrow-up-right" />
                    </Link>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="learnings" aria-labelledby="learnings-heading">
          <h2 id="learnings-heading">Key learnings</h2>
          <ol className="learning-list">
            {keyLearnings.map((learning, index) => (
              <li key={index}>
                {learning.title ? <h3>{learning.title}</h3> : null}
                {learning.body ? (
                  <p>{learning.body}</p>
                ) : (
                  <ToWrite>a key learning from across your degree.</ToWrite>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section id="proudest" className="proudest" aria-labelledby="proudest-heading">
          <h2 id="proudest-heading">
            <Icon name="trophy" /> The thing I’m most proud of
          </h2>
          {proudest.title ? <h3>{proudest.title}</h3> : null}
          {proudest.body ? (
            <p>{proudest.body}</p>
          ) : (
            <ToWrite>the single thing you are most proud of across your university career, and why.</ToWrite>
          )}
          {proudest.project ? (
            <Link className="text-link" to={`/projects/${proudest.project.slug}`}>
              See {proudest.project.title}
            </Link>
          ) : null}
        </section>
      </article>
      <ContactCTA />
    </>
  );
}
