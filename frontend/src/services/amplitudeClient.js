import * as amplitude from "@amplitude/unified";

const AMPLITUDE_API_KEY =
  process.env.REACT_APP_AMPLITUDE_API_KEY || "96269138725fe021a9330f971e1debf";
const AMPLITUDE_AUTOCAPTURE =
  String(process.env.REACT_APP_AMPLITUDE_AUTOCAPTURE ?? "true").toLowerCase() !== "false";
const AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE = Number(
  process.env.REACT_APP_AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE ?? "1",
);
const AMPLITUDE_INIT_OPTIONS = {
  analytics: {
    autocapture: AMPLITUDE_AUTOCAPTURE,
  },
  sessionReplay: {
    sampleRate: Number.isFinite(AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE)
      ? AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE
      : 1,
  },
};

const AMPLITUDE_INIT_FLAG = "__echelonAmplitudeInitialized";

export function initAmplitude() {
  if (typeof window === "undefined") return;
  if (window[AMPLITUDE_INIT_FLAG]) return;

  amplitude.initAll(AMPLITUDE_API_KEY, AMPLITUDE_INIT_OPTIONS);
  window[AMPLITUDE_INIT_FLAG] = true;
}

export function trackAmplitudeEvent(eventName, eventProperties = {}) {
  if (typeof window === "undefined") return;
  if (!window[AMPLITUDE_INIT_FLAG]) return;
  if (!eventName) return;

  amplitude.track(eventName, eventProperties);
}
