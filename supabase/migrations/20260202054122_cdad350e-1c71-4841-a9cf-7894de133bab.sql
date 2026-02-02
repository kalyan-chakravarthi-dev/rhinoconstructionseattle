-- Add explicit RLS policies to deny public access to quote_requests
-- The service_role used by Edge Functions will still have full access

-- Deny public SELECT access
CREATE POLICY "Deny public read access to quote requests"
ON public.quote_requests
FOR SELECT
USING (false);

-- Deny public UPDATE access
CREATE POLICY "Deny public update access to quote requests"
ON public.quote_requests
FOR UPDATE
USING (false);

-- Deny public DELETE access
CREATE POLICY "Deny public delete access to quote requests"
ON public.quote_requests
FOR DELETE
USING (false);