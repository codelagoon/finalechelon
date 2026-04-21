const API_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

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
  };
}

export function formToPayload(form) {
  const highlights = String(form.highlightsText || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((text) => ({ text }));

  return {
    volume: String(form.volume || "").trim(),
    date: String(form.date || "").trim(),
    title: String(form.title || "").trim(),
    summary: String(form.summary || "").trim(),
    body: String(form.body || "").trim() || null,
    status: String(form.status || "draft").trim() || "draft",
    highlights,
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
  const response = await fetch(`${API_URL}/api/newsletter/issues?limit=500`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    return {
      success: false,
      error: result.detail || "Failed to load issues",
      issues: [],
    };
  }

  return {
    success: true,
    issues: Array.isArray(result.issues) ? result.issues : [],
    count: typeof result.count === "number" ? result.count : 0,
  };
}

export async function createIssue(adminToken, payload) {
  const response = await fetch(`${API_URL}/api/newsletter/issues/`, {
    method: "POST",
    headers: buildHeaders(adminToken),
    body: JSON.stringify(payload),
  });

  const result = await parseResponse(response);

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
}

export async function updateIssue(adminToken, issueId, payload) {
  const response = await fetch(`${API_URL}/api/newsletter/issues/${issueId}`, {
    method: "PATCH",
    headers: buildHeaders(adminToken),
    body: JSON.stringify(payload),
  });

  const result = await parseResponse(response);

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
}

export async function deleteIssue(adminToken, issueId) {
  const response = await fetch(`${API_URL}/api/newsletter/issues/${issueId}`, {
    method: "DELETE",
    headers: buildHeaders(adminToken),
  });

  const result = await parseResponse(response);

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
}
