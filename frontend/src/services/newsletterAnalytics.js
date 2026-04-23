import { API_BASE_URL } from "./apiBaseUrl";
import { trackAmplitudeEvent } from "./amplitudeClient";

const API_URL = API_BASE_URL;

export async function trackNewsletterEvent({
  event,
  source,
  segment = null,
  status = null,
  requestId = null,
}) {
  if (!event || !source) return;

  const payload = {
    event,
    source,
    segment,
    status,
    request_id: requestId,
  };

  trackAmplitudeEvent(event, {
    source,
    segment,
    status,
    request_id: requestId,
  });

  try {
    await fetch(`${API_URL}/api/newsletter/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics must never block user actions.
  }
}
