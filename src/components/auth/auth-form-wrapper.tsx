
import React, { useState } from 'react';
import AuthForm from '@/components/auth/auth-form';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AuthFormWrapper: React.FC<{ defaultTab?: 'login' | 'signup' }> = ({ defaultTab = 'login' }) => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the redirect path from query params or state
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from') || '/';
  const locationState = location.state as { from?: { pathname: string } } | undefined;
  const redirectPath = locationState?.from?.pathname || from;

  const handleEmailLogin = async (data: { email: string, password: string }) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      // Get the user's profile to redirect based on role
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_admin')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            if (profile.is_admin || profile.role === 'admin') {
              navigate('/admin/dashboard');
            } else if (profile.role === 'owner') {
              navigate('/owner/dashboard');
            } else {
              navigate('/user/discovery');
            }
            return;
          }
        }
        
        // Default navigation if we can't determine role
        navigate(redirectPath);
      } catch (profileErr) {
        console.error('Error fetching user profile:', profileErr);
        navigate(redirectPath);
      }
    } catch (err) {
      console.error('Login error:', err);
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (data: { 
    email: string, 
    password: string, 
    name?: string, 
    userType?: string,
    adminCode?: string 
  }) => {
    setIsLoading(true);
    try {
      // If user type is admin, verify the admin code
      if (data.userType === 'admin') {
        // Check if we've reached the admin user limit
        const { data: adminSettings, error: settingsError } = await supabase
          .from('admin_settings')
          .select('registration_code, admin_count')
          .single();

        if (settingsError) {
          console.error('Failed to fetch admin settings:', settingsError);
          toast({
            title: 'Admin Registration Error',
            description: 'Could not verify admin settings. Please try again.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        // Check if admin count is at limit
        if (adminSettings.admin_count >= 2) {
          toast({
            title: 'Admin Registration Limit Reached',
            description: 'The maximum number of admins has been reached.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        // Verify the admin code
        if (data.adminCode !== adminSettings.registration_code) {
          toast({
            title: 'Invalid Admin Code',
            description: 'The admin registration code you entered is incorrect.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
      }

      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Store additional user metadata
      try {
        // Update user metadata
        await supabase.auth.updateUser({
          data: {
            name: data.name,
            userType: data.userType
          }
        });

        // Update profile in profiles table
        if (data.userType) {
          const userResponse = await supabase.auth.getUser();
          if (userResponse.data.user) {
            const role = data.userType;
            const isAdmin = role === 'admin';
            
            await supabase.from('profiles').update({
              name: data.name,
              role: role,
              is_admin: isAdmin
            }).eq('id', userResponse.data.user.id);
            
            // If admin was registered successfully, increment admin count
            if (isAdmin) {
              await supabase
                .from('admin_settings')
                .update({ admin_count: supabase.rpc('increment_admin_count') })
                .eq('id', 1);
            }
          }
        }
      } catch (metadataError) {
        console.error('Error updating user metadata:', metadataError);
      }
      
      toast({
        title: 'Signup Successful',
        description: data.userType === 'owner' 
          ? 'Please check your email to verify your account. As a restaurant owner, you\'ll be able to add your restaurant after verification.'
          : 'Please check your email to verify your account.',
      });
      
    } catch (err) {
      console.error('Signup error:', err);
      toast({
        title: 'Signup Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: 'Google Login Failed',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Google login error:', err);
      toast({
        title: 'Google Login Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm 
      defaultTab={defaultTab} 
      onEmailLogin={handleEmailLogin}
      onEmailSignup={handleEmailSignup}
      onGoogleLogin={handleGoogleLogin}
      isLoading={isLoading}
    />
  );
};

export default AuthFormWrapper;
