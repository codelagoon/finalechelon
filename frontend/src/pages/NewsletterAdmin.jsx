import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
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
const DRAFT_STORAGE_KEY = "echelon_newsletter_draft";

const initialCreateForm = {
  volume: "",
  date: "",
  title: "",
  summary: "",
  body: "",
  status: "published",
  highlightsText: "",
  fileAttachment: null,
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
  const [autoSaveStatus, setAutoSaveStatus] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const autoSaveTimeoutRef = useRef(null);
  const lastSavedFormRef = useRef(null);

  useEffect(() => {
    setForm(issueToForm(issue));
  }, [issue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setAutoSaveStatus("unsaved");
    
    // Real-time validation
    const errors = { ...validationErrors };
    
    if (name === "volume" && !value.trim()) {
      errors.volume = "Volume is required";
    } else if (name === "volume") {
      delete errors.volume;
    }
    
    if (name === "date" && !value.trim()) {
      errors.date = "Date is required";
    } else if (name === "date") {
      delete errors.date;
    }
    
    if (name === "title" && !value.trim()) {
      errors.title = "Title is required";
    } else if (name === "title" && value.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    } else if (name === "title") {
      delete errors.title;
    }
    
    if (name === "summary" && !value.trim()) {
      errors.summary = "Summary is required";
    } else if (name === "summary" && value.trim().length < 10) {
      errors.summary = "Summary must be at least 10 characters";
    } else if (name === "summary") {
      delete errors.summary;
    }
    
    setValidationErrors(errors);
  };

  const autoSave = useCallback(async () => {
    if (!adminToken || isSaving) return;
    
    // Check if form has meaningful changes
    if (!form.volume.trim() || !form.date.trim() || !form.title.trim() || !form.summary.trim()) {
      setAutoSaveStatus("validation-error");
      return;
    }

    setIsSaving(true);
    setAutoSaveStatus("saving");

    try {
      const payload = formToPayload(form);
      const result = await updateIssue(adminToken, issue.id, payload);

      if (result.ok) {
        setAutoSaveStatus("saved");
        lastSavedFormRef.current = form;
        onSaved(result.data);
      } else {
        setAutoSaveStatus("error");
      }
    } catch (error) {
      setAutoSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }, [adminToken, form, issue.id, isSaving, onSaved]);

  // Auto-save after 30 seconds of inactivity
  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    if (autoSaveStatus === "unsaved" && !isSaving) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave();
      }, 30000); // 30 seconds
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [autoSaveStatus, isSaving, autoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave(event);
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault();
        setShowPreview((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [form]);

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

  const getAutoSaveStatusText = () => {
    switch (autoSaveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return "Saved";
      case "error":
        return "Save failed";
      case "validation-error":
        return "Fill required fields to save";
      case "unsaved":
        return "Unsaved changes";
      default:
        return "";
    }
  };

  const getAutoSaveStatusColor = () => {
    switch (autoSaveStatus) {
      case "saved":
        return "#16a34a";
      case "error":
      case "validation-error":
        return "#dc2626";
      case "saving":
        return "#2563eb";
      case "unsaved":
        return "#ca8a04";
      default:
        return "#6b7280";
    }
  };

  return (
    <article className="newsletter-benefit-card-final">
      <form className="application-form-final" onSubmit={handleSave}>
        <div className="page-heading-final" style={{ marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 className="section-title-final" style={{ fontSize: "1.25rem" }}>
                {issue.volume || "Untitled issue"}
              </h2>
              <p className="section-subtitle-final" style={{ marginBottom: 0 }}>
                {issue.date || "No date set"} · {issue.status || "draft"}
              </p>
            </div>
            {autoSaveStatus && (
              <div style={{ 
                fontSize: "0.875rem", 
                color: getAutoSaveStatusColor(),
                fontWeight: "500"
              }}>
                {getAutoSaveStatusText()}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <Label htmlFor={`volume-${issue.id}`} className="form-label">Volume</Label>
          <Input id={`volume-${issue.id}`} name="volume" value={form.volume} onChange={handleChange} className="form-input" required style={{ borderColor: validationErrors.volume ? "#dc2626" : undefined }} />
          {validationErrors.volume && <p className="form-helper-text" style={{ color: "#dc2626" }}>{validationErrors.volume}</p>}
        </div>

        <div className="form-group">
          <Label htmlFor={`date-${issue.id}`} className="form-label">Date</Label>
          <Input id={`date-${issue.id}`} name="date" value={form.date} onChange={handleChange} className="form-input" required style={{ borderColor: validationErrors.date ? "#dc2626" : undefined }} />
          {validationErrors.date && <p className="form-helper-text" style={{ color: "#dc2626" }}>{validationErrors.date}</p>}
        </div>

        <div className="form-group">
          <Label htmlFor={`title-${issue.id}`} className="form-label">Title</Label>
          <Input id={`title-${issue.id}`} name="title" value={form.title} onChange={handleChange} className="form-input" required style={{ borderColor: validationErrors.title ? "#dc2626" : undefined }} />
          {validationErrors.title && <p className="form-helper-text" style={{ color: "#dc2626" }}>{validationErrors.title}</p>}
        </div>

        <div className="form-group">
          <Label htmlFor={`summary-${issue.id}`} className="form-label">Summary</Label>
          <Textarea id={`summary-${issue.id}`} name="summary" value={form.summary} onChange={handleChange} className="form-textarea" rows={3} required style={{ borderColor: validationErrors.summary ? "#dc2626" : undefined }} />
          {validationErrors.summary && <p className="form-helper-text" style={{ color: "#dc2626" }}>{validationErrors.summary}</p>}
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

        <div className="form-group">
          <Label htmlFor={`file-url-${issue.id}`} className="form-label">Research Report URL (Optional)</Label>
          <Input 
            id={`file-url-${issue.id}`} 
            name="fileUrl" 
            value={form.fileAttachment?.url || ""} 
            onChange={(e) => {
              const url = e.target.value;
              setForm(prev => ({
                ...prev,
                fileAttachment: url ? {
                  name: url.split('/').pop() || "research-report",
                  type: "pdf",
                  size: 0,
                  url: url,
                  upload_date: new Date().toISOString()
                } : null
              }));
            }} 
            className="form-input" 
            placeholder="https://example.com/report.pdf"
          />
          <p className="form-helper-text">Enter a URL for the research report PDF or document</p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button type="submit" className="form-submit-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Issue"}
          </Button>
          <Button type="button" variant="outline" className="form-submit-btn" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button type="button" variant="outline" className="form-submit-btn" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Issue"}
          </Button>
        </div>

        {showPreview && (
          <div style={{ 
            marginTop: "1.5rem", 
            padding: "1.5rem", 
            border: "1px solid #e5e7eb", 
            borderRadius: "0.5rem",
            backgroundColor: "#f9fafb"
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Preview</h3>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Volume:</strong> {form.volume || "Not set"}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Date:</strong> {form.date || "Not set"}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Title:</strong> {form.title || "Not set"}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <strong>Summary:</strong> {form.summary || "Not set"}
            </div>
            {form.highlightsText && (
              <div style={{ marginBottom: "1rem" }}>
                <strong>Highlights:</strong>
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  {form.highlightsText.split("\n").filter(Boolean).map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            {form.body && (
              <div style={{ marginBottom: "1rem" }}>
                <strong>Body:</strong>
                <div style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{form.body}</div>
              </div>
            )}
            {form.fileAttachment && (
              <div style={{ marginBottom: "1rem" }}>
                <strong>Research Report:</strong>
                <div style={{ marginTop: "0.5rem" }}>
                  <a href={form.fileAttachment.url} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb" }}>
                    {form.fileAttachment.name}
                  </a>
                </div>
              </div>
            )}
            <div>
              <strong>Status:</strong> {form.status || "draft"}
            </div>
          </div>
        )}
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

  const handleCopyFromIssue = (issueToCopy) => {
    const copiedForm = issueToForm(issueToCopy);
    setCreateForm({
      ...copiedForm,
      volume: "",
      date: "",
      title: "",
      status: "draft",
    });
    toast.success(`Copied from ${issueToCopy.volume} (${issueToCopy.date})`);
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
              <p className="section-subtitle-final" style={{ marginBottom: 0 }}>
                Status defaults to published so it appears on the public newsletter pages immediately.
              </p>
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

            <div className="form-group">
              <Label htmlFor="create-file-url" className="form-label">Research Report URL (Optional)</Label>
              <Input 
                id="create-file-url" 
                name="fileUrl" 
                value={createForm.fileAttachment?.url || ""} 
                onChange={(e) => {
                  const url = e.target.value;
                  setCreateForm(prev => ({
                    ...prev,
                    fileAttachment: url ? {
                      name: url.split('/').pop() || "research-report",
                      type: "pdf",
                      size: 0,
                      url: url,
                      upload_date: new Date().toISOString()
                    } : null
                  }));
                }} 
                className="form-input" 
                placeholder="https://example.com/report.pdf"
              />
              <p className="form-helper-text">Enter a URL for the research report PDF or document</p>
            </div>

            <Button type="submit" className="form-submit-btn" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Issue"}
            </Button>
          </form>
        </article>

        <div className="newsletter-benefit-card-final">
          <div className="page-heading-final" style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 className="section-title-final" style={{ fontSize: "1.25rem" }}>Existing issues</h2>
                <p className="section-subtitle-final" style={{ marginBottom: 0 }}>{issueCountLabel}</p>
              </div>
              {issues.length > 0 && (
                <select 
                  className="form-input" 
                  style={{ width: "auto", minWidth: "200px" }}
                  onChange={(e) => {
                    if (e.target.value) {
                      const selectedIssue = issues.find(i => i.id === e.target.value);
                      if (selectedIssue) handleCopyFromIssue(selectedIssue);
                      e.target.value = "";
                    }
                  }}
                  defaultValue=""
                >
                  <option value="">Copy from existing issue...</option>
                  {issues.map((issue) => (
                    <option key={issue.id} value={issue.id}>
                      {issue.volume} ({issue.date})
                    </option>
                  ))}
                </select>
              )}
            </div>
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
