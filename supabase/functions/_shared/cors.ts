const ALLOWED_ORIGINS = [
  "https://rhinoremodeler.lovable.app",
  "https://id-preview--980a5d59-efda-410d-ab8c-3ab8ae7e441d.lovable.app",
];

const CORS_HEADERS_BASE = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin);

  return {
    ...CORS_HEADERS_BASE,
    "Access-Control-Allow-Origin": allowed ? origin : ALLOWED_ORIGINS[0],
    ...(allowed ? { "Vary": "Origin" } : {}),
  };
}

export function handleCorsPreflightIfNeeded(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: getCorsHeaders(req) });
  }
  return null;
}
