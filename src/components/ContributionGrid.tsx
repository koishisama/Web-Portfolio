import type { Contribution } from "../types/project";
import SectionHeading from "./SectionHeading";

type ContributionGridProps = {
  title?: string;
  eyebrow?: string;
  description?: string;
  contributions: Contribution[];
};

export default function ContributionGrid({
  title = "My Contributions",
  eyebrow = "Role Split",
  description,
  contributions
}: ContributionGridProps) {
  return (
    <section className="page-section">
      <div className="page-shell">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="contribution-grid">
          {contributions.map((contribution) => (
            <article key={contribution.title} className="panel contribution-card">
              <h3>{contribution.title}</h3>
              <p>{contribution.summary}</p>
              <ul className="feature-list">
                {contribution.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
