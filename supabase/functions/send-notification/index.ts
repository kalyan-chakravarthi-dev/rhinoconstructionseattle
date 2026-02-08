import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sanitizeForEmail, sanitizeMessage, sanitizeUrl } from "../_shared/sanitize.ts";
import { getCorsHeaders, handleCorsPreflightIfNeeded } from "../_shared/cors.ts";
import { generateQuoteCustomerEmail } from "../_shared/email-templates/quote-customer.ts";
import { generateQuoteBusinessEmail } from "../_shared/email-templates/quote-business.ts";

interface NotificationPayload {
  customerName: string;
  email: string;
  phone?: string | null;
  serviceRequested: string;
  propertyCity?: string | null;
  propertyState?: string | null;
  message?: string | null;
  quoteId: string;
  trackingId: string; // Canonical ID from submit-quote
  imageUrls?: string[];
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
        let path = url;
        if (url.includes('/quote-images/')) {
          path = url.split('/quote-images/')[1];
        }
        if (!path) return url;

        const { data, error } = await supabase.storage
          .from('quote-images')
          .createSignedUrl(path, 604800);

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

  const safeName = sanitizeForEmail(payload.customerName);
  const safeService = sanitizeForEmail(payload.serviceRequested);
  const safeCity = sanitizeForEmail(payload.propertyCity) || "N/A";
  const safeState = sanitizeForEmail(payload.propertyState) || "N/A";
  const safeEmail = sanitizeForEmail(payload.email);
  const safePhone = sanitizeForEmail(payload.phone);

  const { subject, html, text } = generateQuoteCustomerEmail({
    customerName: safeName,
    trackingId: payload.trackingId,
    service: safeService,
    city: safeCity,
    state: safeState,
    email: safeEmail,
    phone: safePhone || undefined,
    imageCount: payload.imageUrls?.length || 0,
  });

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
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
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

// Send business notification email via SendGrid
async function sendBusinessNotification(payload: NotificationPayload, signedImageUrls: string[]): Promise<boolean> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  const businessEmail = "francisco@rhinoremodeler.com";

  const safeName = sanitizeForEmail(payload.customerName);
  const safeService = sanitizeForEmail(payload.serviceRequested);
  const safeCity = sanitizeForEmail(payload.propertyCity) || "N/A";
  const safeState = sanitizeForEmail(payload.propertyState) || "N/A";
  const safeEmail = sanitizeForEmail(payload.email);
  const safePhone = sanitizeForEmail(payload.phone) || "Not provided";
  const safeMessage = sanitizeMessage(payload.message);

  // Sanitize image URLs
  const safeImageUrls = signedImageUrls
    .map(url => sanitizeUrl(url))
    .filter(url => url !== '');

  const { subject, html, text } = generateQuoteBusinessEmail({
    customerName: safeName,
    email: safeEmail,
    phone: safePhone,
    service: safeService,
    city: safeCity,
    state: safeState,
    message: safeMessage || undefined,
    quoteId: payload.trackingId,
    imageUrls: safeImageUrls,
  });

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
        subject,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid email error:", error);
      return false;
    }

    console.log("Business notification email sent successfully");
    return true;
  } catch (error) {
    console.error("Business email send failed:", error);
    return false;
  }
}

serve(async (req) => {
  const preflightResponse = handleCorsPreflightIfNeeded(req);
  if (preflightResponse) return preflightResponse;

  const corsHeaders = getCorsHeaders(req);

  try {
    const payload: NotificationPayload = await req.json();

    console.log("Sending notifications for quote:", payload.quoteId);

    const signedImageUrls = await getSignedImageUrls(payload.imageUrls || []);

    const [businessEmailResult, customerEmailResult] = await Promise.all([
      sendBusinessNotification(payload, signedImageUrls),
      sendCustomerConfirmation(payload),
    ]);

    console.log("Business email:", businessEmailResult ? "sent" : "failed");
    console.log("Customer confirmation:", customerEmailResult ? "sent" : "failed");

    return new Response(
      JSON.stringify({
        success: true,
        sms: false,
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
