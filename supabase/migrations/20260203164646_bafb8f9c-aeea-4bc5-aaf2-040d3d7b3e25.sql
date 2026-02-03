-- Make quote-images bucket private to protect customer photos
UPDATE storage.buckets 
SET public = false 
WHERE id = 'quote-images';

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can upload quote images" ON storage.objects;
DROP POLICY IF EXISTS "Quote images are publicly accessible" ON storage.objects;

-- Allow anonymous and authenticated users to upload images (for quote form)
CREATE POLICY "Allow uploads to quote-images bucket"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'quote-images');

-- Only service_role can read images (for signed URL generation in edge functions)
-- This is automatically allowed for service_role, no explicit policy needed
-- Anon/authenticated cannot read directly - must go through edge function