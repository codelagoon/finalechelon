import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsletterArticlePrompt from "../components/newsletter/NewsletterArticlePrompt";
import { fetchPublishedIssues } from "../services/newsletterIssueService";

const NewsletterArchive = () => {
  const [archivedIssues, setArchivedIssues] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadIssues = async () => {
      const result = await fetchPublishedIssues();
      if (!isMounted) return;
      setArchivedIssues(result.issues);
    };

    loadIssues();

    return () => {
      isMounted = false;
    };
  }, []);

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
            <Link to="/newsletter/admin" className="page-intro-link-final">
              Open Admin Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="newsletter-archive-list-section-final">
        <div className="content-container-final newsletter-archive-list-final">
          {!archivedIssues.length ? (
            <article className="newsletter-benefit-card-final">
              <h2 className="newsletter-card-title-final">No published issues yet</h2>
              <p className="newsletter-card-copy-final">Check back soon for new research letters.</p>
            </article>
          ) : null}
          {archivedIssues.map((issue) => (
            <article key={issue.id} className="newsletter-benefit-card-final">
              <NewsletterArticlePrompt type="top" />
              <p className="newsletter-issue-meta-final">
                <span>{issue.volume || "Issue"}</span>
                <span aria-hidden="true">|</span>
                <span>{issue.date}</span>
              </p>
              <h2 className="newsletter-card-title-final">{issue.title}</h2>
              <p className="newsletter-card-copy-final">{issue.summary}</p>
              <NewsletterArticlePrompt type="mid" />
              <NewsletterArticlePrompt type="social" />
              <NewsletterArticlePrompt type="end" />
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
