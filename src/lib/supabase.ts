
import { createClient } from '@supabase/supabase-js';

// Define types based on our database schema
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  signup_date: string;
};

export type Restaurant = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  location: string;
  cuisine: string;
  deals?: string[];
  images?: string[];
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
};

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if environment variables are properly configured
const isSupabaseConfigured = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log warning if Supabase is not configured
if (!isSupabaseConfigured) {
  console.error('Supabase credentials are missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.');
}

// Authentication functions
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot sign in: Supabase credentials not configured');
    return { error: new Error('Supabase credentials not configured') };
  }
  
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const signOut = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot sign out: Supabase credentials not configured');
    return { error: new Error('Supabase credentials not configured') };
  }
  
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get current user: Supabase credentials not configured');
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// User management functions
export const createUserProfile = async (userData: Omit<User, 'id'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create user profile: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: currentUser.id,
      ...userData,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId?: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get user profile: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  let id = userId;
  
  if (!id) {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No authenticated user found');
    id = currentUser.id;
  }
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as User;
};

// Restaurant functions
export const createRestaurant = async (restaurantData: Omit<Restaurant, 'id'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create restaurant: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('restaurants')
    .insert(restaurantData)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getRestaurantsByOwner = async (ownerId: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get restaurants: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', ownerId);
    
  if (error) throw error;
  return data as Restaurant[];
};

export const getAllRestaurants = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get all restaurants: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*');
    
  if (error) throw error;
  return data as Restaurant[];
};

// Reservation functions
export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'status'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create reservation: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      ...reservationData,
      status: 'pending'
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserReservations = async (userId: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get user reservations: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('reservations')
    .select('*, restaurants(*)')
    .eq('user_id', userId);
    
  if (error) throw error;
  return data;
};

export const getRestaurantReservations = async (restaurantId: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get restaurant reservations: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('reservations')
    .select('*, users(*)')
    .eq('restaurant_id', restaurantId);
    
  if (error) throw error;
  return data;
};

export const getAllReservations = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get all reservations: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('reservations')
    .select('*, users(*), restaurants(*)');
    
  if (error) throw error;
  return data;
};

export const updateReservationStatus = async (
  reservationId: string, 
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot update reservation status: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const { data, error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', reservationId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
