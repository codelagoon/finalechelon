import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div style={{ padding: "2rem 0 4rem" }}>
      {/* Institutional Header */}
      <header style={{ 
        maxWidth: "800px", 
        margin: "0 auto 3rem", 
        padding: "0 1rem"
      }}>
        <Link 
          to="/newsletter" 
          style={{ 
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "#6b7280",
            textDecoration: "none",
            marginBottom: "2rem",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: "500"
          }}
        >
          ← Research
        </Link>

        {/* Institutional Publication Header */}
        <div style={{ 
          fontFamily: "Inter, sans-serif",
          fontSize: "0.6875rem",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#000",
          fontWeight: "700",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e5e7eb"
        }}>
          Echelon Equity Research
        </div>

        <h1 style={{ 
          fontFamily: "Georgia, 'Times New Roman', Times, serif",
          fontSize: "2.5rem",
          fontWeight: "700",
          lineHeight: "1.1",
          color: "#121212",
          margin: "0 0 1rem 0",
          letterSpacing: "-0.02em"
        }}>
          Research Archive
        </h1>

        <p style={{ 
          fontFamily: "Inter, sans-serif",
          fontSize: "1.125rem",
          lineHeight: "1.6",
          color: "#6b7280",
          margin: "0 0 1.5rem 0"
        }}>
          A complete index of market notes, equity research, and investment analysis from the Echelon team.
        </p>

        <Link 
          to="/newsletter/admin" 
          style={{ 
            fontFamily: "Inter, sans-serif",
            fontSize: "0.8125rem",
            color: "#6b7280",
            textDecoration: "none"
          }}
        >
          Admin Tools →
        </Link>
      </header>

      {/* Archive List */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        {!archivedIssues.length ? (
          <article style={{ 
            padding: "3rem",
            backgroundColor: "#fafafa",
            borderRadius: "0.5rem",
            textAlign: "center",
            fontFamily: "Inter, sans-serif"
          }}>
            <h2 style={{ 
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "0.75rem"
            }}>No published research yet</h2>
            <p style={{ 
              fontSize: "0.9375rem",
              color: "#6b7280",
              margin: 0
            }}>Check back soon for new research notes.</p>
          </article>
        ) : null}

        {archivedIssues.map((issue, index) => (
          <article 
            key={issue.id} 
            style={{ 
              padding: "2rem 0",
              borderBottom: index === archivedIssues.length - 1 ? "none" : "1px solid #e5e7eb"
            }}
          >
            {/* Article Metadata */}
            <div style={{ 
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
              fontFamily: "Inter, sans-serif"
            }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ 
                  fontSize: "0.8125rem",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }}>
                  {issue.volume}
                </span>
                <span style={{ color: "#d1d5db" }}>|</span>
                <span style={{ 
                  fontSize: "0.8125rem",
                  color: "#6b7280"
                }}>
                  {issue.date}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "1.5rem",
              fontWeight: "700",
              lineHeight: "1.2",
              color: "#121212",
              margin: "0 0 0.75rem 0",
              letterSpacing: "-0.01em"
            }}>
              {issue.title}
            </h2>

            {/* Summary */}
            <p style={{ 
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#4b5563",
              margin: "0 0 1.5rem 0"
            }}>
              {issue.summary}
            </p>

            {/* CTA */}
            <Link 
              to={`/newsletter/${issue.id}`}
              style={{ 
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#000",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0"
              }}
            >
              View Full Report →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default NewsletterArchive;
