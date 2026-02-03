/**
 * Email Templates Index
 * 
 * This module exports all email templates used by Rhino Remodeler edge functions.
 * All templates include XSS-safe HTML with sanitized user inputs.
 * 
 * Available templates:
 * - Quote Customer: Confirmation email sent to customers after quote request
 * - Quote Business: Notification email sent to business owner for new quotes
 * - Contact Customer: Confirmation email sent after contact form submission
 * - Contact Business: Notification email sent to business owner for contact messages
 */

export { generateQuoteCustomerEmail } from "./quote-customer.ts";
export { generateQuoteBusinessEmail } from "./quote-business.ts";
export { generateContactCustomerEmail } from "./contact-customer.ts";
export { generateContactBusinessEmail } from "./contact-business.ts";
