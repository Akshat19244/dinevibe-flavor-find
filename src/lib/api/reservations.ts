
import { supabase, isSupabaseConfigured } from './client';
import { Reservation } from './types';

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
    .select('*, restaurants!inner(*)')
    .eq('user_id', userId)
    .order('booking_date', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getUpcomingUserReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, restaurants(*)')
    .eq('user_id', userId)
    .gte('booking_date', new Date().toISOString())
    .order('booking_date', { ascending: true });
    
  if (error) throw error;
  return data;
};

export const getPastUserReservations = async (userId: string) => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*, restaurants(*)')
    .eq('user_id', userId)
    .lt('booking_date', new Date().toISOString())
    .order('booking_date', { ascending: false });
    
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
    .select(`
      *,
      profiles:user_id (
        name,
        email,
        contact_number
      )
    `)
    .eq('restaurant_id', restaurantId)
    .order('booking_date', { ascending: true });
    
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
    .select(`
      *,
      profiles:user_id (
        name, 
        email,
        contact_number
      ),
      restaurants:restaurant_id (
        name,
        location,
        cuisine
      )
    `)
    .order('booking_date', { ascending: true });
    
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

// Get reservations with filter by date range
export const getReservationsByDateRange = async (
  restaurantId: string, 
  startDate: string, 
  endDate: string
) => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      profiles:user_id (
        name,
        email,
        contact_number
      )
    `)
    .eq('restaurant_id', restaurantId)
    .gte('booking_date', startDate)
    .lte('booking_date', endDate)
    .order('booking_date', { ascending: true });
    
  if (error) throw error;
  return data;
};
