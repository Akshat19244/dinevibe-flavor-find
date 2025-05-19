
import { supabase, isSupabaseConfigured } from './client';
import { AdminSettings, Json } from './types';

// Function to get system stats for admin dashboard
export const getSystemStats = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get system stats: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }

  try {
    // Get counts from different tables
    const [
      { count: usersCount },
      { count: restaurantsCount },
      { count: pendingRestaurantsCount },
      { count: reservationsCount },
      { count: claimedDealsCount }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('restaurants').select('*', { count: 'exact', head: true }),
      supabase.from('restaurants').select('*', { count: 'exact', head: true }).eq('is_approved', false),
      supabase.from('reservations').select('*', { count: 'exact', head: true }),
      supabase.from('deal_claims').select('*', { count: 'exact', head: true })
    ]);

    return {
      usersCount: usersCount || 0,
      restaurantsCount: restaurantsCount || 0,
      pendingRestaurantsCount: pendingRestaurantsCount || 0,
      reservationsCount: reservationsCount || 0,
      claimedDealsCount: claimedDealsCount || 0
    };
  } catch (error) {
    console.error('Error fetching system stats:', error);
    throw new Error('Failed to fetch system statistics');
  }
};

// Get admin settings
export const getAdminSettings = async (): Promise<AdminSettings> => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get admin settings: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  // Attempt to get admin settings
  const { data, error } = await supabase
    .from('admin_settings')
    .select('*')
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No settings found, create default settings
      const defaultSettings = {
        registration_code: generateRegistrationCode(),
        admin_count: 0
      };
      
      const { data: newData, error: createError } = await supabase
        .from('admin_settings')
        .insert(defaultSettings)
        .select()
        .single();
      
      if (createError) throw createError;
      return newData as AdminSettings;
    }
    throw error;
  }
  
  return data as AdminSettings;
};

// Update admin registration code
export const updateAdminRegistrationCode = async (): Promise<AdminSettings> => {
  const newCode = generateRegistrationCode();
  
  const { data, error } = await supabase
    .from('admin_settings')
    .update({ 
      registration_code: newCode,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();
  
  if (error) throw error;
  return data as AdminSettings;
};

// Helper to generate a random registration code
function generateRegistrationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Log admin actions
export const logAdminAction = async (
  adminId: string, 
  action: string, 
  entityType: string, 
  entityId?: string,
  details?: Json
) => {
  const { error } = await supabase
    .from('admin_logs')
    .insert({
      admin_id: adminId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details
    });
  
  if (error) console.error('Error logging admin action:', error);
};

// Check if user is admin
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin, role')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data?.is_admin || data?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Create function to increment admin count
export const incrementAdminCount = async () => {
  const { data, error } = await supabase
    .rpc('increment_admin_count');
    
  if (error) throw error;
  return data;
};

// Get a list of all admin logs
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
