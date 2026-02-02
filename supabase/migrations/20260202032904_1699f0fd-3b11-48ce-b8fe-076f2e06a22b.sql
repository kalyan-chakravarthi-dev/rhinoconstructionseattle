-- Drop the insecure policies
DROP POLICY IF EXISTS "Allow public inserts" ON public.quote_requests;
DROP POLICY IF EXISTS "Allow reading by email" ON public.quote_requests;

-- Create secure INSERT policy - only service_role (Edge Function) can insert
-- The Edge Function already uses the service_role key for insertions
CREATE POLICY "Only service role can insert quotes"
ON public.quote_requests
FOR INSERT
TO service_role
WITH CHECK (true);

-- No SELECT policy for anon/authenticated users
-- Quote data should only be accessed through admin dashboards with proper auth
-- If you need customer access later, create an authenticated policy with email matching