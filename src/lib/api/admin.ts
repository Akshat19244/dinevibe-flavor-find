
import { supabase } from './client';

// Admin functions
export const logAdminAction = async (
  action: string,
  entityType: string,
  entityId?: string,
  details?: any
) => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error('You must be logged in to perform this action');
  }
  
  const { data, error } = await supabase
    .from('admin_logs')
    .insert({
      admin_id: user.user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details
    })
    .select()
    .single();
    
  if (error) throw error;
  
  return data;
};

// Get admin logs
export const getAdminLogs = async () => {
  const { data, error } = await supabase
    .from('admin_logs')
    .select(`
      *,
      admin:admin_id (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data;
};

// Get admin logs by action type
export const getAdminLogsByAction = async (action: string) => {
  const { data, error } = await supabase
    .from('admin_logs')
    .select(`
      *,
      admin:admin_id (
        name,
        email
      )
    `)
    .eq('action', action)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data;
};

// Get admin logs by entity type
export const getAdminLogsByEntity = async (entityType: string) => {
  const { data, error } = await supabase
    .from('admin_logs')
    .select(`
      *,
      admin:admin_id (
        name,
        email
      )
    `)
    .eq('entity_type', entityType)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data;
};

// Get admin logs by admin id
export const getAdminLogsByAdminId = async (adminId: string) => {
  const { data, error } = await supabase
    .from('admin_logs')
    .select(`
      *,
      admin:admin_id (
        name,
        email
      )
    `)
    .eq('admin_id', adminId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data;
};

// Get system stats for admin dashboard
export const getSystemStats = async () => {
  // Get total users count
  const { count: usersCount, error: usersError } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true });
    
  if (usersError) throw usersError;
  
  // Get total restaurants count
  const { count: restaurantsCount, error: restaurantsError } = await supabase
    .from('restaurants')
    .select('id', { count: 'exact', head: true });
    
  if (restaurantsError) throw restaurantsError;
  
  // Get pending restaurants count
  const { count: pendingRestaurantsCount, error: pendingError } = await supabase
    .from('restaurants')
    .select('id', { count: 'exact', head: true })
    .eq('is_approved', false);
    
  if (pendingError) throw pendingError;
  
  // Get total reservations count
  const { count: reservationsCount, error: reservationsError } = await supabase
    .from('reservations')
    .select('id', { count: 'exact', head: true });
    
  if (reservationsError) throw reservationsError;
  
  // Get total claimed deals
  const { count: claimedDealsCount, error: dealsError } = await supabase
    .from('deal_claims')
    .select('id', { count: 'exact', head: true });
    
  if (dealsError) throw dealsError;
  
  return {
    usersCount: usersCount || 0,
    restaurantsCount: restaurantsCount || 0,
    pendingRestaurantsCount: pendingRestaurantsCount || 0,
    reservationsCount: reservationsCount || 0,
    claimedDealsCount: claimedDealsCount || 0
  };
};

// Export data as CSV (returns array that can be converted to CSV)
export const exportUsersData = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, role, contact_number, signup_date');
    
  if (error) throw error;
  
  return data;
};

export const exportRestaurantsData = async () => {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      id, 
      name, 
      location, 
      cuisine, 
      price_range, 
      is_approved, 
      created_at,
      profiles:owner_id (name, email)
    `);
    
  if (error) throw error;
  
  return data;
};

export const exportReservationsData = async () => {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      booking_date,
      guest_count,
      budget,
      location,
      event_type,
      status,
      created_at,
      profiles:user_id (name, email),
      restaurants:restaurant_id (name, location)
    `);
    
  if (error) throw error;
  
  return data;
};

// Check if a user is an admin
export const isUserAdmin = async (userId?: string) => {
  let id = userId;
  
  if (!id) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return false;
    id = user.user.id;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', id)
    .single();
    
  if (error || !data) return false;
  
  return !!data.is_admin;
};

// Update restaurant's is_approved status and log the action
export const approveRestaurant = async (restaurantId: string, approve: boolean) => {
  const { data, error } = await supabase
    .from('restaurants')
    .update({ is_approved: approve })
    .eq('id', restaurantId)
    .select()
    .single();
    
  if (error) throw error;
  
  // Log the admin action
  await logAdminAction(
    approve ? 'approve_restaurant' : 'reject_restaurant',
    'restaurants',
    restaurantId,
    { restaurant_name: data.name }
  );
  
  return data;
};
