/**
 * Customer Confirmation Email Template for Quote Requests
 * Sent to customers after they submit a quote request
 */

interface QuoteCustomerEmailData {
  customerName: string;
  trackingId: string;
  service: string;
  city: string;
  state: string;
  email: string;
  phone?: string;
  imageCount?: number;
}

export function generateQuoteCustomerEmail(data: QuoteCustomerEmailData): string {
  const {
    customerName,
    trackingId,
    service,
    city,
    state,
    email,
    phone,
    imageCount = 0,
  } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1a2e; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🦏 Rhino Remodeler</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Quote Request Received</p>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #333; margin-top: 0;">Hi ${customerName},</h2>
        
        <p style="color: #555; line-height: 1.6;">
          Thank you for your interest in Rhino Remodeler! We've received your quote request and our team is reviewing it now.
        </p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            Your Request Summary
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Reference ID:</td>
              <td style="padding: 8px 0; color: #e74c3c; font-weight: bold;">${trackingId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td>
              <td style="padding: 8px 0; color: #333;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Location:</td>
              <td style="padding: 8px 0; color: #333;">${city}, ${state}</td>
            </tr>
            ${imageCount > 0 ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Photos:</td>
              <td style="padding: 8px 0; color: #333;">${imageCount} photo(s) uploaded</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <h3 style="color: #333;">What Happens Next?</h3>
        <ol style="color: #555; line-height: 1.8; padding-left: 20px;">
          <li>Our team will review your request within <strong>24-48 hours</strong></li>
          <li>We'll contact you at <strong>${email}</strong>${phone ? ` or <strong>${phone}</strong>` : ''} to discuss your project</li>
          <li>We'll schedule a free consultation at your convenience</li>
          <li>You'll receive a detailed, transparent quote</li>
        </ol>
        
        <div style="background: #e74c3c; color: white; padding: 15px 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Questions? Call us at</p>
          <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold;">(206) 487-9677</p>
        </div>
        
        <p style="color: #555; line-height: 1.6;">
          We appreciate you considering Rhino Remodeler for your home improvement needs. We look forward to helping you transform your space!
        </p>
        
        <p style="color: #555; margin-bottom: 0;">
          Best regards,<br>
          <strong style="color: #333;">The Rhino Remodeler Team</strong>
        </p>
      </div>
      
      <div style="background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Rhino Remodeler | Seattle's Trusted Home Improvement Experts</p>
        <p style="margin: 10px 0 0 0;">
          <a href="https://rhinoremodeler.lovable.app" style="color: #e74c3c; text-decoration: none;">Visit our website</a>
        </p>
      </div>
    </div>
  `;
}
