-- Create storage bucket for quote request images
INSERT INTO storage.buckets (id, name, public)
VALUES ('quote-images', 'quote-images', true);

-- Allow anyone to upload images to the quote-images bucket (for quote form submissions)
CREATE POLICY "Anyone can upload quote images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'quote-images');

-- Allow anyone to view quote images (public access for email embedding)
CREATE POLICY "Quote images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'quote-images');