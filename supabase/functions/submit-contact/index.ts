import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sanitizeForEmail, sanitizeMessage } from "../_shared/sanitize.ts";
import { getCorsHeaders, handleCorsPreflightIfNeeded } from "../_shared/cors.ts";

interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  service?: string;
  heardFrom?: string;
  message: string;
}

const SERVICE_LABELS: Record<string, string> = {
  general: "General Inquiry",
  kitchen: "Kitchen Remodeling",
  bathroom: "Bathroom Renovation",
  roofing: "Roofing Services",
  electrical: "Electrical Work",
  plumbing: "Plumbing Services",
  other: "Other",
};

const HEARD_FROM_LABELS: Record<string, string> = {
  google: "Google Search",
  social: "Social Media",
  referral: "Friend/Family Referral",
  previous: "Previous Customer",
  advertisement: "Advertisement",
  other: "Other",
};

serve(async (req: Request): Promise<Response> => {
  const preflightResponse = handleCorsPreflightIfNeeded(req);
  if (preflightResponse) return preflightResponse;

  const corsHeaders = getCorsHeaders(req);

  try {
    const body: ContactRequest = await req.json();
    
    if (!body.fullName || !body.email || !body.phone || !body.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.fullName.length > 100 || body.email.length > 255 || body.message.length > 500) {
      return new Response(
        JSON.stringify({ error: "Field length exceeds maximum" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: contactData, error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        service: body.service || null,
        heard_from: body.heardFrom || null,
        message: body.message.trim(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save contact message" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const createdAt = new Date(contactData.created_at);
    const trackingId = `MSG-${createdAt.getFullYear()}-${contactData.id.substring(0, 4).toUpperCase()}`;

    const sendGridApiKey = Deno.env.get("SENDGRID_API_KEY");
    if (sendGridApiKey) {
      const safeFullName = sanitizeForEmail(body.fullName);
      const safeFirstName = sanitizeForEmail(body.fullName.split(' ')[0]);
      const safeEmail = sanitizeForEmail(body.email);
      const safePhone = sanitizeForEmail(body.phone);
      const safeMessage = sanitizeMessage(body.message);
      
      const serviceLabel = body.service ? SERVICE_LABELS[body.service] || sanitizeForEmail(body.service) : "Not specified";
      const heardFromLabel = body.heardFrom ? HEARD_FROM_LABELS[body.heardFrom] || sanitizeForEmail(body.heardFrom) : "Not specified";
      
      const businessEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">New Contact Message</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="color: #666; margin-bottom: 20px;">Tracking ID: <strong>${trackingId}</strong></p>
            
            <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="padding: 8px 0;"><strong>${safeFullName}</strong></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${body.phone.replace(/\D/g, '')}">${safePhone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Service Interest:</td><td style="padding: 8px 0;">${serviceLabel}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">How They Found Us:</td><td style="padding: 8px 0;">${heardFromLabel}</td></tr>
            </table>
            
            <h2 style="color: #1e3a5f; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Message</h2>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">
              <p style="margin: 0;">${safeMessage}</p>
            </div>
          </div>
          <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 12px;">Rhino Remodeler Contact System</p>
          </div>
        </div>
      `;

      const customerEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Message Received!</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Hi ${safeFirstName},</p>
            <p>Thank you for contacting <strong>Rhino Remodeler</strong>. We've received your message and will get back to you within 24 hours.</p>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your Reference ID:</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1e3a5f;">${trackingId}</p>
            </div>
            
            <h3 style="color: #1e3a5f;">Your Message Summary:</h3>
            <p style="background-color: #ffffff; padding: 15px; border-radius: 8px;">${safeMessage}</p>
            
            <p style="margin-top: 20px;">If you have any urgent questions, feel free to call us at <a href="tel:2064879677">(206) 487-9677</a>.</p>
            
            <p>Best regards,<br><strong>The Rhino Remodeler Team</strong></p>
          </div>
          <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
            <p style="color: #ffffff; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Rhino Remodeler | Kent, WA</p>
          </div>
        </div>
      `;

      const emailPromises = [
        fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendGridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: "francisco@rhinoremodeler.com" }] }],
            from: { email: "noreply@rhinoremodeler.com", name: "Rhino Remodeler" },
            subject: `New Contact: ${safeFullName} - ${serviceLabel}`,
            content: [{ type: "text/html", value: businessEmailHtml }],
          }),
        }),
        fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendGridApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: body.email }] }],
            from: { email: "noreply@rhinoremodeler.com", name: "Rhino Remodeler" },
            subject: `We received your message - ${trackingId}`,
            content: [{ type: "text/html", value: customerEmailHtml }],
          }),
        }),
      ];

      const emailResults = await Promise.allSettled(emailPromises);
      emailResults.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Email ${index + 1} failed:`, result.reason);
        }
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        trackingId,
        message: "Contact message submitted successfully" 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in submit-contact:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
