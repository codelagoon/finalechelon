import React from "react";
import NewsletterSignupForm from "./NewsletterSignupForm";

const NewsletterSignupCta = ({
  eyebrow = "Newsletter",
  title,
  description,
  source,
  segment = null,
  buttonLabel = "Subscribe",
  helperText = "Weekly notes. No spam. Unsubscribe anytime.",
  compact = false,
  className = "",
}) => {
  return (
    <section className={`newsletter-cta-section-final ${className}`.trim()}>
      <div className="content-container-final">
        <div className={`newsletter-cta-panel-final ${compact ? "newsletter-cta-panel-compact-final" : ""}`}>
          <div className="newsletter-cta-copy-final">
            <p className="newsletter-cta-eyebrow-final">{eyebrow}</p>
            <h2 className="newsletter-cta-title-final">{title}</h2>
            <p className="newsletter-cta-description-final">{description}</p>
          </div>
          <div className="newsletter-cta-form-final">
            <NewsletterSignupForm
              source={source}
              segment={segment}
              buttonLabel={buttonLabel}
              helperText={helperText}
              compact={compact}
              placeholder="name@school.edu"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignupCta;
