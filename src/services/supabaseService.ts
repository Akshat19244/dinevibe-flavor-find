import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

// User profile types
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  is_admin: boolean;
  signup_date: string;
  avatar_url?: string | null;
};

// Restaurant types
export type Restaurant = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  location: string;
  cuisine: string;
  price_range: string;
  images?: string[] | null;
  is_approved: boolean;
  created_at: string;
};

// Reservation types
export type Reservation = {
  id: string;
  user_id: string;
  restaurant_id?: string | null;
  guest_count: number;
  budget: string;
  location: string;
  event_type: string;
  optional_dish?: string | null;
  optional_decoration?: string | null;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
};

// User Profile Services
export const getUserProfile = async (userId?: string): Promise<UserProfile | null> => {
  let id = userId;
  
  if (!id) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    id = user.id;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) return null;
  return data as UserProfile;
};

export const updateUserProfile = async (profile: Partial<UserProfile>, userId?: string): Promise<UserProfile | null> => {
  let id = userId;
  
  if (!id) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    id = user.id;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as UserProfile;
};

// Restaurant Services
export const getRestaurants = async (includeUnapproved = false): Promise<Restaurant[]> => {
  let query = supabase.from('restaurants').select('*');
  
  if (!includeUnapproved) {
    query = query.eq('is_approved', true);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Restaurant[];
};

export const getRestaurantsByOwner = async (ownerId: string): Promise<Restaurant[]> => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', ownerId);
    
  if (error) throw error;
  return data as Restaurant[];
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data as Restaurant;
};

export const createRestaurant = async (restaurant: Omit<Restaurant, 'id' | 'created_at' | 'is_approved'>): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from('restaurants')
    .insert({
      ...restaurant,
      is_approved: false
    })
    .select()
    .single();
    
  if (error) throw error;
  return data as Restaurant;
};

export const updateRestaurant = async (id: string, restaurant: Partial<Restaurant>): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from('restaurants')
    .update(restaurant)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Restaurant;
};

// Reservation Services
export const getReservations = async (userId?: string): Promise<Reservation[]> => {
  let query = supabase.from('reservations').select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Reservation[];
};

export const getReservationById = async (id: string): Promise<Reservation | null> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data as Reservation;
};

export const createReservation = async (reservation: Omit<Reservation, 'id' | 'status' | 'created_at'>): Promise<Reservation> => {
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      ...reservation,
      status: 'pending'
    })
    .select()
    .single();
    
  if (error) throw error;
  return data as Reservation;
};

export const updateReservation = async (id: string, reservation: Partial<Reservation>): Promise<Reservation> => {
  const { data, error } = await supabase
    .from('reservations')
    .update(reservation)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Reservation;
};

export const updateReservationStatus = async (id: string, status: Reservation['status']): Promise<Reservation> => {
  return updateReservation(id, { status });
};

// Admin Services
export const getAllUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
    
  if (error) throw error;
  return data as UserProfile[];
};

export const approveRestaurant = async (id: string): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from('restaurants')
    .update({ is_approved: true })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Restaurant;
};

export const rejectRestaurant = async (id: string): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from('restaurants')
    .update({ is_approved: false })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Restaurant;
};