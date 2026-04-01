/**
 * Input Sanitization Utilities
 */

// Sanitize HTML to prevent XSS
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// Sanitize object with multiple fields
export function sanitizeObject(obj) {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeInput(value);
  }
  return sanitized;
}

// Validate entire form
export function validateForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!formData.subject || formData.subject.length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!formData.message || formData.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
