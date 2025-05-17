
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the client for use in other modules
export const supabase = supabaseClient;

// Check if environment variables are properly configured
export const isSupabaseConfigured = !!supabase;
