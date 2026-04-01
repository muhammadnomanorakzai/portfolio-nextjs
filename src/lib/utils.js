/**
 * Input Sanitization Utilities
 * Prevents XSS attacks by sanitizing user input
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

// Rate limiting utility using localStorage
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute

export function checkRateLimit(key = "contact_form") {
  const now = Date.now();
  const storageKey = `rate_limit_${key}`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    const data = stored ? JSON.parse(stored) : { count: 0, resetTime: now };
    
    if (now > data.resetTime) {
      // Reset window expired
      localStorage.setItem(storageKey, JSON.stringify({ count: 1, resetTime: now + RATE_LIMIT_WINDOW }));
      return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }
    
    if (data.count >= MAX_REQUESTS) {
      // Rate limit exceeded
      const waitTime = Math.ceil((data.resetTime - now) / 1000);
      return { allowed: false, remaining: 0, waitTime };
    }
    
    // Increment counter
    data.count += 1;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return { allowed: true, remaining: MAX_REQUESTS - data.count };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    return { allowed: true, remaining: MAX_REQUESTS };
  }
}

// Reset rate limit (e.g., after successful submission)
export function resetRateLimit(key = "contact_form") {
  localStorage.removeItem(`rate_limit_${key}`);
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate input length
export function isValidLength(value, min, max) {
  return value.length >= min && value.length <= max;
}
