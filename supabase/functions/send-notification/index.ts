import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sanitizeForEmail, sanitizeMessage, sanitizeUrl } from "../_shared/sanitize.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  customerName: string;
  email: string;
  phone?: string | null;
  serviceRequested: string;
  propertyCity?: string | null;
  propertyState?: string | null;
  message?: string | null;
  quoteId: string;
  imageUrls?: string[];
}

// Generate a tracking ID from UUID (same format as frontend)
function generateTrackingId(uuid: string): string {
  const year = new Date().getFullYear();
  const numericPart = parseInt(uuid.replace(/-/g, '').slice(0, 8), 16) % 10000;
  return `RQT-${year}-${numericPart.toString().padStart(4, '0')}`;
}

// Generate signed URLs for images (private bucket)
async function getSignedImageUrls(imageUrls: string[]): Promise<string[]> {
  if (!imageUrls || imageUrls.length === 0) return [];
  
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const signedUrls = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        // Extract path from URL - handle both full URLs and paths
        let path = url;
        if (url.includes('/quote-images/')) {
          path = url.split('/quote-images/')[1];
        }
        if (!path) return url;
        
        const { data, error } = await supabase.storage
          .from('quote-images')
          .createSignedUrl(path, 604800); // 7 days
        
        if (error) {
          console.error('Signed URL error:', error);
          return url;
        }
        
        return data?.signedUrl || url;
      } catch (err) {
        console.error('Signed URL generation failed:', err);
        return url;
      }
    })
  );
  
  return signedUrls;
}

// Send confirmation email to customer
async function sendCustomerConfirmation(payload: NotificationPayload): Promise<boolean> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  const trackingId = generateTrackingId(payload.quoteId);

  // Sanitize all user inputs
  const safeName = sanitizeForEmail(payload.customerName);
  const safeService = sanitizeForEmail(payload.serviceRequested);
  const safeCity = sanitizeForEmail(payload.propertyCity) || "N/A";
  const safeState = sanitizeForEmail(payload.propertyState) || "N/A";
  const safeEmail = sanitizeForEmail(payload.email);
  const safePhone = sanitizeForEmail(payload.phone);

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #1a1a2e; color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🦏 Rhino Remodeler</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Quote Request Received</p>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #333; margin-top: 0;">Hi ${safeName},</h2>
        
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
              <td style="padding: 8px 0; color: #333;">${safeService}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Location:</td>
              <td style="padding: 8px 0; color: #333;">${safeCity}, ${safeState}</td>
            </tr>
            ${payload.imageUrls && payload.imageUrls.length > 0 ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Photos:</td>
              <td style="padding: 8px 0; color: #333;">${payload.imageUrls.length} photo(s) uploaded</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <h3 style="color: #333;">What Happens Next?</h3>
        <ol style="color: #555; line-height: 1.8; padding-left: 20px;">
          <li>Our team will review your request within <strong>24-48 hours</strong></li>
          <li>We'll contact you at <strong>${safeEmail}</strong>${safePhone ? ` or <strong>${safePhone}</strong>` : ''} to discuss your project</li>
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

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: payload.email }] }],
        from: { email: "noreply@rhinoremodeler.com", name: "Rhino Remodeler" },
        subject: `✅ Quote Request Received - ${trackingId}`,
        content: [{ type: "text/html", value: emailHtml }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid customer email error:", error);
      return false;
    }

    console.log("Customer confirmation email sent successfully");
    return true;
  } catch (error) {
    console.error("Customer email send failed:", error);
    return false;
  }
}

// Send Email via SendGrid
async function sendEmail(payload: NotificationPayload, signedImageUrls: string[]): Promise<boolean> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  const businessEmail = "francisco@rhinoremodeler.com";

  // Sanitize all user inputs
  const safeName = sanitizeForEmail(payload.customerName);
  const safeService = sanitizeForEmail(payload.serviceRequested);
  const safeCity = sanitizeForEmail(payload.propertyCity) || "N/A";
  const safeState = sanitizeForEmail(payload.propertyState) || "N/A";
  const safeEmail = sanitizeForEmail(payload.email);
  const safePhone = sanitizeForEmail(payload.phone) || "Not provided";
  const safeMessage = sanitizeMessage(payload.message);

  // Generate image gallery HTML if images are present
  const imageGalleryHtml = signedImageUrls && signedImageUrls.length > 0 
    ? `
      <h3 style="color: #333; margin-top: 20px;">📷 Project Photos (${signedImageUrls.length}):</h3>
      <div style="background: #fff; padding: 15px;">
        ${signedImageUrls.map((url, index) => {
          const safeUrl = sanitizeUrl(url);
          return safeUrl ? `
            <div style="margin-bottom: 15px;">
              <a href="${safeUrl}" target="_blank" style="display: block;">
                <img src="${safeUrl}" alt="Project photo ${index + 1}" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #ddd;" />
              </a>
              <p style="font-size: 12px; color: #666; margin: 5px 0 0 0;">Photo ${index + 1} - <a href="${safeUrl}" target="_blank" style="color: #e74c3c;">View full size</a></p>
            </div>
          ` : '';
        }).join('')}
      </div>
    `
    : '';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a1a2e; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">🦏 New Quote Request</h1>
      </div>
      <div style="padding: 20px; background: #f9f9f9;">
        <h2 style="color: #333; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
          Customer Information
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 140px;">Name:</td>
            <td style="padding: 10px;">${safeName}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px;">${safePhone}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold;">Service:</td>
            <td style="padding: 10px; color: #e74c3c; font-weight: bold;">${safeService}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Location:</td>
            <td style="padding: 10px;">${safeCity}, ${safeState}</td>
          </tr>
        </table>
        
        ${safeMessage ? `
        <h3 style="color: #333; margin-top: 20px;">Message:</h3>
        <div style="background: #fff; padding: 15px; border-left: 4px solid #e74c3c;">
          ${safeMessage}
        </div>
        ` : ""}
        
        ${imageGalleryHtml}
        
        <div style="margin-top: 20px; padding: 15px; background: #e74c3c; color: white; text-align: center; border-radius: 5px;">
          <strong>Quote ID:</strong> ${payload.quoteId}
        </div>
      </div>
      <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
        This is an automated notification from Rhino Remodeler
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sendgridApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: businessEmail }] }],
        from: { email: "noreply@rhinoremodeler.com", name: "Rhino Remodeler" },
        subject: `🏠 New Quote Request: ${safeService} - ${safeName}`,
        content: [{ type: "text/html", value: emailHtml }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid email error:", error);
      return false;
    }

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: NotificationPayload = await req.json();

    console.log("Sending notifications for quote:", payload.quoteId);

    // Generate signed URLs for images (bucket is now private)
    const signedImageUrls = await getSignedImageUrls(payload.imageUrls || []);

    // Send both business and customer emails in parallel
    const [businessEmailResult, customerEmailResult] = await Promise.all([
      sendEmail(payload, signedImageUrls),
      sendCustomerConfirmation(payload),
    ]);

    console.log("Business email:", businessEmailResult ? "sent" : "failed");
    console.log("Customer confirmation:", customerEmailResult ? "sent" : "failed");

    return new Response(
      JSON.stringify({
        success: true,
        sms: false, // SMS disabled
        businessEmail: businessEmailResult,
        customerEmail: customerEmailResult,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send notifications" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
