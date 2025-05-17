
import { supabase, isSupabaseConfigured } from './client';
import { Restaurant } from './types';

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
