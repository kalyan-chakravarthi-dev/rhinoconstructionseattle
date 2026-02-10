import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- Types ---

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
  };
}

interface DriveFolder {
  id: string;
  name: string;
}

interface SyncResult {
  files_found: number;
  files_synced: number;
  files_skipped: number;
  files_errored: number;
  errors: Array<{ file: string; error: string }>;
  categories_found: string[];
}

// --- Google Auth (Service Account JWT) ---

function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createSignedJwt(
  serviceAccount: { client_email: string; private_key: string },
  scopes: string[]
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(header))
  );
  const encodedPayload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload))
  );
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Import PEM private key
  const pemContents = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\n/g, "");
  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = base64UrlEncode(new Uint8Array(signature));
  return `${signingInput}.${encodedSignature}`;
}

async function getGoogleAccessToken(
  serviceAccount: { client_email: string; private_key: string }
): Promise<string> {
  const jwt = await createSignedJwt(serviceAccount, [
    "https://www.googleapis.com/auth/drive.readonly",
  ]);

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const err = await tokenResponse.text();
    throw new Error(`Failed to get Google access token: ${err}`);
  }

  const { access_token } = await tokenResponse.json();
  return access_token;
}

// --- Google Drive API Helpers ---

async function listSubfolders(
  folderId: string,
  accessToken: string
): Promise<DriveFolder[]> {
  const query = `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&orderBy=name`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Drive API listSubfolders failed: ${await res.text()}`);
  }

  const data = await res.json();
  return data.files || [];
}

async function listImageFiles(
  folderId: string,
  accessToken: string
): Promise<DriveFile[]> {
  const query = `'${folderId}' in parents and (mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/webp') and trashed=false`;
  const fields = "files(id,name,mimeType,modifiedTime,size,imageMediaMetadata)";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime desc&pageSize=100`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Drive API listImageFiles failed: ${await res.text()}`);
  }

  const data = await res.json();
  return data.files || [];
}

async function downloadFile(
  fileId: string,
  accessToken: string
): Promise<ArrayBuffer> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Drive API download failed for ${fileId}: ${res.status}`);
  }

  return res.arrayBuffer();
}

// --- Helpers ---

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getExtension(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  return map[mimeType] || "jpg";
}

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/[-_]/g, " ") // replace dashes/underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // title case
}

// --- Main Handler ---

serve(async (req) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Auth: require service_role key as Bearer token
  const authHeader = req.headers.get("Authorization");
  const expectedKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Init Supabase client with service_role
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabase = createClient(supabaseUrl, expectedKey!, {
    auth: { persistSession: false },
  });

  // Create sync log entry
  const { data: syncLog, error: syncLogError } = await supabase
    .from("sync_log")
    .insert({ sync_type: "drive_to_supabase", status: "running" })
    .select("id")
    .single();

  if (syncLogError) {
    console.error("Failed to create sync log:", syncLogError);
    return new Response(
      JSON.stringify({ error: "Failed to create sync log" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const syncLogId = syncLog.id;
  const result: SyncResult = {
    files_found: 0,
    files_synced: 0,
    files_skipped: 0,
    files_errored: 0,
    errors: [],
    categories_found: [],
  };

  try {
    // Parse Google service account credentials
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    const driveFolderId = Deno.env.get("GOOGLE_DRIVE_FOLDER_ID");

    if (!serviceAccountJson || !driveFolderId) {
      throw new Error(
        "Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_FOLDER_ID"
      );
    }

    const serviceAccount = JSON.parse(serviceAccountJson);
    const accessToken = await getGoogleAccessToken(serviceAccount);

    // List subfolders (categories)
    const subfolders = await listSubfolders(driveFolderId, accessToken);
    result.categories_found = subfolders.map((f) => f.name);

    // Load existing drive_file_ids for dedup
    const { data: existingImages } = await supabase
      .from("gallery_images")
      .select("drive_file_id");
    const existingIds = new Set(
      (existingImages || []).map((img: { drive_file_id: string }) => img.drive_file_id)
    );

    // Process each subfolder
    for (const folder of subfolders) {
      const category = slugify(folder.name);
      const categoryDisplayName = folder.name;

      const files = await listImageFiles(folder.id, accessToken);
      result.files_found += files.length;

      for (const file of files) {
        // Skip if already synced
        if (existingIds.has(file.id)) {
          result.files_skipped++;
          continue;
        }

        try {
          // Download from Drive
          const fileData = await downloadFile(file.id, accessToken);
          const ext = getExtension(file.mimeType);
          const storagePath = `${category}/${file.id}.${ext}`;

          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from("gallery-images")
            .upload(storagePath, fileData, {
              contentType: file.mimeType,
              upsert: false,
            });

          if (uploadError) {
            throw new Error(`Storage upload failed: ${uploadError.message}`);
          }

          // Get public URL
          const {
            data: { publicUrl },
          } = supabase.storage.from("gallery-images").getPublicUrl(storagePath);

          // Insert metadata
          const { error: insertError } = await supabase
            .from("gallery_images")
            .insert({
              drive_file_id: file.id,
              drive_file_name: file.name,
              drive_modified_time: file.modifiedTime,
              category,
              category_display_name: categoryDisplayName,
              storage_path: storagePath,
              storage_url: publicUrl,
              title: titleFromFilename(file.name),
              width: file.imageMediaMetadata?.width ?? null,
              height: file.imageMediaMetadata?.height ?? null,
              file_size_bytes: file.size ? parseInt(file.size, 10) : null,
              mime_type: file.mimeType,
            });

          if (insertError) {
            throw new Error(`DB insert failed: ${insertError.message}`);
          }

          result.files_synced++;
          existingIds.add(file.id); // prevent re-processing within same run
        } catch (fileError) {
          result.files_errored++;
          result.errors.push({
            file: file.name,
            error:
              fileError instanceof Error
                ? fileError.message
                : String(fileError),
          });
          console.error(`Error syncing file ${file.name}:`, fileError);
        }
      }
    }

    // Update sync log with results
    await supabase
      .from("sync_log")
      .update({
        completed_at: new Date().toISOString(),
        status: result.files_errored > 0 ? "completed_with_errors" : "completed",
        files_found: result.files_found,
        files_synced: result.files_synced,
        files_skipped: result.files_skipped,
        files_errored: result.files_errored,
        error_details: result.errors,
      })
      .eq("id", syncLogId);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    console.error("Sync failed:", errorMessage);

    // Update sync log with failure
    await supabase
      .from("sync_log")
      .update({
        completed_at: new Date().toISOString(),
        status: "failed",
        error_details: [{ file: "N/A", error: errorMessage }],
      })
      .eq("id", syncLogId);

    return new Response(JSON.stringify({ error: errorMessage, ...result }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
