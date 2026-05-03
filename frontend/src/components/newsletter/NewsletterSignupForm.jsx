import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { API_BASE_URL } from "../../services/apiBaseUrl";
import { trackNewsletterEvent } from "../../services/newsletterAnalytics";
import { useNavigate } from "react-router-dom";

const API_URL = API_BASE_URL;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatErrorDetail(detail) {
  if (!detail) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (item && typeof item === "object" && item.msg ? item.msg : JSON.stringify(item)))
      .join("; ");
  }
  if (typeof detail === "object") {
    return detail.message || JSON.stringify(detail);
  }

  return String(detail);
}

const NewsletterSignupForm = ({
  source = "homepage",
  segment = null,
  buttonLabel = "Subscribe",
  placeholder = "name@school.edu",
  helperText = "Weekly notes. No spam. Unsubscribe anytime.",
  className = "",
  compact = false,
  onSuccess = null,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasStartedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackNewsletterEvent({
      event: "newsletter_form_view",
      source,
      segment,
      status: "view",
    });
  }, [source, segment]);

  const handleFirstInteraction = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackNewsletterEvent({
      event: "newsletter_form_start",
      source,
      segment,
      status: "start",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Enter a valid email address.");
      trackNewsletterEvent({
        event: "newsletter_submit_error",
        source,
        segment,
        status: "invalid_email",
      });
      return;
    }

    setIsSubmitting(true);
    trackNewsletterEvent({
      event: "newsletter_submit_attempt",
      source,
      segment,
      status: "attempt",
    });

    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          source,
          segment,
        }),
      });

      const responseText = await response.text();
      let result;

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        toast.error("Invalid server response. Please try again.");
        return;
      }

      if (response.ok && result.success) {
        toast.success(result.message || "You are subscribed to Echelon market notes.");
        trackNewsletterEvent({
          event: "newsletter_submit_success",
          source,
          segment,
          status: "success",
          requestId: result.request_id || null,
        });
        setEmail("");
        hasStartedRef.current = false;
        
        // Redirect to confirmation page
        const confirmationUrl = `/newsletter/confirmation?email=${encodeURIComponent(normalizedEmail)}&source=${source}`;
        navigate(confirmationUrl);
        
        if (typeof onSuccess === "function") {
          onSuccess(normalizedEmail);
        }
        return;
      }

      if (response.status === 409 || result?.error?.code === "already_subscribed") {
        toast.error("This email is already subscribed.");
        trackNewsletterEvent({
          event: "newsletter_submit_duplicate",
          source,
          segment,
          status: "duplicate",
          requestId: result.request_id || null,
        });
        return;
      }

      if (response.status === 429 || result?.error?.code === "rate_limited") {
        toast.error("Too many attempts. Please try again later.");
        trackNewsletterEvent({
          event: "newsletter_submit_error",
          source,
          segment,
          status: "rate_limited",
          requestId: result.request_id || null,
        });
        return;
      }

      toast.error(formatErrorDetail(result?.error?.message || result?.detail) || "Signup failed. Please try again.");
      trackNewsletterEvent({
        event: "newsletter_submit_error",
        source,
        segment,
        status: "api_error",
        requestId: result?.request_id || null,
      });
    } catch (error) {
      console.error("Newsletter signup error", error);
      toast.error("Network error. Please check your connection and try again.");
      trackNewsletterEvent({
        event: "newsletter_submit_error",
        source,
        segment,
        status: "network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={`newsletter-signup-form-final ${compact ? "newsletter-signup-form-compact-final" : ""} ${className}`.trim()}
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor={`newsletter-email-${source}`} className="newsletter-signup-label-final">
        Email Address
      </label>
      <div className="newsletter-signup-row-final">
        <Input
          id={`newsletter-email-${source}`}
          type="email"
          autoComplete="email"
          className="newsletter-email-input-final form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={(event) => setEmail(event.target.value.trim())}
          onFocus={handleFirstInteraction}
          placeholder={placeholder}
          required
        />
        <Button type="submit" className="newsletter-submit-btn-final" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : buttonLabel}
        </Button>
      </div>
      {helperText ? <p className="newsletter-signup-meta-final">{helperText}</p> : null}
    </form>
  );
};

export default NewsletterSignupForm;
