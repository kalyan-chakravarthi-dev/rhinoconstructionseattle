/**
 * Business Notification Email Template for Quote Requests
 * Sent to business owner when a new quote is submitted
 */

interface QuoteBusinessEmailData {
  customerName: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  state: string;
  message?: string;
  quoteId: string;
  imageUrls?: string[];
}

export function generateQuoteBusinessEmail(data: QuoteBusinessEmailData): { subject: string; html: string; text: string } {
  const {
    customerName,
    email,
    phone,
    service,
    city,
    state,
    message,
    quoteId,
    imageUrls = [],
  } = data;

  const subject = `New Quote Request: ${service} - ${customerName}`;

  const imageGalleryHtml = imageUrls.length > 0
    ? `
      <h3 style="color: #333; margin-top: 20px;">Project Photos (${imageUrls.length}):</h3>
      <div style="background: #fff; padding: 15px;">
        ${imageUrls.map((url, index) => `
          <div style="margin-bottom: 15px;">
            <a href="${url}" target="_blank" style="display: block;">
              <img src="${url}" alt="Project photo ${index + 1}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd;" />
            </a>
            <p style="font-size: 12px; color: #666; margin: 5px 0 0 0;">Photo ${index + 1} - <a href="${url}" target="_blank" style="color: #e74c3c;">View full size</a></p>
          </div>
        `).join('')}
      </div>
    `
    : '';

  const imageGalleryText = imageUrls.length > 0
    ? `\nPROJECT PHOTOS (${imageUrls.length}):\n${imageUrls.map((url, i) => `  Photo ${i + 1}: ${url}`).join('\n')}\n`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">New Quote Request</h1>
    </div>
    <div style="padding: 20px; background: #f9f9f9;">
      <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
        Customer Information
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; font-weight: bold; width: 140px;">Name:</td>
          <td style="padding: 10px;">${customerName}</td>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 10px; font-weight: bold;">Email:</td>
          <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Phone:</td>
          <td style="padding: 10px;">${phone}</td>
        </tr>
        <tr style="background: #fff;">
          <td style="padding: 10px; font-weight: bold;">Service:</td>
          <td style="padding: 10px; color: #e74c3c; font-weight: bold;">${service}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Location:</td>
          <td style="padding: 10px;">${city}, ${state}</td>
        </tr>
      </table>

      ${message ? `
      <h3 style="color: #333; margin-top: 20px;">Message:</h3>
      <div style="background: #fff; padding: 15px; border-left: 4px solid #e74c3c;">
        ${message}
      </div>
      ` : ""}

      ${imageGalleryHtml}

      <div style="margin-top: 20px; padding: 15px; background: #e74c3c; color: white; text-align: center; border-radius: 5px;">
        <strong>Quote ID:</strong> ${quoteId}
      </div>
    </div>
    <div style="background: #1a1a2e; color: #999; padding: 15px; text-align: center; font-size: 12px;">
      <p style="margin: 0;">Automated notification from Rhino Remodeler</p>
    </div>
  </div>
</body>
</html>`;

  const text = `NEW QUOTE REQUEST
=================

CUSTOMER INFORMATION
Name: ${customerName}
Email: ${email}
Phone: ${phone}
Service: ${service}
Location: ${city}, ${state}
${message ? `\nMessage:\n${message}\n` : ''}${imageGalleryText}
Quote ID: ${quoteId}

---
Automated notification from Rhino Remodeler`;

  return { subject, html, text };
}
