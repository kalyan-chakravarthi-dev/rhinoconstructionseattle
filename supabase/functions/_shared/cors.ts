const ALLOWED_ORIGINS = [
  "https://rhinoremodeler.com",
  "https://www.rhinoremodeler.com",
  "https://rhinoremodeler.lovable.app",
  "https://id-preview--980a5d59-efda-410d-ab8c-3ab8ae7e441d.lovable.app",
];

// Also allow any Lovable preview domain pattern
function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow Lovable preview/project domains
  if (/^https:\/\/.*\.lovable\.app$/.test(origin)) return true;
  if (/^https:\/\/.*\.lovableproject\.com$/.test(origin)) return true;
  return false;
}

const CORS_HEADERS_BASE = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowed = isAllowedOrigin(origin);

  return {
    ...CORS_HEADERS_BASE,
    "Access-Control-Allow-Origin": allowed ? origin : "",
    ...(allowed ? { "Vary": "Origin" } : {}),
  };
}

export function handleCorsPreflightIfNeeded(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(req) });
  }
  return null;
}
