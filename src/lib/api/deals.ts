
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
