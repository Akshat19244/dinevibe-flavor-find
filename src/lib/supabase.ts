
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Define types based on our database schema
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
  deals?: any[];
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

// Use the client from integrations
export const supabase = supabaseClient;

// Check if environment variables are properly configured
const isSupabaseConfigured = !!supabase;

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
export const createUserProfile = async (userData: Omit<User, 'id' | 'signup_date'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create user profile: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: currentUser.id,
      ...userData,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userData: Partial<Omit<User, 'id' | 'signup_date'>>) => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', currentUser.id)
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
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as User;
};

// Restaurant functions
export const createRestaurant = async (restaurantData: Omit<Restaurant, 'id' | 'created_at'>) => {
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

export const updateRestaurant = async (id: string, restaurantData: Partial<Omit<Restaurant, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase
    .from('restaurants')
    .update(restaurantData)
    .eq('id', id)
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

// Deal functions
// Since we don't have a deals table, we'll modify these to work with restaurant.deals
export const createDeal = async (dealData: Omit<Deal, 'id' | 'created_at'>) => {
  const { restaurant_id, ...dealInfo } = dealData;
  
  // First fetch the restaurant
  const { data: restaurant, error: fetchError } = await supabase
    .from('restaurants')
    .select('deals')
    .eq('id', restaurant_id)
    .single();
    
  if (fetchError) throw fetchError;
  
  // Create a new deal with a generated id
  const newDeal = {
    id: crypto.randomUUID(),
    ...dealInfo,
    restaurant_id,
    created_at: new Date().toISOString(),
  };
  
  // Update the restaurant's deals array
  let updatedDeals = [];
  if (restaurant.deals) {
    updatedDeals = [...restaurant.deals, newDeal];
  } else {
    updatedDeals = [newDeal];
  }
  
  const { error: updateError } = await supabase
    .from('restaurants')
    .update({ deals: updatedDeals })
    .eq('id', restaurant_id);
    
  if (updateError) throw updateError;
  
  return newDeal;
};

export const getDealsByRestaurant = async (restaurantId: string): Promise<Deal[]> => {
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('deals')
    .eq('id', restaurantId)
    .single();
    
  if (error) throw error;
  
  return restaurant.deals || [];
};

export const getAllDeals = async () => {
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('id, name, deals');
    
  if (error) throw error;
  
  // Collect and flatten all deals from all restaurants
  const allDeals: Deal[] = [];
  
  restaurants.forEach(restaurant => {
    if (restaurant.deals && Array.isArray(restaurant.deals)) {
      const restaurantDeals = restaurant.deals.map(deal => ({
        ...deal,
        restaurant_name: restaurant.name
      }));
      allDeals.push(...restaurantDeals);
    }
  });
  
  return allDeals;
};

// Reservation functions
export const createReservation = async (reservationData: Omit<Reservation, 'id' | 'status' | 'created_at'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create reservation: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  // Generate a unique booking token
  const token = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
  
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      ...reservationData,
      status: 'pending',
      token
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
    .select('*')
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
    .select('*');
    
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

// File upload functions for restaurant images
export const uploadRestaurantImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('restaurant-images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('restaurant-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
