import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NewsletterArticlePrompt from "./NewsletterArticlePrompt";
import NewsletterSignupForm from "./NewsletterSignupForm";
import { Button } from "../ui/button";
import { trackNewsletterEvent } from "../../services/newsletterAnalytics";

const ARTICLE_ACCESS_STORAGE_KEY = "echelon_newsletter_full_article_access";
const ARTICLE_GATE_DELAY_MS = 5000;

const NewsletterLatestIssueCard = ({ issue = null }) => {
  const [isReading, setIsReading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(ARTICLE_ACCESS_STORAGE_KEY) === "true";
  });
  const [showGate, setShowGate] = useState(false);
  const gateTimerRef = useRef(null);

  const bodyParagraphs = useMemo(() => {
    const bodyText = String(issue?.body || "").trim();
    if (!bodyText) return [];

    return bodyText
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [issue?.body]);

  useEffect(() => {
    if (!isReading || isUnlocked) {
      setShowGate(false);
      return;
    }

    gateTimerRef.current = window.setTimeout(() => {
      setShowGate(true);
      trackNewsletterEvent({
        event: "newsletter_article_gate_shown",
        source: "newsletter_latest_issue",
        segment: issue?.id || "latest",
        status: "shown",
      });
    }, ARTICLE_GATE_DELAY_MS);

    return () => {
      if (gateTimerRef.current) {
        window.clearTimeout(gateTimerRef.current);
      }
    };
  }, [isReading, isUnlocked, issue?.id]);

  useEffect(() => {
    setIsReading(false);
    setShowGate(false);
  }, [issue?.id]);

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
  const canReadFullArticle = bodyParagraphs.length > 0;

  const handleStartReading = () => {
    setIsReading(true);
    setShowGate(false);
    trackNewsletterEvent({
      event: "newsletter_article_read_start",
      source: "newsletter_latest_issue",
      segment: issue?.id || "latest",
      status: "started",
    });
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setShowGate(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ARTICLE_ACCESS_STORAGE_KEY, "true");
    }

    trackNewsletterEvent({
      event: "newsletter_article_gate_unlocked",
      source: "newsletter_latest_issue",
      segment: issue?.id || "latest",
      status: "unlocked",
    });
  };

  return (
    <section className="newsletter-latest-section-final">
      <div className="content-container-final">
        <article className="newsletter-issue-card-final">
          <NewsletterArticlePrompt type="top" />
          <div className="newsletter-issue-meta-final">
            <span>{issue.volume}</span>
            <span aria-hidden="true">|</span>
            <span>{issue.date}</span>
          </div>
          <h2 className="newsletter-issue-title-final">Latest Issue Preview</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between" }}>
            <h3 className="newsletter-card-title-final newsletter-card-title-issue-final" style={{ margin: 0 }}>{issue.title}</h3>
            <Link to={`/newsletter/${issue.id}`} className="newsletter-read-full-page-btn-final">
              <Button type="button" size="sm">
                Read Full Issue →
              </Button>
            </Link>
          </div>
          <p className="newsletter-card-copy-final newsletter-issue-summary-final">{issue.summary}</p>
          <NewsletterArticlePrompt type="mid" />
          {highlights.length ? (
            <ul className="newsletter-highlight-list-final" aria-label="Latest issue highlights">
              {highlights.map((highlight, index) => (
                <li key={`${highlight}-${index}`} className="newsletter-highlight-item-final">
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          {canReadFullArticle ? (
            <div className="newsletter-full-article-action-final">
              <Button
                type="button"
                className="newsletter-read-full-btn-final"
                onClick={handleStartReading}
              >
                {isReading ? "Continue Reading" : "Read Full Article"}
              </Button>
            </div>
          ) : null}

          {isReading && canReadFullArticle ? (
            <section className={`newsletter-full-article-shell-final ${showGate ? "newsletter-full-article-locked-final" : ""}`} aria-label="Full article content">
              <h4 className="newsletter-full-article-title-final">Full Article</h4>
              <div className="newsletter-full-article-content-final" aria-hidden={showGate ? "true" : "false"}>
                {bodyParagraphs.map((paragraph, index) => (
                  <p key={`${issue.id}-paragraph-${index}`} className="newsletter-full-article-paragraph-final">
                    {paragraph}
                  </p>
                ))}
              </div>

              {showGate ? (
                <aside className="newsletter-full-article-gate-final" aria-label="Email gate for full newsletter article">
                  <p className="newsletter-full-article-gate-eyebrow-final">Continue Reading</p>
                  <h5 className="newsletter-full-article-gate-title-final">Enter your email for full access</h5>
                  <p className="newsletter-full-article-gate-copy-final">
                    Join the list to unlock this issue and upcoming market letters.
                  </p>
                  <NewsletterSignupForm
                    source="newsletter-article-gate"
                    segment={issue.id || "latest"}
                    buttonLabel="Unlock Article"
                    helperText="One step unlock. You can unsubscribe anytime."
                    compact
                    onSuccess={handleUnlockSuccess}
                  />
                </aside>
              ) : null}
            </section>
          ) : null}

          <NewsletterArticlePrompt type="social" />
          <NewsletterArticlePrompt type="end" />
        </article>
      </div>
    </section>
  );
};

export default NewsletterLatestIssueCard;
