import { API_BASE_URL } from "./apiBaseUrl";

const API_URL = API_BASE_URL;

if (!API_URL) {
  console.warn("[Newsletter Admin] REACT_APP_BACKEND_URL is not set. API calls will fail.");
}

function buildHeaders(adminToken) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (adminToken) {
    headers["x-admin-token"] = adminToken;
  }

  return headers;
}

function normalizeHighlights(highlights) {
  if (!Array.isArray(highlights)) return [];

  return highlights
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item.text === "string") return item.text;
      return null;
    })
    .filter(Boolean);
}

export function issueToForm(issue = {}) {
  return {
    volume: issue.volume || "",
    date: issue.date || "",
    title: issue.title || "",
    summary: issue.summary || "",
    body: issue.body || "",
    status: issue.status || "draft",
    highlightsText: normalizeHighlights(issue.highlights).join("\n"),
    fileAttachment: issue.file_attachment || null,
    authorName: issue.author?.name || "",
    authorRole: issue.author?.role || "",
  };
}

export function formToPayload(form) {
  const highlights = String(form.highlightsText || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((text) => ({ text }));

  const author = form.authorName?.trim() ? {
    name: String(form.authorName || "").trim(),
    role: String(form.authorRole || "Research Analyst").trim(),
  } : null;

  return {
    volume: String(form.volume || "").trim(),
    date: String(form.date || "").trim(),
    title: String(form.title || "").trim(),
    summary: String(form.summary || "").trim(),
    body: String(form.body || "").trim() || null,
    status: String(form.status || "draft").trim() || "draft",
    highlights,
    file_attachment: form.fileAttachment || null,
    author,
  };
}

async function parseResponse(response) {
  const responseText = await response.text();

  try {
    return responseText ? JSON.parse(responseText) : {};
  } catch {
    return { detail: responseText || "Invalid server response." };
  }
}

export async function fetchAllIssues() {
  const url = `${API_URL}/api/newsletter/issues?limit=500`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await parseResponse(response);

    if (!response.ok) {
      return {
        success: false,
        error: result.detail || `Server error: ${response.status}`,
        issues: [],
      };
    }

    return {
      success: true,
      issues: Array.isArray(result.issues) ? result.issues : [],
      count: typeof result.count === "number" ? result.count : 0,
    };
  } catch (error) {
    console.error("[Newsletter Admin] Fetch error:", {
      url,
      message: error.message,
      error,
    });
    
    return {
      success: false,
      error: `Network error: ${error.message}. Check that REACT_APP_BACKEND_URL is set and the backend is running.`,
      issues: [],
    };
  }
}

export async function createIssue(adminToken, payload) {
  const url = `${API_URL}/api/newsletter/issues/`;
  
  try {
    console.log("[Newsletter Admin] Creating issue:", {
      url,
      payload,
      tokenLength: adminToken ? adminToken.length : 0,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(adminToken),
      body: JSON.stringify(payload),
    });

    const result = await parseResponse(response);

    console.log("[Newsletter Admin] Create response:", {
      status: response.status,
      ok: response.ok,
      result,
    });

    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error("[Newsletter Admin] Create error:", {
      url,
      message: error.message,
      error,
    });
    
    return {
      ok: false,
      status: 0,
      data: { detail: `Network error: ${error.message}` },
    };
  }
}

export async function updateIssue(adminToken, issueId, payload) {
  const url = `${API_URL}/api/newsletter/issues/${issueId}`;

  try {
    console.log("[Newsletter Admin] Updating issue:", {
      url,
      payload,
      tokenLength: adminToken ? adminToken.length : 0,
    });

    const response = await fetch(url, {
      method: "PATCH",
      headers: buildHeaders(adminToken),
      body: JSON.stringify(payload),
    });

    const result = await parseResponse(response);

    console.log("[Newsletter Admin] Update response:", {
      status: response.status,
      ok: response.ok,
      result,
    });

    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error("[Newsletter Admin] Update error:", {
      url,
      message: error.message,
      error,
    });

    return {
      ok: false,
      status: 0,
      data: { detail: `Network error: ${error.message}` },
    };
  }
}

export async function deleteIssue(adminToken, issueId) {
  const url = `${API_URL}/api/newsletter/issues/${issueId}`;

  try {
    console.log("[Newsletter Admin] Deleting issue:", {
      url,
      tokenLength: adminToken ? adminToken.length : 0,
    });

    const response = await fetch(url, {
      method: "DELETE",
      headers: buildHeaders(adminToken),
    });

    const result = await parseResponse(response);

    console.log("[Newsletter Admin] Delete response:", {
      status: response.status,
      ok: response.ok,
      result,
    });

    return {
      ok: response.ok,
      status: response.status,
      data: result,
    };
  } catch (error) {
    console.error("[Newsletter Admin] Delete error:", {
      url,
      message: error.message,
      error,
    });

    return {
      ok: false,
      status: 0,
      data: { detail: `Network error: ${error.message}` },
    };
  }
}
