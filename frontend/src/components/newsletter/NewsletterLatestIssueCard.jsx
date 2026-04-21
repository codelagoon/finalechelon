import React from "react";

const NewsletterLatestIssueCard = ({
  issue = {
    volume: "Vol. 08",
    date: "April 2026",
    title: "Semiconductor Cash Cycles, AI Capex, and Variant Paths",
    summary:
      "A focused read on pricing power durability, inventory normalization, and where downside scenarios still hide in plain sight.",
    highlights: [
      "Earnings-quality checklist for margin resilience",
      "Three market signals we track before adding exposure",
      "Memo excerpt: base case vs. variant case assumptions",
    ],
  },
}) => {
  return (
    <section className="newsletter-latest-section-final">
      <div className="content-container-final">
        <article className="newsletter-issue-card-final">
          <div className="newsletter-issue-meta-final">
            <span>{issue.volume}</span>
            <span aria-hidden="true">|</span>
            <span>{issue.date}</span>
          </div>
          <h2 className="newsletter-issue-title-final">Latest Issue Preview</h2>
          <h3 className="newsletter-card-title-final newsletter-card-title-issue-final">{issue.title}</h3>
          <p className="newsletter-card-copy-final newsletter-issue-summary-final">{issue.summary}</p>
          <ul className="newsletter-highlight-list-final" aria-label="Latest issue highlights">
            {issue.highlights.map((highlight) => (
              <li key={highlight} className="newsletter-highlight-item-final">
                {highlight}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default NewsletterLatestIssueCard;
