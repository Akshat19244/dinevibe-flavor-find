-- Create query_requests table for the new token-based system
CREATE TABLE public.query_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_token TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL,
  venue_id UUID,
  event_type TEXT NOT NULL,
  location TEXT NOT NULL,
  guest_count INTEGER NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  event_date DATE NOT NULL,
  event_time TIME,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  response_deadline TIMESTAMP WITH TIME ZONE,
  vendor_response TEXT,
  vendor_response_at TIMESTAMP WITH TIME ZONE
);

-- Create query_responses table for vendor responses
CREATE TABLE public.query_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_id UUID NOT NULL REFERENCES public.query_requests(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL,
  response_type TEXT NOT NULL CHECK (response_type IN ('accept', 'reject', 'counter')),
  message TEXT,
  quoted_price INTEGER,
  terms_conditions TEXT,
  availability_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create function to generate query tokens
CREATE OR REPLACE FUNCTION public.generate_query_token()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'EQ' || TO_CHAR(NOW(), 'YYYYMMDD') || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
END;
$$;

-- Enable Row Level Security
ALTER TABLE public.query_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.query_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for query_requests
CREATE POLICY "Customers can create their own queries" 
ON public.query_requests 
FOR INSERT 
WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can view their own queries" 
ON public.query_requests 
FOR SELECT 
USING (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own queries" 
ON public.query_requests 
FOR UPDATE 
USING (auth.uid() = customer_id);

CREATE POLICY "Venue owners can view queries for their venues" 
ON public.query_requests 
FOR SELECT 
USING (
  venue_id IS NULL OR 
  EXISTS (
    SELECT 1 FROM venues 
    WHERE venues.id = query_requests.venue_id 
    AND venues.owner_id = auth.uid()
  )
);

CREATE POLICY "Venue owners can update query status" 
ON public.query_requests 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM venues 
    WHERE venues.id = query_requests.venue_id 
    AND venues.owner_id = auth.uid()
  )
);

-- RLS Policies for query_responses
CREATE POLICY "Vendors can create responses to queries" 
ON public.query_responses 
FOR INSERT 
WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Customers can view responses to their queries" 
ON public.query_responses 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM query_requests 
    WHERE query_requests.id = query_responses.query_id 
    AND query_requests.customer_id = auth.uid()
  )
);

CREATE POLICY "Vendors can view their own responses" 
ON public.query_responses 
FOR SELECT 
USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update their own responses" 
ON public.query_responses 
FOR UPDATE 
USING (auth.uid() = vendor_id);

-- Create trigger for updating query_requests timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_query_requests_updated_at
BEFORE UPDATE ON public.query_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();