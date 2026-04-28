import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewsletterSignupForm from "../components/newsletter/NewsletterSignupForm";
import SEO from "../components/SEO";
import { fetchIssueById } from "../services/newsletterIssueService";
import { hasSignedUp as checkSignedUp, markAsSignedUp } from "../utils/newsletterPersistence";

const NewsletterIssueDetail = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const loadIssue = async () => {
      setLoading(true);
      setError(null);

      const result = await fetchIssueById(issueId);
      
      if (!result.success) {
        setError(result.error || "Failed to load issue");
        setIssue(null);
      } else {
        setIssue(result.issue);
      }

      setLoading(false);
    };

    // Check signup state from localStorage
    setHasSignedUp(checkSignedUp());

    if (issueId) {
      loadIssue();
    }
  }, [issueId]);

  const handleSignupSuccess = (email) => {
    markAsSignedUp();
    setHasSignedUp(true);
    setShowGate(false);
  };

  if (loading) {
    return (
      <div className="page-shell-final page-shell-padded-final" data-testid="issue-loading">
        <div className="content-container-final">
          <p>Loading issue...</p>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="page-shell-final page-shell-padded-final" data-testid="issue-error">
        <div className="content-container-final">
          <p className="form-helper-text" style={{ color: "#b42318" }}>
            {error || "Issue not found"}
          </p>
          <Link to="/newsletter/archive" className="page-intro-link-final">
            Return to Archive
          </Link>
        </div>
      </div>
    );
  }

  // Split body content for the gate - show first 50% then gate
  const bodyContent = issue.body || "";
  const bodyParagraphs = bodyContent.split(/\n\n+/).filter(p => p.trim());
  const gatePosition = Math.floor(bodyParagraphs.length * 0.5);
  const firstHalfParagraphs = bodyParagraphs.slice(0, gatePosition);
  const secondHalfParagraphs = bodyParagraphs.slice(gatePosition);
  
  // Only show gate if content is long enough (more than 5 paragraphs)
  const shouldShowGate = bodyParagraphs.length > 5 && secondHalfParagraphs.length > 0;

  // SEO metadata
  const seoTitle = `${issue.title} | ${issue.volume} | Echelon Equity`;
  const seoDescription = issue.summary || "Echelon Equity Research. Market notes, equity research, and investment analysis built to institutional standards.";
  const seoUrl = `${window.location.origin}/newsletter/${issueId}`;
  const seoImage = "https://echelonequity.co/og-image.png"; // Default OG image
  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: issue.title,
    description: issue.summary,
    datePublished: issue.created_at,
    dateModified: issue.updated_at,
    author: {
      "@type": "Organization",
      name: "Echelon Equity"
    },
    publisher: {
      "@type": "Organization",
      name: "Echelon Equity",
      logo: {
        "@type": "ImageObject",
        url: "https://echelonequity.co/logo.png"
      }
    },
    url: seoUrl
  };

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        ogImage={seoImage}
        canonical={seoUrl}
        schema={seoSchema}
      />
      <div className="page-shell-final page-shell-padded-final">
        {/* NYT-Style Header */}
        <header style={{ 
          maxWidth: "600px", 
          margin: "0 auto 3rem", 
          padding: "2rem 0 1.5rem",
          borderBottom: "1px solid #e5e7eb"
        }}>
          <Link 
            to="/newsletter/archive" 
            style={{ 
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              color: "#6b7280",
              textDecoration: "none",
              marginBottom: "2.5rem",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: "500"
            }}
            data-testid="back-to-archive"
          >
            ← Research Archive
          </Link>
          
          {/* Institutional Publication Header */}
          <div style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6875rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#000",
            fontWeight: "700",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e5e7eb"
          }}>
            Echelon Equity Research
          </div>

          {/* Article Metadata Block */}
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "2rem",
            fontFamily: "Inter, sans-serif"
          }}>
            <div style={{ 
              fontSize: "0.8125rem",
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            }} data-testid="issue-volume">
              {issue.volume} <span style={{ color: "#d1d5db" }}>|</span> Market Note
            </div>
            <div style={{ 
              fontSize: "0.875rem",
              color: "#6b7280"
            }} data-testid="issue-date">
              {issue.date}
            </div>
          </div>

          {/* Headline - NYT Style */}
          <h1 
            data-testid="issue-title"
            style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "2.5rem",
              fontWeight: "700",
              lineHeight: "1.1",
              color: "#121212",
              margin: "0 0 1rem 0",
              letterSpacing: "-0.02em"
            }}
          >
            {issue.title}
          </h1>

          {/* Institutional Analyst Attribution */}
          <div style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9375rem",
            color: "#121212",
            fontWeight: "600",
            marginTop: "1.5rem",
            marginBottom: "0.25rem"
          }}>
            Vihaan Kakani
          </div>
          <div style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8125rem",
            color: "#6b7280",
            marginBottom: "2rem"
          }}>
            Research Analyst, Echelon Equity
          </div>
        </header>

        {/* Article Body - NYT Style */}
        <article style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          fontFamily: "Georgia, 'Times New Roman', Times, serif"
        }}>
          {/* Institutional Download Section */}
          {issue.file_attachment && (
            <div style={{ 
              margin: "3rem 0", 
              padding: "1.5rem",
              border: "1px solid #e5e7eb", 
              borderRadius: "0.5rem", 
              backgroundColor: "#fafafa",
              fontFamily: "Inter, sans-serif"
            }} data-testid="download-section">
              <div style={{ 
                display: "flex", 
                alignItems: "flex-start", 
                justifyContent: "space-between",
                gap: "1.5rem"
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: "700", 
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    margin: "0 0 0.5rem 0", 
                    color: "#374151" 
                  }}>
                    Full Research Report
                  </h3>
                  <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#121212", fontWeight: "500" }}>
                    {issue.file_attachment.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
                    {issue.file_attachment.type.toUpperCase()} · {(issue.file_attachment.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <a 
                  href={issue.file_attachment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.625rem 1.25rem",
                    backgroundColor: "#000",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "0.375rem",
                    fontSize: "0.8125rem",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    whiteSpace: "nowrap"
                  }}
                  data-testid="download-button"
                >
                  Download Report
                </a>
              </div>
            </div>
          )}

          {/* Executive Summary / Deck */}
          <div style={{
            margin: "0 0 3rem 0",
            padding: "2rem 0",
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <p style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "1.25rem", 
              lineHeight: "1.7", 
              color: "#374151",
              margin: 0,
              fontWeight: "400"
            }}>
              {issue.summary}
            </p>
          </div>

          {/* Key Highlights - Institutional Style */}
          {issue.highlights && issue.highlights.length > 0 && (
            <aside style={{ 
              margin: "3rem 0", 
              padding: "2rem",
              backgroundColor: "#fafafa",
              borderLeft: "3px solid #000",
              fontFamily: "Inter, sans-serif"
            }}>
              <h3 style={{ 
                fontSize: "0.6875rem", 
                margin: "0 0 1.5rem 0", 
                fontWeight: "700", 
                textTransform: "uppercase", 
                letterSpacing: "0.15em", 
                color: "#000"
              }}>
                Key Findings
              </h3>
              <ul style={{ 
                padding: 0, 
                margin: 0,
                listStyle: "none"
              }}>
                {issue.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: "0.875rem", 
                    lineHeight: "1.5", 
                    color: "#121212",
                    fontSize: "0.9375rem",
                    paddingLeft: "1.25rem",
                    position: "relative"
                  }}>
                    <span style={{ 
                      position: "absolute",
                      left: 0,
                      color: "#000",
                      fontWeight: "700"
                    }}>•</span>
                    {highlight.text || highlight}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Article Body - First Half */}
          {firstHalfParagraphs.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              {firstHalfParagraphs.map((paragraph, idx) => (
                <p key={`first-${idx}`} style={{ 
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                  fontSize: "1.0625rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.25rem",
                  color: "#121212"
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Institutional Access Gate */}
          {!hasSignedUp && shouldShowGate && secondHalfParagraphs.length > 0 && (
            <div 
              data-testid="signup-gate"
              style={{ 
                margin: "4rem 0",
                padding: "3rem 2.5rem",
                borderTop: "4px solid #000",
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: "#fafafa",
                textAlign: "center",
                fontFamily: "Inter, sans-serif"
              }}
            >
              <h2 style={{ 
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontSize: "1.75rem", 
                margin: "0 0 1rem 0", 
                fontWeight: "700",
                color: "#121212"
              }}>
                Access Full Report
              </h2>
              <p style={{ 
                margin: "0 0 2rem 0", 
                fontSize: "1rem", 
                lineHeight: "1.6", 
                color: "#4b5563",
                maxWidth: "450px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                Join Echelon to view complete research, source notes, and future publications.
              </p>
              <NewsletterSignupForm 
                onSuccess={handleSignupSuccess}
                buttonLabel="Get Access"
                helperText=""
              />
              <p style={{ 
                marginTop: "1.25rem", 
                fontSize: "0.75rem", 
                color: "#9ca3af"
              }}>
                Free access. Research updates delivered periodically.
              </p>
            </div>
          )}

          {/* Article Body - Second Half */}
          {(hasSignedUp || !secondHalfParagraphs.length) && secondHalfParagraphs.length > 0 && (
            <div style={{ marginTop: "2rem" }} data-testid="issue-second-half">
              {secondHalfParagraphs.map((paragraph, idx) => (
                <p key={`second-${idx}`} style={{ 
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                  fontSize: "1.0625rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.25rem",
                  color: "#121212"
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Sources Section - Only shown when unlocked */}
          {(hasSignedUp || !secondHalfParagraphs.length) && (
            <footer style={{ 
              marginTop: "4rem",
              paddingTop: "2rem",
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
                <li style={{ marginBottom: "0.5rem", color: "#9ca3af", fontStyle: "italic" }}>
                  This research is for informational purposes only and does not constitute investment advice.
                </li>
              </ul>
            </footer>
          )}
        </article>
      </div>
    </>
  );
};

export default NewsletterIssueDetail;
