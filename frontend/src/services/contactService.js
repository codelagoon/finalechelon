import { API_BASE_URL } from "./apiBaseUrl";

const API_URL = API_BASE_URL;

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Failed to submit contact form");
    }

    return {
      success: true,
      message: result.message,
      submissionId: result.submission_id,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: error.message || "Network error. Please check your connection and try again.",
    };
  }
};
