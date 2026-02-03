/**
 * HTML Sanitization Utilities for Edge Functions
 * Prevents XSS attacks in email templates by escaping HTML entities
 */

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitizes a string for safe use in HTML email templates
 * Returns empty string for null/undefined values
 */
export function sanitizeForEmail(text: string | null | undefined): string {
  if (!text) return '';
  return escapeHtml(text.trim());
}

/**
 * Sanitizes message content, preserving line breaks as <br> tags
 * Use this for multi-line message fields
 */
export function sanitizeMessage(text: string | null | undefined): string {
  if (!text) return '';
  return escapeHtml(text.trim()).replace(/\n/g, '<br>');
}

/**
 * Sanitizes a URL for use in href attributes
 * Returns empty string if URL is invalid or potentially malicious
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  
  // Only allow http, https, mailto, and tel protocols
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return escapeHtml(trimmed);
  }
  
  return '';
}
