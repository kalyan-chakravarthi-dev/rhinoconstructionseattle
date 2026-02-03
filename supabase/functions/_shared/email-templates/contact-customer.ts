/**
 * Customer Confirmation Email Template for Contact Form
 * Sent to customers after they submit a contact message
 */

interface ContactCustomerEmailData {
  firstName: string;
  trackingId: string;
  message: string;
}

export function generateContactCustomerEmail(data: ContactCustomerEmailData): string {
  const { firstName, trackingId, message } = data;
  const currentYear = new Date().getFullYear();

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Message Received!</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p>Hi ${firstName},</p>
        <p>Thank you for contacting <strong>Rhino Remodeler</strong>. We've received your message and will get back to you within 24 hours.</p>
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your Reference ID:</p>
          <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e3a5f;">${trackingId}</p>
        </div>
        
        <h3 style="color: #1e3a5f;">Your Message Summary:</h3>
        <p style="background-color: #ffffff; padding: 15px; border-radius: 8px;">${message}</p>
        
        <p style="margin-top: 20px;">If you have any urgent questions, feel free to call us at <a href="tel:2064879677">(206) 487-9677</a>.</p>
        
        <p>Best regards,<br><strong>The Rhino Remodeler Team</strong></p>
      </div>
      <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
        <p style="color: #ffffff; margin: 0; font-size: 12px;">© ${currentYear} Rhino Remodeler | Kent, WA</p>
      </div>
    </div>
  `;
}
