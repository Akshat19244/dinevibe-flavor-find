
import { supabase, isSupabaseConfigured } from './client';

// Authentication functions
export const signInWithGoogle = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot sign in: Supabase credentials not configured');
    return { error: new Error('Supabase credentials not configured') };
  }
  
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

export const signOut = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot sign out: Supabase credentials not configured');
    return { error: new Error('Supabase credentials not configured') };
  }
  
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get current user: Supabase credentials not configured');
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
