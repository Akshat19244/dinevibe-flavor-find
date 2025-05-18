
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
    .select('*')
    .eq('is_approved', true);
    
  if (error) throw error;
  return data as Restaurant[];
};

// Get a single restaurant by ID
export const getRestaurantById = async (id: string) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as Restaurant;
};

// Get restaurants by location
export const getRestaurantsByLocation = async (location: string) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .ilike('location', `%${location}%`)
    .eq('is_approved', true);
    
  if (error) throw error;
  return data as Restaurant[];
};

// Get restaurants by cuisine
export const getRestaurantsByCuisine = async (cuisine: string) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .ilike('cuisine', `%${cuisine}%`)
    .eq('is_approved', true);
    
  if (error) throw error;
  return data as Restaurant[];
};

// Get restaurants by search query (name, location, cuisine)
export const searchRestaurants = async (query: string) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .or(`name.ilike.%${query}%, location.ilike.%${query}%, cuisine.ilike.%${query}%`)
    .eq('is_approved', true);
    
  if (error) throw error;
  return data as Restaurant[];
};

// Get restaurants that need approval (for admin)
export const getPendingRestaurants = async () => {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      profiles:owner_id (
        name,
        email,
        contact_number
      )
    `)
    .eq('is_approved', false);
    
  if (error) throw error;
  return data;
};

// Approve or reject a restaurant
export const updateRestaurantApprovalStatus = async (id: string, isApproved: boolean) => {
  const { data, error } = await supabase
    .from('restaurants')
    .update({ is_approved: isApproved })
    .eq('id', id)
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

// Upload multiple menu images
export const uploadMenuImages = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `menu_${Math.random()}.${fileExt}`;
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
  });
  
  return Promise.all(uploadPromises);
};
