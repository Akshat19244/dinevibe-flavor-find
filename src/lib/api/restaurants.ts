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

// Get restaurants by search criteria for recommendation
export const getRecommendedRestaurants = async (
  location: string,
  budget: string,
  guestCount: number,
  needsDecoration?: boolean
) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get recommended restaurants: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  // Parse budget range from string like "$100-$300"
  let minBudget = 0;
  let maxBudget = 10000; // Default high value
  
  if (budget) {
    const budgetParts = budget.match(/\$(\d+).*\$(\d+)/);
    if (budgetParts && budgetParts.length === 3) {
      minBudget = parseInt(budgetParts[1]);
      maxBudget = parseInt(budgetParts[2]);
    }
  }
  
  let query = supabase
    .from('restaurants')
    .select('*')
    .eq('is_approved', true)
    .gte('seating_capacity', guestCount);
    
  // Add location filter if provided
  if (location && location.trim() !== '') {
    query = query.ilike('location', `%${location}%`);
  }
    
  // Add decoration filter if needed
  if (needsDecoration) {
    query = query.eq('offers_decoration', true);
  }
    
  const { data, error } = await query;
    
  if (error) throw error;
  
  // Filter by budget in memory since Supabase doesn't support JSONB filtering in this way
  // This assumes budget_range is stored as { min: number, max: number }
  let filteredData = data;
  if (budget) {
    filteredData = data.filter(restaurant => {
      if (!restaurant.budget_range) return true;
      
      const min = restaurant.budget_range.min || 0;
      const max = restaurant.budget_range.max || Infinity;
      
      return (min <= maxBudget && max >= minBudget);
    });
  }
    
  return filteredData as Restaurant[];
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
