import { API_BASE_URL } from "./apiBaseUrl";

const API_URL = API_BASE_URL;

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

function normalizeIssue(issue, index) {
  return {
    id: issue?.id || `issue-${index}`,
    volume: issue?.volume || "Issue",
    date: issue?.date || "",
    title: issue?.title || "Untitled issue",
    summary: issue?.summary || "",
    body: issue?.body || "",
    highlights: normalizeHighlights(issue?.highlights),
    status: issue?.status || "published",
    author: issue?.author || null,
  };
}

export async function fetchPublishedIssues(limit = 100) {
  try {
    const response = await fetch(`${API_URL}/api/newsletter/issues?status=published&limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        issues: [],
        fallbackUsed: false,
        error: "Failed to load newsletter issues",
      };
    }

    const result = await response.json();

    if (!result?.success || !Array.isArray(result?.issues)) {
      return {
        success: false,
        issues: [],
        fallbackUsed: false,
        error: "Invalid newsletter issues response",
      };
    }

    const normalized = result.issues.map(normalizeIssue);

    if (!normalized.length) {
      return {
        success: true,
        issues: [],
        fallbackUsed: false,
        error: null,
      };
    }

    return {
      success: true,
      issues: normalized,
      fallbackUsed: false,
      error: null,
    };
  } catch {
    return {
      success: false,
      issues: [],
      fallbackUsed: false,
      error: "Network error while loading newsletter issues",
    };
  }
}

export async function fetchIssueById(issueId) {
  try {
    const response = await fetch(`${API_URL}/api/newsletter/issues/${issueId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        issue: null,
        error: "Failed to load newsletter issue",
      };
    }

    const result = await response.json();

    if (!result) {
      return {
        success: false,
        issue: null,
        error: "Invalid newsletter issue response",
      };
    }

    const normalized = normalizeIssue(result);

    return {
      success: true,
      issue: normalized,
      error: null,
    };
  } catch {
    return {
      success: false,
      issue: null,
      error: "Network error while loading newsletter issue",
    };
  }
}
