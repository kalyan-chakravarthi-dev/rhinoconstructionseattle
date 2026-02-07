import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCorsPreflightIfNeeded } from "../_shared/cors.ts";

interface QuoteSubmission {
  customer_name: string;
  email: string;
  phone?: string | null;
  service_requested: string;
  property_city?: string | null;
  property_state?: string | null;
  message?: string | null;
  image_urls?: string[];
}

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string | null | undefined): boolean {
  if (!phone) return true; // Phone is optional
  // Accept formats like (123) 456-7890 or 1234567890
  const cleaned = phone.replace(/[\s()-]/g, '');
  return /^\d{10}$/.test(cleaned);
}

function sanitizeString(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

serve(async (req) => {
  const preflightResponse = handleCorsPreflightIfNeeded(req);
  if (preflightResponse) return preflightResponse;

  const corsHeaders = getCorsHeaders(req);

  try {
    const data: QuoteSubmission = await req.json();

    // Server-side validation
    const errors: string[] = [];

    // Validate required fields
    if (!data.customer_name || data.customer_name.trim().length === 0) {
      errors.push("Customer name is required");
    } else if (data.customer_name.length > 100) {
      errors.push("Customer name must be less than 100 characters");
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push("Email is required");
    } else if (!validateEmail(data.email)) {
      errors.push("Invalid email address");
    } else if (data.email.length > 255) {
      errors.push("Email must be less than 255 characters");
    }

    if (!validatePhone(data.phone)) {
      errors.push("Invalid phone number format");
    }

    if (!data.service_requested || data.service_requested.trim().length === 0) {
      errors.push("Service requested is required");
    } else if (data.service_requested.length > 100) {
      errors.push("Service requested must be less than 100 characters");
    }

    if (data.message && data.message.length > 2000) {
      errors.push("Message must be less than 2000 characters");
    }

    if (data.property_city && data.property_city.length > 100) {
      errors.push("City must be less than 100 characters");
    }

    if (data.property_state && data.property_state.length > 50) {
      errors.push("State must be less than 50 characters");
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      customer_name: sanitizeString(data.customer_name, 100),
      email: data.email.toLowerCase().trim(),
      phone: data.phone ? data.phone.replace(/[^\d()-\s]/g, '').slice(0, 20) : null,
      service_requested: sanitizeString(data.service_requested, 100),
      property_city: data.property_city ? sanitizeString(data.property_city, 100) : null,
      property_state: data.property_state ? sanitizeString(data.property_state, 50) : null,
      message: data.message ? sanitizeString(data.message, 2000) : null,
    };

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { data: insertedData, error } = await supabase
      .from("quote_requests")
      .insert(sanitizedData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ success: false, errors: ["Failed to save quote request"] }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notifications (fire-and-forget, don't block the response)
    const notificationPayload = {
      customerName: sanitizedData.customer_name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      serviceRequested: sanitizedData.service_requested,
      propertyCity: sanitizedData.property_city,
      propertyState: sanitizedData.property_state,
      message: sanitizedData.message,
      quoteId: insertedData.id,
      imageUrls: data.image_urls || [],
    };

    // Call notification function asynchronously
    fetch(`${supabaseUrl}/functions/v1/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify(notificationPayload),
    }).catch((err) => console.error("Notification trigger failed:", err));

    return new Response(
      JSON.stringify({ success: true, id: insertedData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error processing request:", err);
    return new Response(
      JSON.stringify({ success: false, errors: ["An unexpected error occurred"] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
