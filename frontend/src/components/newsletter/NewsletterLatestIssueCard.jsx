import React from "react";

const NewsletterLatestIssueCard = ({ issue = null }) => {
  if (!issue) {
    return (
      <section className="newsletter-latest-section-final">
        <div className="content-container-final">
          <article className="newsletter-issue-card-final">
            <h2 className="newsletter-issue-title-final">Latest Issue Preview</h2>
            <h3 className="newsletter-card-title-final newsletter-card-title-issue-final">No published issue yet</h3>
            <p className="newsletter-card-copy-final newsletter-issue-summary-final">
              The next issue will appear here once it is published.
            </p>
          </article>
        </div>
      </section>
    );
  }

  const highlights = Array.isArray(issue.highlights) ? issue.highlights : [];

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
          {highlights.length ? (
            <ul className="newsletter-highlight-list-final" aria-label="Latest issue highlights">
              {highlights.map((highlight, index) => (
                <li key={`${highlight}-${index}`} className="newsletter-highlight-item-final">
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </section>
  );
};

export default NewsletterLatestIssueCard;
