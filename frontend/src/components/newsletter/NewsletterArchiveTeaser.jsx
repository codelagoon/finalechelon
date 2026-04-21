import React from "react";
import { Link } from "react-router-dom";

const NewsletterArchiveTeaser = () => {
  return (
    <section className="newsletter-archive-section-final">
      <div className="content-container-final newsletter-archive-panel-final">
        <div>
          <p className="newsletter-archive-eyebrow-final">Archive</p>
          <h2 className="newsletter-section-title-final">Browse past letters and memo excerpts</h2>
          <p className="newsletter-card-copy-final">
            Review previous issues to follow how our thesis quality evolves over time.
          </p>
        </div>
        <Link to="/newsletter/archive" className="page-cta-button-final page-cta-button-dark-final">
          Open Newsletter Archive
        </Link>
      </div>
    </section>
  );
};

export default NewsletterArchiveTeaser;
