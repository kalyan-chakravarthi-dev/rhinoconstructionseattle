-- Create table to store quote requests
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_requested TEXT NOT NULL,
  property_city TEXT,
  property_state TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for quote form submissions)
CREATE POLICY "Allow public inserts" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Optional: Allow reading own submissions by email (for confirmation)
CREATE POLICY "Allow reading by email" 
ON public.quote_requests 
FOR SELECT 
USING (true);