import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sanitizeForEmail, sanitizeMessage } from "../_shared/sanitize.ts";
import { getCorsHeaders, handleCorsPreflightIfNeeded } from "../_shared/cors.ts";
import { generateContactCustomerEmail } from "../_shared/email-templates/contact-customer.ts";
import { generateContactBusinessEmail } from "../_shared/email-templates/contact-business.ts";

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

      // Generate emails from templates
      const businessEmail = generateContactBusinessEmail({
        fullName: safeFullName,
        email: safeEmail,
        phone: safePhone,
        serviceLabel,
        heardFromLabel,
        message: safeMessage,
        trackingId,
      });

      const customerEmail = generateContactCustomerEmail({
        firstName: safeFirstName,
        trackingId,
        message: safeMessage,
      });

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
            subject: businessEmail.subject,
            content: [
              { type: "text/plain", value: businessEmail.text },
              { type: "text/html", value: businessEmail.html },
            ],
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
            subject: customerEmail.subject,
            content: [
              { type: "text/plain", value: customerEmail.text },
              { type: "text/html", value: customerEmail.html },
            ],
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
