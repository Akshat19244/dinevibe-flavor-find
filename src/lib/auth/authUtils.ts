
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  contact_number?: string;
  avatar_url?: string;
}

export const getUserRole = async (user: User): Promise<string> => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_admin')
      .eq('id', user.id)
      .single();
    
    if (profile?.is_admin) return 'admin';
    return profile?.role || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
};

export const createUserToken = (user: User, role: string): string => {
  // Simple token creation - in production, use JWT
  return btoa(JSON.stringify({ 
    id: user.id, 
    email: user.email, 
    role, 
    timestamp: Date.now() 
  }));
};
