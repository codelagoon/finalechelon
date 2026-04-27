const STORAGE_KEY = "echelon_newsletter_subscribed";

export function hasSignedUp() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    // Private browsing or storage disabled
    return false;
  }
}

export function markAsSignedUp() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Silent fail - user will see gate again
  }
}

export function clearSignupState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent fail
  }
}
