import React, { useEffect, useState } from "react";
import NewsletterSignupForm from "../components/newsletter/NewsletterSignupForm";
import NewsletterBenefits from "../components/newsletter/NewsletterBenefits";
import NewsletterLatestIssueCard from "../components/newsletter/NewsletterLatestIssueCard";
import NewsletterArchiveTeaser from "../components/newsletter/NewsletterArchiveTeaser";
import NewsletterDisclaimer from "../components/newsletter/NewsletterDisclaimer";
import { fetchPublishedIssues } from "../services/newsletterIssueService";

const Newsletter = () => {
  const [latestIssue, setLatestIssue] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadIssues = async () => {
      const result = await fetchPublishedIssues();
      if (!isMounted) return;
      setLatestIssue(result.issues[0] || null);
    };

    loadIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-shell-final newsletter-page-final">
      <section className="newsletter-hero-section-final">
        <div className="content-container-final newsletter-hero-grid-final">
          <div className="newsletter-hero-copy-final">
            <p className="page-intro-eyebrow-final">Echelon Newsletter</p>
            <h1 className="newsletter-hero-title-final">Research, not noise</h1>
            <p className="newsletter-hero-subheadline-final">
              Weekly student-led equity research, market notes, and memo highlights built for readers who value process over hype.
            </p>
          </div>
          <aside className="newsletter-signup-panel-final" aria-label="Newsletter signup">
            <h2 className="newsletter-signup-title-final">Join the mailing list</h2>
            <p className="newsletter-signup-copy-final">
              Receive each issue directly with no algorithm between you and the work.
            </p>
            <NewsletterSignupForm />
          </aside>
        </div>
      </section>

      <NewsletterBenefits />
      <NewsletterLatestIssueCard issue={latestIssue || undefined} />
      <NewsletterArchiveTeaser />
      <NewsletterDisclaimer />
    </div>
  );
};

export default Newsletter;
