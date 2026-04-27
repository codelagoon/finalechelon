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
  const seoDescription = issue.summary || "Research, not noise. Weekly student-led equity research, market notes, and memo highlights.";
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
      <section className="page-intro-section-final">
        <div className="content-container-final">
          <Link to="/newsletter/archive" className="page-intro-link-final" data-testid="back-to-archive">
            ← Back to Archive
          </Link>
          <p className="page-intro-eyebrow-final" style={{ marginTop: "1rem" }} data-testid="issue-volume">
            {issue.volume}
          </p>
          <h1 className="page-intro-title-final" data-testid="issue-title">{issue.title}</h1>
          <p className="page-intro-lead-final" data-testid="issue-date">{issue.date}</p>
        </div>
      </section>

      <section className="content-container-final" style={{ display: "grid", gap: "2rem" }}>
        <article className="newsletter-benefit-card-final" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {issue.file_attachment && (
            <div style={{ marginBottom: "2rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem", backgroundColor: "#f9fafb" }} data-testid="download-section">
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>Research Report</h3>
              <p style={{ marginBottom: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
                {issue.file_attachment.name} · {issue.file_attachment.type.toUpperCase()}
              </p>
              <a 
                href={issue.file_attachment.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#000",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                  fontWeight: "500"
                }}
                data-testid="download-button"
              >
                Download Full Research Report
              </a>
            </div>
          )}

          <div style={{ 
            fontSize: "1.25rem", 
            lineHeight: "1.8", 
            color: "#374151",
            marginBottom: "2rem",
            fontWeight: "400"
          }}>
            {issue.summary}
          </div>

          {issue.highlights && issue.highlights.length > 0 && (
            <div style={{ marginTop: "3rem", marginBottom: "3rem", padding: "2rem", backgroundColor: "#f8fafc", borderRadius: "0.5rem", borderLeft: "4px solid #000" }}>
              <h3 className="section-title-final" style={{ fontSize: "1.125rem", marginBottom: "1.5rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280" }}>
                Key Highlights
              </h3>
              <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
                {issue.highlights.map((highlight, idx) => (
                  <li key={idx} style={{ marginBottom: "1rem", lineHeight: "1.7", color: "#1f2937" }}>
                    {highlight.text || highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {firstHalfParagraphs.length > 0 && (
            <div style={{ marginTop: "3rem" }}>
              {firstHalfParagraphs.map((paragraph, idx) => (
                <p key={`first-${idx}`} style={{ 
                  fontSize: "1.125rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.5rem",
                  color: "#1f2937",
                  textAlign: "justify"
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {!hasSignedUp && shouldShowGate && secondHalfParagraphs.length > 0 && (
            <div 
              data-testid="signup-gate"
              style={{ 
                marginTop: "4rem", 
                padding: "3rem 2rem", 
                border: "2px solid #e5e7eb", 
                borderRadius: "1rem",
                backgroundColor: "#f9fafb",
                textAlign: "center"
              }}
            >
              <h2 className="section-title-final" style={{ fontSize: "1.75rem", marginBottom: "1rem", fontWeight: "700" }}>
                Continue Reading
              </h2>
              <p className="newsletter-card-copy-final" style={{ marginBottom: "2rem", fontSize: "1.125rem", lineHeight: "1.6", color: "#4b5563" }}>
                Join our newsletter to read the full analysis and get future issues delivered to your inbox.
              </p>
              <NewsletterSignupForm 
                onSuccess={handleSignupSuccess}
                buttonLabel="Subscribe to Continue"
                helperText=""
              />
              <p className="form-helper-text" style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
                Free subscription. Unsubscribe anytime.
              </p>
            </div>
          )}

          {(hasSignedUp || !secondHalfParagraphs.length) && secondHalfParagraphs.length > 0 && (
            <div style={{ marginTop: "3rem" }} data-testid="issue-second-half">
              {secondHalfParagraphs.map((paragraph, idx) => (
                <p key={`second-${idx}`} style={{ 
                  fontSize: "1.125rem", 
                  lineHeight: "1.8", 
                  marginBottom: "1.5rem",
                  color: "#1f2937",
                  textAlign: "justify"
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
    </>
  );
};

export default NewsletterIssueDetail;
