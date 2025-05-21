
import { supabase, isSupabaseConfigured } from './client';
import { getCurrentUser } from './auth';
import { User } from './types';

// User management functions
export const createUserProfile = async (userData: Omit<User, 'id' | 'signup_date'>) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot create user profile: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: currentUser.id,
      ...userData,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userData: Partial<Omit<User, 'id' | 'signup_date'>>) => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', currentUser.id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const getUserProfile = async (userId?: string) => {
  if (!isSupabaseConfigured) {
    console.error('Cannot get user profile: Supabase credentials not configured');
    throw new Error('Supabase credentials not configured');
  }
  
  let id = userId;
  
  if (!id) {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No authenticated user found');
    id = currentUser.id;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data as User;
};

// Get all users (for admin) - renamed from getUserProfiles to getAllUsers
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('signup_date', { ascending: false });
    
  if (error) throw error;
  return data as User[];
};

// Get users by role (for admin)
export const getUsersByRole = async (role: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', role)
    .order('signup_date', { ascending: false });
    
  if (error) throw error;
  return data as User[];
};

// Update user role (for admin)
export const updateUserRole = async (userId: string, role: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data as User;
};

// Set user as admin (for admin)
export const setUserAsAdmin = async (userId: string, isAdmin: boolean) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data as User;
};

// Toggle admin status (renamed from setUserAsAdmin for clarity)
export const toggleUserAdmin = async (userId: string, isAdmin: boolean) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data as User;
};

// Update contact number
export const updateContactNumber = async (contactNumber: string) => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    throw new Error('No authenticated user found');
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update({ contact_number: contactNumber })
    .eq('id', currentUser.id)
    .select()
    .single();
    
  if (error) throw error;
  return data as User;
};
