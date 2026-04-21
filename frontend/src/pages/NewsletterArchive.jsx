import React from "react";
import { Link } from "react-router-dom";

const archivedIssues = [
  {
    id: "Vol. 07",
    date: "March 2026",
    title: "Margin Compression Watchlist and Quality Screens",
    summary: "How we separate temporary pressure from structural deterioration in operating margins.",
  },
  {
    id: "Vol. 06",
    date: "February 2026",
    title: "Banks, Duration, and Credit Re-Pricing",
    summary: "A memo-driven walkthrough of where sensitivity hides in regional balance sheets.",
  },
  {
    id: "Vol. 05",
    date: "January 2026",
    title: "Consumer Softening and Pricing Power Tests",
    summary: "Signals we use to validate demand durability before updating position sizing.",
  },
];

const NewsletterArchive = () => {
  return (
    <div className="page-shell-final page-shell-padded-final newsletter-archive-page-final">
      <section className="page-intro-section-final">
        <div className="content-container-final">
          <p className="page-intro-eyebrow-final">Newsletter Archive</p>
          <h1 className="page-intro-title-final">Past Issues</h1>
          <p className="page-intro-lead-final">
            A rolling index of previous market letters and memo highlights from the Echelon research team.
          </p>
          <div className="page-intro-links-final">
            <Link to="/newsletter" className="page-intro-link-final">
              Return to Newsletter Landing
            </Link>
          </div>
        </div>
      </section>

      <section className="newsletter-archive-list-section-final">
        <div className="content-container-final newsletter-archive-list-final">
          {archivedIssues.map((issue) => (
            <article key={issue.id} className="newsletter-benefit-card-final">
              <p className="newsletter-issue-meta-final">
                <span>{issue.id}</span>
                <span aria-hidden="true">|</span>
                <span>{issue.date}</span>
              </p>
              <h2 className="newsletter-card-title-final">{issue.title}</h2>
              <p className="newsletter-card-copy-final">{issue.summary}</p>
              <div className="newsletter-archive-card-cta-row-final">
                <Link to="/newsletter" className="newsletter-archive-card-cta-final">
                  Read Issue Highlights
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsletterArchive;
