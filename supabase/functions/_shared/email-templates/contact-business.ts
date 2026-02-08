/**
 * Business Notification Email Template for Contact Form
 * Sent to business owner when a new contact message is submitted
 */

interface ContactBusinessEmailData {
  fullName: string;
  email: string;
  phone: string;
  serviceLabel: string;
  heardFromLabel: string;
  message: string;
  trackingId: string;
}

export function generateContactBusinessEmail(data: ContactBusinessEmailData): { subject: string; html: string; text: string } {
  const {
    fullName,
    email,
    phone,
    serviceLabel,
    heardFromLabel,
    message,
    trackingId,
  } = data;

  const phoneDigits = phone.replace(/\D/g, '');

  const subject = `New Contact: ${fullName} - ${serviceLabel}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1a1a2e; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0;">New Contact Message</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9;">
      <p style="color: #666; margin-bottom: 20px;">Tracking ID: <strong>${trackingId}</strong></p>

      <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Contact Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Name:</td>
          <td style="padding: 8px 0;"><strong>${fullName}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Phone:</td>
          <td style="padding: 8px 0;"><a href="tel:${phoneDigits}">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Service Interest:</td>
          <td style="padding: 8px 0;">${serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">How They Found Us:</td>
          <td style="padding: 8px 0;">${heardFromLabel}</td>
        </tr>
      </table>

      <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Message</h2>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
        <p style="margin: 0;">${message}</p>
      </div>
    </div>
    <div style="background: #1a1a2e; padding: 15px; text-align: center; font-size: 12px;">
      <p style="color: #999; margin: 0;">Automated notification from Rhino Remodeler</p>
    </div>
  </div>
</body>
</html>`;

  const text = `NEW CONTACT MESSAGE
===================
Tracking ID: ${trackingId}

CONTACT DETAILS
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Service Interest: ${serviceLabel}
How They Found Us: ${heardFromLabel}

MESSAGE:
${message}

---
Automated notification from Rhino Remodeler`;

  return { subject, html, text };
}
