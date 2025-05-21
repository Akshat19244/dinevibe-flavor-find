
import { supabase, isSupabaseConfigured } from './client';
import { AdminSettings } from './types';

// Get the current admin registration code
export const getAdminRegistrationCode = async (): Promise<string | undefined> => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get admin registration code: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('registration_code')
      .single();
      
    if (error) throw error;
    return data?.registration_code;
  } catch (error) {
    console.error('Error retrieving admin registration code:', error);
    return undefined;
  }
};

// Update the admin registration code
export const updateAdminRegistrationCode = async (newCode: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot update admin registration code: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  try {
    // First check if a record exists
    const { data: existingData } = await supabase
      .from('admin_settings')
      .select('id')
      .limit(1);
      
    if (existingData && existingData.length > 0) {
      // Update existing record
      const { data, error } = await supabase
        .from('admin_settings')
        .update({ registration_code: newCode })
        .eq('id', existingData[0].id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('admin_settings')
        .insert({ registration_code: newCode })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error updating admin registration code:', error);
    throw error;
  }
};

// Get the admin count to limit registrations
export const getAdminCount = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get admin count: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .eq('is_admin', true);
      
    if (error) throw error;
    return data ? data.length : 0;
  } catch (error) {
    console.error('Error getting admin count:', error);
    return 0;
  }
};

// Check if initial admin setup is complete
export const isInitialAdminSetupComplete = async () => {
  try {
    const adminCount = await getAdminCount();
    return adminCount >= 1; // Return true if we already have 1 or more admins
  } catch (error) {
    console.error('Error checking admin setup status:', error);
    return false;
  }
};
