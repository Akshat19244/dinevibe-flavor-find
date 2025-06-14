
-- Create tables for venues/restaurants
CREATE TABLE public.venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('restaurant', 'banquet', 'both')),
  email TEXT,
  phone TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(3, 2) DEFAULT 0.0,
  google_review_url TEXT,
  menu_images TEXT[],
  venue_images TEXT[],
  banquet_images TEXT[],
  has_360_preview BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  auto_approved BOOLEAN DEFAULT false,
  services TEXT[] DEFAULT '{}',
  ambience_type TEXT[],
  guest_capacity INTEGER,
  price_range_min INTEGER,
  price_range_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  venue_id UUID REFERENCES public.venues NOT NULL,
  booking_token TEXT UNIQUE NOT NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('dining', 'event')),
  dining_type TEXT,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  guest_count INTEGER NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  menu_preference TEXT,
  special_requests TEXT,
  guest_list TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community posts table
CREATE TABLE public.community_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users NOT NULL,
  author_type TEXT NOT NULL CHECK (author_type IN ('admin', 'owner')),
  venue_id UUID REFERENCES public.venues,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  post_type TEXT NOT NULL CHECK (post_type IN ('deal', 'event', 'announcement', 'story', 'testimonial')),
  tags TEXT[],
  location TEXT,
  is_approved BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support messages table
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create availability calendar table
CREATE TABLE public.venue_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID REFERENCES public.venues NOT NULL,
  date DATE NOT NULL,
  time_slot TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  booking_id UUID REFERENCES public.bookings,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(venue_id, date, time_slot)
);

-- Create post likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  post_id UUID REFERENCES public.community_posts NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable RLS on all tables
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for venues
CREATE POLICY "Users can view approved venues" ON public.venues FOR SELECT USING (is_approved = true);
CREATE POLICY "Owners can view their own venues" ON public.venues FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert their own venues" ON public.venues FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update their own venues" ON public.venues FOR UPDATE USING (auth.uid() = owner_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Venue owners can view bookings for their venues" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.venues WHERE venues.id = bookings.venue_id AND venues.owner_id = auth.uid())
);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Venue owners can update booking status" ON public.bookings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.venues WHERE venues.id = bookings.venue_id AND venues.owner_id = auth.uid())
);

-- RLS Policies for community posts
CREATE POLICY "Everyone can view approved posts" ON public.community_posts FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can view their own posts" ON public.community_posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Users can create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING (auth.uid() = author_id);

-- RLS Policies for support messages
CREATE POLICY "Users can view their own support messages" ON public.support_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create support messages" ON public.support_messages FOR INSERT WITH CHECK (true);

-- RLS Policies for venue availability
CREATE POLICY "Everyone can view availability" ON public.venue_availability FOR SELECT USING (true);
CREATE POLICY "Venue owners can manage availability" ON public.venue_availability FOR ALL USING (
  EXISTS (SELECT 1 FROM public.venues WHERE venues.id = venue_availability.venue_id AND venues.owner_id = auth.uid())
);

-- RLS Policies for post likes
CREATE POLICY "Users can view all likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- Create function to generate unique booking tokens
CREATE OR REPLACE FUNCTION generate_booking_token()
RETURNS TEXT AS $$
BEGIN
  RETURN 'DV' || TO_CHAR(NOW(), 'YYYYMMDD') || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;

-- Create function to auto-approve venues with rating >= 4.0
CREATE OR REPLACE FUNCTION auto_approve_venue()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.rating >= 4.0 AND OLD.rating < 4.0 THEN
    NEW.is_approved = true;
    NEW.auto_approved = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-approval
CREATE TRIGGER auto_approve_venue_trigger
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION auto_approve_venue();

-- Create storage bucket for venue images
INSERT INTO storage.buckets (id, name, public) VALUES ('venue-images', 'venue-images', true);

-- Create storage policies
CREATE POLICY "Anyone can view venue images" ON storage.objects FOR SELECT USING (bucket_id = 'venue-images');
CREATE POLICY "Authenticated users can upload venue images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'venue-images' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can update their own venue images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'venue-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
