const API_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/+$/, "");

const FALLBACK_ISSUES = [
  {
    id: "fallback-vol-09",
    volume: "Vol. 09",
    date: "April 2026",
    title: "Semiconductor Cash Cycles, AI Capex, and Variant Paths",
    summary:
      "A focused read on pricing power durability, inventory normalization, and where downside scenarios still hide in plain sight.",
    highlights: [
      "Earnings-quality checklist for margin resilience",
      "Three market signals we track before adding exposure",
      "Memo excerpt: base case vs. variant case assumptions",
    ],
    status: "published",
  },
  {
    id: "fallback-vol-08",
    volume: "Vol. 08",
    date: "March 2026",
    title: "Margin Compression Watchlist and Quality Screens",
    summary:
      "How we separate temporary pressure from structural deterioration in operating margins.",
    highlights: [],
    status: "published",
  },
  {
    id: "fallback-vol-07",
    volume: "Vol. 07",
    date: "February 2026",
    title: "Banks, Duration, and Credit Re-Pricing",
    summary:
      "A memo-driven walkthrough of where sensitivity hides in regional balance sheets.",
    highlights: [],
    status: "published",
  },
];

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
    highlights: normalizeHighlights(issue?.highlights),
    status: issue?.status || "published",
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
        issues: FALLBACK_ISSUES,
        fallbackUsed: true,
        error: "Failed to load newsletter issues",
      };
    }

    const result = await response.json();

    if (!result?.success || !Array.isArray(result?.issues)) {
      return {
        success: false,
        issues: FALLBACK_ISSUES,
        fallbackUsed: true,
        error: "Invalid newsletter issues response",
      };
    }

    const normalized = result.issues.map(normalizeIssue);

    if (!normalized.length) {
      return {
        success: true,
        issues: FALLBACK_ISSUES,
        fallbackUsed: true,
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
      issues: FALLBACK_ISSUES,
      fallbackUsed: true,
      error: "Network error while loading newsletter issues",
    };
  }
}
