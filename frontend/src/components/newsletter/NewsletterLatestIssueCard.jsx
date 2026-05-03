import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

  // Split for gate - show first 50% then gate
  const gatePosition = Math.floor(bodyParagraphs.length * 0.5);
  const firstHalfParagraphs = bodyParagraphs.slice(0, gatePosition);
  const secondHalfParagraphs = bodyParagraphs.slice(gatePosition);
  const shouldShowGate = bodyParagraphs.length > 5 && secondHalfParagraphs.length > 0;

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
      <section style={{ padding: "4rem 0", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem" }}>
          <article style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
            <h2 className="section-title-final" style={{ fontSize: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>Latest Research</h2>
            <h3 style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#121212",
              marginBottom: "1rem"
            }}>No published research yet</h3>
            <p style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "1rem",
              color: "#6b7280",
              lineHeight: "1.6"
            }}>
              The next research note will appear here once published.
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
    <section style={{ padding: "4rem 0", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem" }}>
        <h2 className="section-title-final" style={{ fontSize: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>Latest Research</h2>

        {/* Article Metadata */}
        <div style={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
          fontFamily: "Inter, sans-serif"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ 
              fontSize: "0.8125rem",
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }}>
              {issue.volume} <span style={{ color: "#d1d5db" }}>|</span> Market Note
            </div>
            <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {issue.date}
            </div>
          </div>
          <Link to={`/newsletter/${issue.id}`} style={{ textDecoration: "none" }}>
            <Button type="button" size="sm">
              View Full Report →
            </Button>
          </Link>
        </div>

        <article style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
          {/* Headline */}
          <h2 style={{ 
            fontSize: "2rem",
            fontWeight: "700",
            lineHeight: "1.15",
            color: "#121212",
            margin: "0 0 1rem 0",
            letterSpacing: "-0.02em"
          }}>
            {issue.title}
          </h2>

          {/* Analyst Attribution */}
          <div style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9375rem",
            color: "#121212",
            fontWeight: "600",
            marginBottom: "0.25rem"
          }}>
            {issue?.author?.name || "Vihaan Kakani"}
          </div>
          <div style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8125rem",
            color: "#6b7280",
            marginBottom: "2rem"
          }}>
            {issue?.author?.role || "Research Analyst"}, Echelon Equity
          </div>

          {/* Executive Summary */}
          <div style={{
            margin: "0 0 2.5rem 0",
            padding: "1.5rem 0",
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <p style={{ 
              fontSize: "1.125rem", 
              lineHeight: "1.7", 
              color: "#374151",
              margin: 0,
              fontWeight: "400"
            }}>
              {issue.summary}
            </p>
          </div>

          {/* Key Findings */}
          {highlights.length > 0 && (
            <aside style={{ 
              margin: "2.5rem 0", 
              padding: "1.5rem",
              backgroundColor: "#fafafa",
              borderLeft: "3px solid #000",
              fontFamily: "Inter, sans-serif"
            }}>
              <h3 style={{ 
                fontSize: "0.6875rem", 
                margin: "0 0 1rem 0", 
                fontWeight: "700", 
                textTransform: "uppercase", 
                letterSpacing: "0.15em", 
                color: "#000"
              }}>
                Key Findings
              </h3>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                {highlights.map((highlight, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: "0.75rem", 
                    lineHeight: "1.5", 
                    color: "#121212",
                    fontSize: "0.875rem",
                    paddingLeft: "1rem",
                    position: "relative"
                  }}>
                    <span style={{ position: "absolute", left: 0, color: "#000", fontWeight: "700" }}>•</span>
                    {highlight.text || highlight}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Article Body - First Half */}
          {!isReading && firstHalfParagraphs.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              {firstHalfParagraphs.map((paragraph, idx) => (
                <p key={`first-${idx}`} style={{ 
                  fontSize: "1rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.25rem",
                  color: "#121212"
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Inline Reading Mode */}
          {isReading && (
            <section aria-label="Full article content">
              {firstHalfParagraphs.map((paragraph, idx) => (
                <p key={`read-first-${idx}`} style={{ 
                  fontSize: "1rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.25rem",
                  color: "#121212"
                }}>
                  {paragraph}
                </p>
              ))}

              {/* Gate */}
              {showGate && shouldShowGate ? (
                <div style={{ 
                  margin: "3rem 0",
                  padding: "2.5rem 2rem",
                  borderTop: "4px solid #000",
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "#fafafa",
                  textAlign: "center",
                  fontFamily: "Inter, sans-serif"
                }}>
                  <h3 style={{ 
                    fontFamily: "Georgia, 'Times New Roman', Times, serif",
                    fontSize: "1.5rem", 
                    margin: "0 0 1rem 0", 
                    fontWeight: "700",
                    color: "#121212"
                  }}>
                    Access Full Report
                  </h3>
                  <p style={{ 
                    margin: "0 0 1.5rem 0", 
                    fontSize: "1rem", 
                    lineHeight: "1.6", 
                    color: "#4b5563"
                  }}>
                    Join Echelon to view complete research, source notes, and future publications.
                  </p>
                  <NewsletterSignupForm 
                    onSuccess={handleUnlockSuccess}
                    buttonLabel="Get Access"
                    helperText=""
                  />
                  <p style={{ 
                    marginTop: "1rem", 
                    fontSize: "0.75rem", 
                    color: "#9ca3af"
                  }}>
                    Free access. Research updates delivered periodically.
                  </p>
                </div>
              ) : (
                <>
                  {secondHalfParagraphs.map((paragraph, idx) => (
                    <p key={`second-${idx}`} style={{ 
                      fontSize: "1rem", 
                      lineHeight: "1.8", 
                      marginBottom: "1.25rem",
                      color: "#121212"
                    }}>
                      {paragraph}
                    </p>
                  ))}
                  
                  {/* Sources Footer */}
                  <footer style={{ 
                    marginTop: "3rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #e5e7eb",
                    fontFamily: "Inter, sans-serif"
                  }}>
                    <h4 style={{ 
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "#6b7280",
                      marginBottom: "1rem",
                      fontWeight: "600"
                    }}>
                      Sources & Disclosures
                    </h4>
                    <ul style={{ 
                      fontSize: "0.8125rem",
                      color: "#6b7280",
                      lineHeight: "1.7",
                      padding: 0,
                      margin: 0,
                      listStyle: "none"
                    }}>
                      <li style={{ marginBottom: "0.5rem" }}>• Federal Reserve Economic Data</li>
                      <li style={{ marginBottom: "0.5rem" }}>• EY Q1 2026 IPO Review</li>
                      <li style={{ marginBottom: "0.5rem" }}>• Company filings and earnings releases</li>
                      <li style={{ marginBottom: "0.5rem" }}>• Public market data and exchange filings</li>
                      <li style={{ color: "#9ca3af", fontStyle: "italic" }}>
                        This research is for informational purposes only and does not constitute investment advice.
                      </li>
                    </ul>
                  </footer>
                </>
              )}
            </section>
          )}

          {/* Read Full Report Button */}
          {!isReading && canReadFullArticle && (
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Button
                type="button"
                onClick={handleStartReading}
                style={{ padding: "0.75rem 1.5rem" }}
              >
                View Full Report
              </Button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default NewsletterLatestIssueCard;
