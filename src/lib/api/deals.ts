
import { supabase } from './client';
import { Deal } from './types';

// Deal functions
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
  if (restaurant.deals && Array.isArray(restaurant.deals)) {
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
  
  // Make sure to handle the case where deals is null or not an array
  if (!restaurant.deals || !Array.isArray(restaurant.deals)) {
    return [];
  }
  
  return restaurant.deals as Deal[];
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
      const restaurantDeals = (restaurant.deals as any[]).map(deal => ({
        ...deal,
        restaurant_name: restaurant.name
      }));
      allDeals.push(...restaurantDeals);
    }
  });
  
  return allDeals;
};

// New function to claim a deal
export const claimDeal = async (dealId: string, restaurantId: string) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('You must be logged in to claim a deal');
  }
  
  const { data, error } = await supabase
    .from('deal_claims')
    .insert({
      user_id: user.user.id,
      deal_id: dealId,
      restaurant_id: restaurantId,
      status: 'active'
    })
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

// Get all claimed deals for the current user
export const getUserClaimedDeals = async () => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('You must be logged in to view your claimed deals');
  }
  
  const { data, error } = await supabase
    .from('deal_claims')
    .select(`
      *,
      restaurants:restaurant_id (
        name, 
        location,
        cuisine
      )
    `)
    .eq('user_id', user.user.id);
    
  if (error) throw error;
  
  return data;
};

// Get all claimed deals for a specific restaurant (for restaurant owners)
export const getRestaurantClaimedDeals = async (restaurantId: string) => {
  const { data, error } = await supabase
    .from('deal_claims')
    .select(`
      *,
      profiles:user_id (
        name,
        email,
        contact_number
      )
    `)
    .eq('restaurant_id', restaurantId);
    
  if (error) throw error;
  
  return data;
};

// Get all claimed deals (for admins)
export const getAllClaimedDeals = async () => {
  const { data, error } = await supabase
    .from('deal_claims')
    .select(`
      *,
      profiles:user_id (
        name,
        email
      ),
      restaurants:restaurant_id (
        name,
        location
      )
    `);
    
  if (error) throw error;
  
  return data;
};
