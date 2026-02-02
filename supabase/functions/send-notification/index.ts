import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
}

// SMS functionality commented out for now - will be enabled when Twilio is configured
// async function sendSMS(payload: NotificationPayload): Promise<boolean> {
//   const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
//   const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
//   const fromPhone = Deno.env.get("TWILIO_PHONE_NUMBER");
//   const businessPhone = Deno.env.get("BUSINESS_PHONE");
//
//   const smsBody = `🏠 New Quote Request!
// Customer: ${payload.customerName}
// Service: ${payload.serviceRequested}
// Location: ${payload.propertyCity || "N/A"}, ${payload.propertyState || "N/A"}
// Phone: ${payload.phone || "Not provided"}
// ID: ${payload.quoteId.slice(0, 8)}`;
//
//   try {
//     const response = await fetch(
//       `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
//       {
//         method: "POST",
//         headers: {
//           "Authorization": `Basic ${btoa(`${accountSid}:${authToken}`)}`,
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           To: businessPhone,
//           From: fromPhone,
//           Body: smsBody,
//         }),
//       }
//     );
//
//     if (!response.ok) {
//       const error = await response.text();
//       console.error("Twilio SMS error:", error);
//       return false;
//     }
//
//     console.log("SMS sent successfully");
//     return true;
//   } catch (error) {
//     console.error("SMS send failed:", error);
//     return false;
//   }
// }

// Send Email via SendGrid
async function sendEmail(payload: NotificationPayload): Promise<boolean> {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  const businessEmail = "francisco@rhinoremodeller.com";

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
            <td style="padding: 10px;">${payload.customerName}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${payload.email}">${payload.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px;">${payload.phone || "Not provided"}</td>
          </tr>
          <tr style="background: #fff;">
            <td style="padding: 10px; font-weight: bold;">Service:</td>
            <td style="padding: 10px; color: #e74c3c; font-weight: bold;">${payload.serviceRequested}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Location:</td>
            <td style="padding: 10px;">${payload.propertyCity || "N/A"}, ${payload.propertyState || "N/A"}</td>
          </tr>
        </table>
        
        ${payload.message ? `
        <h3 style="color: #333; margin-top: 20px;">Message:</h3>
        <div style="background: #fff; padding: 15px; border-left: 4px solid #e74c3c;">
          ${payload.message}
        </div>
        ` : ""}
        
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
        from: { email: "noreply@rhinoremodeller.com", name: "Rhino Remodeler" },
        subject: `🏠 New Quote Request: ${payload.serviceRequested} - ${payload.customerName}`,
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

    // Send email notification (SMS disabled for now)
    const emailResult = await sendEmail(payload);

    return new Response(
      JSON.stringify({
        success: true,
        sms: false, // SMS disabled
        email: emailResult,
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
