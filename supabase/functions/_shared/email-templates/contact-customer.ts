/**
 * Customer Confirmation Email Template for Contact Form
 * Sent to customers after they submit a contact message
 */

interface ContactCustomerEmailData {
  firstName: string;
  trackingId: string;
  message: string;
}

export function generateContactCustomerEmail(data: ContactCustomerEmailData): { subject: string; html: string; text: string } {
  const { firstName, trackingId, message } = data;
  const currentYear = new Date().getFullYear();

  const subject = `We received your message - ${trackingId}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1a1a2e; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">Message Received!</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9;">
      <p>Hi ${firstName},</p>
      <p>Thank you for contacting <strong>Rhino Remodeler</strong>. We've received your message and will get back to you within 24 hours.</p>

      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your Reference ID:</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #e74c3c;">${trackingId}</p>
      </div>

      <h3 style="color: #333;">Your Message Summary:</h3>
      <p style="background-color: #ffffff; padding: 15px; border-radius: 8px;">${message}</p>

      <p style="margin-top: 20px;">If you have any urgent questions, feel free to call us at <a href="tel:+12064879677" style="color: #e74c3c;">(206) 487-9677</a>.</p>

      <p>Best regards,<br><strong>The Rhino Remodeler Team</strong></p>
    </div>
    <div style="background: #1a1a2e; padding: 20px; text-align: center; font-size: 12px;">
      <p style="margin: 0;">
        <a href="https://rhinoremodeler.com" style="color: #e74c3c; text-decoration: none;">rhinoremodeler.com</a>
      </p>
      <p style="color: #777; margin: 8px 0 0 0;">&copy; ${currentYear} Rhino Remodeler | Kent, WA | Serving the Greater Seattle Area</p>
    </div>
  </div>
</body>
</html>`;

  const text = `Hi ${firstName},

Thank you for contacting Rhino Remodeler. We've received your message and will get back to you within 24 hours.

Your Reference ID: ${trackingId}

YOUR MESSAGE SUMMARY:
${message}

If you have any urgent questions, feel free to call us at (206) 487-9677.

Best regards,
The Rhino Remodeler Team

---
rhinoremodeler.com
© ${currentYear} Rhino Remodeler | Kent, WA | Serving the Greater Seattle Area`;

  return { subject, html, text };
}
