-- Drop the existing permissive INSERT policy
DROP POLICY IF EXISTS "Only service role can insert quotes" ON public.quote_requests;

-- Create a restrictive policy that denies all public INSERT attempts
-- The service_role used by edge functions bypasses RLS entirely, so it can still insert
CREATE POLICY "Deny public insert access to quote requests"
ON public.quote_requests
FOR INSERT
TO public
WITH CHECK (false);