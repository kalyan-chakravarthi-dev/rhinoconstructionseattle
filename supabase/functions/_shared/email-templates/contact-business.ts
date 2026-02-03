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

export function generateContactBusinessEmail(data: ContactBusinessEmailData): string {
  const {
    fullName,
    email,
    phone,
    serviceLabel,
    heardFromLabel,
    message,
    trackingId,
  } = data;

  // Clean phone for tel: link
  const phoneDigits = phone.replace(/\D/g, '');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">New Contact Message</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p style="color: #666; margin-bottom: 20px;">Tracking ID: <strong>${trackingId}</strong></p>
        
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Contact Details</h2>
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
        
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Message</h2>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
          <p style="margin: 0;">${message}</p>
        </div>
      </div>
      <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
        <p style="color: #ffffff; margin: 0; font-size: 12px;">Rhino Remodeler Contact System</p>
      </div>
    </div>
  `;
}
