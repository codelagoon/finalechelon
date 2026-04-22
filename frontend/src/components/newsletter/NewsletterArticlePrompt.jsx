import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../seo/siteConfig";

const NewsletterArticlePrompt = ({ type = "top" }) => {
  if (type === "social") {
    return (
      <aside className="newsletter-article-prompt-final newsletter-article-prompt-social-final" aria-label="Follow Echelon on social platforms">
        <p className="newsletter-article-prompt-title-final">Follow the research in real time</p>
        <p className="newsletter-article-prompt-copy-final">Get quick market takes and weekly highlights on LinkedIn and TikTok.</p>
        <div className="newsletter-article-social-row-final">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="newsletter-article-social-link-final">
            LinkedIn
          </a>
          <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="newsletter-article-social-link-final">
            TikTok
          </a>
        </div>
      </aside>
    );
  }

  if (type === "end") {
    return (
      <aside className="newsletter-article-prompt-final newsletter-article-prompt-apply-final" aria-label="Apply to Echelon">
        <p className="newsletter-article-prompt-title-final">Build the work, not just the resume</p>
        <p className="newsletter-article-prompt-copy-final">If this is the standard you want to practice, join the analyst pipeline.</p>
        <Link to="/apply" className="newsletter-article-primary-link-final">
          Apply to Echelon
        </Link>
      </aside>
    );
  }

  if (type === "mid") {
    return (
      <aside className="newsletter-article-prompt-final newsletter-article-prompt-mid-final" aria-label="In-article newsletter call to action">
        <p className="newsletter-article-prompt-title-final">Like this issue?</p>
        <p className="newsletter-article-prompt-copy-final">Get every release in your inbox before it hits the archive.</p>
        <Link to="/newsletter" className="newsletter-article-secondary-link-final">
          Join the Newsletter
        </Link>
      </aside>
    );
  }

  return (
    <aside className="newsletter-article-prompt-final newsletter-article-prompt-top-final" aria-label="Top-of-article newsletter call to action">
      <p className="newsletter-article-prompt-title-final">Newsletter</p>
      <p className="newsletter-article-prompt-copy-final">Subscribe for weekly market notes and memo highlights.</p>
      <Link to="/newsletter" className="newsletter-article-secondary-link-final">
        Subscribe for Free
      </Link>
    </aside>
  );
};

export default NewsletterArticlePrompt;
