import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import {
  createIssue,
  deleteIssue,
  fetchAllIssues,
  formToPayload,
  issueToForm,
  updateIssue,
} from "../services/newsletterAdminService";

const STORAGE_KEY = "echelon_newsletter_admin_token";

const initialCreateForm = {
  volume: "",
  date: "",
  title: "",
  summary: "",
  body: "",
  status: "draft",
  highlightsText: "",
};

function getStoredToken() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function setStoredToken(token) {
  try {
    if (!token) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Session storage may be unavailable in restricted environments.
  }
}

function issueKey(issue) {
  return issue?.id || `${issue?.volume || "issue"}-${issue?.date || "unknown"}`;
}

function formatApiErrorDetail(detail) {
  if (detail == null) return "Unknown error.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (item && typeof item === "object" && item.msg ? item.msg : JSON.stringify(item)))
      .join("; ");
  }
  if (typeof detail === "object") return detail.message || JSON.stringify(detail);
  return String(detail);
}

function IssueEditorCard({ issue, adminToken, onSaved, onDeleted }) {
  const [form, setForm] = useState(issueToForm(issue));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setForm(issueToForm(issue));
  }, [issue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!adminToken) {
      toast.error("Enter the admin token first.");
      return;
    }

    if (!form.volume.trim() || !form.date.trim() || !form.title.trim() || !form.summary.trim()) {
      toast.error("Volume, date, title, and summary are required.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = formToPayload(form);
      const result = await updateIssue(adminToken, issue.id, payload);

      if (!result.ok) {
        toast.error(formatApiErrorDetail(result.data?.detail || result.data?.error || "Failed to update issue."));
        return;
      }

      toast.success("Issue updated.");
      onSaved(result.data);
    } catch (error) {
      console.error("Update issue failed", error);
      toast.error("Network error while updating issue.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!adminToken) {
      toast.error("Enter the admin token first.");
      return;
    }

    const confirmed = window.confirm(`Delete ${issue.volume} (${issue.date})? This cannot be undone.`);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const result = await deleteIssue(adminToken, issue.id);

      if (!result.ok) {
        toast.error(formatApiErrorDetail(result.data?.detail || result.data?.error || "Failed to delete issue."));
        return;
      }

      toast.success("Issue deleted.");
      onDeleted(issue.id);
    } catch (error) {
      console.error("Delete issue failed", error);
      toast.error("Network error while deleting issue.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="newsletter-benefit-card-final">
      <form className="application-form-final" onSubmit={handleSave}>
        <div className="page-heading-final" style={{ marginBottom: 0 }}>
          <h2 className="section-title-final" style={{ fontSize: "1.25rem" }}>
            {issue.volume || "Untitled issue"}
          </h2>
          <p className="section-subtitle-final" style={{ marginBottom: 0 }}>
            {issue.date || "No date set"} · {issue.status || "draft"}
          </p>
        </div>

        <div className="form-group">
          <Label htmlFor={`volume-${issue.id}`} className="form-label">Volume</Label>
          <Input id={`volume-${issue.id}`} name="volume" value={form.volume} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <Label htmlFor={`date-${issue.id}`} className="form-label">Date</Label>
          <Input id={`date-${issue.id}`} name="date" value={form.date} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <Label htmlFor={`title-${issue.id}`} className="form-label">Title</Label>
          <Input id={`title-${issue.id}`} name="title" value={form.title} onChange={handleChange} className="form-input" required />
        </div>

        <div className="form-group">
          <Label htmlFor={`summary-${issue.id}`} className="form-label">Summary</Label>
          <Textarea id={`summary-${issue.id}`} name="summary" value={form.summary} onChange={handleChange} className="form-textarea" rows={3} required />
        </div>

        <div className="form-group">
          <Label htmlFor={`highlights-${issue.id}`} className="form-label">Highlights</Label>
          <Textarea
            id={`highlights-${issue.id}`}
            name="highlightsText"
            value={form.highlightsText}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            placeholder="One highlight per line"
          />
          <p className="form-helper-text">One highlight per line. Empty lines are ignored.</p>
        </div>

        <div className="form-group">
          <Label htmlFor={`body-${issue.id}`} className="form-label">Body</Label>
          <Textarea id={`body-${issue.id}`} name="body" value={form.body} onChange={handleChange} className="form-textarea" rows={5} />
        </div>

        <div className="form-group">
          <Label htmlFor={`status-${issue.id}`} className="form-label">Status</Label>
          <select id={`status-${issue.id}`} name="status" value={form.status} onChange={handleChange} className="form-input">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button type="submit" className="form-submit-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Issue"}
          </Button>
          <Button type="button" variant="outline" className="form-submit-btn" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Issue"}
          </Button>
        </div>
      </form>
    </article>
  );
}

const NewsletterAdmin = () => {
  const navigate = useNavigate();
  const [adminToken, setAdminToken] = useState(() => getStoredToken());
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [message, setMessage] = useState(null);

  const issueCountLabel = useMemo(() => {
    if (!issues.length) return "No issues loaded";
    return `${issues.length} issue${issues.length === 1 ? "" : "s"}`;
  }, [issues.length]);

  const loadIssues = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await fetchAllIssues();
      if (!result.success) {
        setMessage({ type: "error", text: result.error || "Failed to load issues." });
        return;
      }

      setIssues(result.issues);
    } catch (error) {
      console.error("Load issues failed", error);
      setMessage({ type: "error", text: "Network error while loading issues." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    setCreateForm((current) => ({ ...current, [name]: value }));
  };

  const handleTokenChange = (event) => {
    const value = event.target.value;
    setAdminToken(value);
    setStoredToken(value);
  };

  const handleSaveToken = (event) => {
    event.preventDefault();
    setStoredToken(adminToken.trim());
    toast.success(adminToken.trim() ? "Admin token saved for this browser session." : "Admin token cleared.");
  };

  const handleCreateIssue = async (event) => {
    event.preventDefault();

    if (!adminToken.trim()) {
      toast.error("Enter the admin token first.");
      return;
    }

    const payload = formToPayload(createForm);
    if (!payload.volume || !payload.date || !payload.title || !payload.summary) {
      toast.error("Volume, date, title, and summary are required.");
      return;
    }

    setIsCreating(true);

    try {
      const result = await createIssue(adminToken.trim(), payload);
      if (!result.ok) {
        toast.error(formatApiErrorDetail(result.data?.detail || result.data?.error || "Failed to create issue."));
        return;
      }

      toast.success("Issue created.");
      setCreateForm(initialCreateForm);
      await loadIssues();
    } catch (error) {
      console.error("Create issue failed", error);
      toast.error("Network error while creating issue.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleIssueSaved = (updatedIssue) => {
    setIssues((current) => current.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue)));
  };

  const handleIssueDeleted = (issueId) => {
    setIssues((current) => current.filter((issue) => issue.id !== issueId));
  };

  return (
    <div className="page-shell-final page-shell-padded-final">
      <section className="page-intro-section-final">
        <div className="content-container-final">
          <p className="page-intro-eyebrow-final">Newsletter Admin</p>
          <h1 className="page-intro-title-final">Manage newsletter issues</h1>
          <p className="page-intro-lead-final">
            Create, update, and remove newsletter issues from the browser. The token is stored only in this session.
          </p>
          <div className="page-intro-links-final">
            <button type="button" className="page-intro-link-final" onClick={() => navigate("/newsletter")}>Back to Newsletter</button>
            <button type="button" className="page-intro-link-final" onClick={loadIssues}>
              Refresh Issues
            </button>
          </div>
        </div>
      </section>

      <section className="content-container-final" style={{ display: "grid", gap: "1.5rem" }}>
        <article className="newsletter-benefit-card-final">
          <form className="application-form-final" onSubmit={handleSaveToken}>
            <div className="form-group">
              <Label htmlFor="admin-token" className="form-label">Admin Token</Label>
              <Input
                id="admin-token"
                type="password"
                value={adminToken}
                onChange={handleTokenChange}
                className="form-input"
                placeholder="Paste x-admin-token here"
              />
              <p className="form-helper-text">Required for create, edit, and delete actions.</p>
            </div>
            <Button type="submit" variant="outline" className="form-submit-btn">
              Save Token
            </Button>
          </form>
        </article>

        <article className="newsletter-benefit-card-final">
          <form className="application-form-final" onSubmit={handleCreateIssue}>
            <div className="page-heading-final" style={{ marginBottom: 0 }}>
              <h2 className="section-title-final" style={{ fontSize: "1.25rem" }}>Create new issue</h2>
              <p className="section-subtitle-final" style={{ marginBottom: 0 }}>Status defaults to draft. Add one highlight per line.</p>
            </div>

            <div className="form-group">
              <Label htmlFor="create-volume" className="form-label">Volume</Label>
              <Input id="create-volume" name="volume" value={createForm.volume} onChange={handleCreateChange} className="form-input" required />
            </div>

            <div className="form-group">
              <Label htmlFor="create-date" className="form-label">Date</Label>
              <Input id="create-date" name="date" value={createForm.date} onChange={handleCreateChange} className="form-input" required />
            </div>

            <div className="form-group">
              <Label htmlFor="create-title" className="form-label">Title</Label>
              <Input id="create-title" name="title" value={createForm.title} onChange={handleCreateChange} className="form-input" required />
            </div>

            <div className="form-group">
              <Label htmlFor="create-summary" className="form-label">Summary</Label>
              <Textarea id="create-summary" name="summary" value={createForm.summary} onChange={handleCreateChange} className="form-textarea" rows={3} required />
            </div>

            <div className="form-group">
              <Label htmlFor="create-highlights" className="form-label">Highlights</Label>
              <Textarea
                id="create-highlights"
                name="highlightsText"
                value={createForm.highlightsText}
                onChange={handleCreateChange}
                className="form-textarea"
                rows={4}
                placeholder="One highlight per line"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="create-body" className="form-label">Body</Label>
              <Textarea id="create-body" name="body" value={createForm.body} onChange={handleCreateChange} className="form-textarea" rows={5} />
            </div>

            <div className="form-group">
              <Label htmlFor="create-status" className="form-label">Status</Label>
              <select id="create-status" name="status" value={createForm.status} onChange={handleCreateChange} className="form-input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <Button type="submit" className="form-submit-btn" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Issue"}
            </Button>
          </form>
        </article>

        <div className="newsletter-benefit-card-final">
          <div className="page-heading-final" style={{ marginBottom: "1rem" }}>
            <h2 className="section-title-final" style={{ fontSize: "1.25rem" }}>Existing issues</h2>
            <p className="section-subtitle-final" style={{ marginBottom: 0 }}>{issueCountLabel}</p>
          </div>

          {message ? (
            <p className={message.type === "error" ? "form-helper-text" : "newsletter-signup-meta-final"} style={{ color: message.type === "error" ? "#b42318" : undefined, marginBottom: "1rem" }}>
              {message.text}
            </p>
          ) : null}

          {isLoading ? <p className="newsletter-signup-meta-final">Loading issues...</p> : null}

          <div style={{ display: "grid", gap: "1rem" }}>
            {issues.map((issue) => (
              <IssueEditorCard
                key={issueKey(issue)}
                issue={issue}
                adminToken={adminToken.trim()}
                onSaved={handleIssueSaved}
                onDeleted={handleIssueDeleted}
              />
            ))}
            {!isLoading && !issues.length ? (
              <article className="newsletter-benefit-card-final">
                <h3 className="newsletter-card-title-final">No issues found</h3>
                <p className="newsletter-card-copy-final">Create the first issue above.</p>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterAdmin;
