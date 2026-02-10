-- Gallery Images: stores metadata for images synced from Google Drive
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_file_id TEXT UNIQUE NOT NULL,
  drive_file_name TEXT NOT NULL,
  drive_modified_time TIMESTAMPTZ,
  category TEXT NOT NULL,
  category_display_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  thumbnail_path TEXT,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  width INTEGER,
  height INTEGER,
  file_size_bytes BIGINT,
  mime_type TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  social_posted_at JSONB DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON public.gallery_images (category);
CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON public.gallery_images (published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_featured ON public.gallery_images (featured) WHERE featured = true;

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION public.update_gallery_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_gallery_images_updated_at();

-- Sync Log: operational tracking for sync runs
CREATE TABLE IF NOT EXISTS public.sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type TEXT NOT NULL DEFAULT 'drive_to_supabase',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running',
  files_found INTEGER DEFAULT 0,
  files_synced INTEGER DEFAULT 0,
  files_skipped INTEGER DEFAULT 0,
  files_errored INTEGER DEFAULT 0,
  error_details JSONB DEFAULT '[]'::jsonb
);

-- RLS: gallery_images — public read for published images, writes via service_role only
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published gallery images"
  ON public.gallery_images
  FOR SELECT
  USING (published = true);

-- RLS: sync_log — no public access, service_role only
ALTER TABLE public.sync_log ENABLE ROW LEVEL SECURITY;

-- Storage bucket: gallery-images (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public read for gallery-images bucket
CREATE POLICY "Public read access for gallery images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gallery-images');

-- Storage RLS: service_role can insert/update/delete (no anon write)
CREATE POLICY "Service role can manage gallery images"
  ON storage.objects
  FOR ALL
  USING (bucket_id = 'gallery-images' AND auth.role() = 'service_role')
  WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'service_role');
