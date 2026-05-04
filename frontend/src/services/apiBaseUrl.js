function normalizeBackendUrl(rawUrl) {
  const value = String(rawUrl || "").trim().replace(/\/+$/, "");

  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (/^(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i.test(value)) {
    return `http://${value}`;
  }

  return `https://${value}`;
}

export const API_BASE_URL = normalizeBackendUrl(process.env.REACT_APP_BACKEND_URL || "localhost:8000");
