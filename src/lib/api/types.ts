
// Define types based on our database schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  signup_date: string;
  avatar_url?: string;
};

export type Restaurant = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  location: string;
  cuisine: string;
  deals?: Deal[];
  images?: string[];
  created_at: string;
};

export type Deal = {
  id: string;
  restaurant_id: string;
  title: string;
  description: string;
  type: 'happy-hour' | 'discount' | 'voucher' | 'group';
  valid_from: string;
  valid_until: string;
  terms: string;
  discount_percentage?: number;
  code?: string;
  is_popular?: boolean;
  is_new?: boolean;
  created_at: string;
  restaurant_name?: string; // Added for display purposes when getting all deals
};

export type Reservation = {
  id: string;
  user_id: string;
  restaurant_id: string | null;
  guest_count: number;
  budget: string;
  location: string;
  event_type: string;
  optional_dish?: string;
  optional_decoration?: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  token?: string;
  created_at: string;
};
