-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  heard_from TEXT,
  message TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Deny all public access (submissions go through edge function with service role)
CREATE POLICY "Deny public insert access to contact messages"
  ON public.contact_messages
  AS RESTRICTIVE
  FOR INSERT
  TO public
  WITH CHECK (false);

CREATE POLICY "Deny public read access to contact messages"
  ON public.contact_messages
  AS RESTRICTIVE
  FOR SELECT
  TO public
  USING (false);

CREATE POLICY "Deny public update access to contact messages"
  ON public.contact_messages
  AS RESTRICTIVE
  FOR UPDATE
  TO public
  USING (false);

CREATE POLICY "Deny public delete access to contact messages"
  ON public.contact_messages
  AS RESTRICTIVE
  FOR DELETE
  TO public
  USING (false);