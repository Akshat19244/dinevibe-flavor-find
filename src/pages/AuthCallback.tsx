
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Error in auth callback:', error);
          toast({
            title: "Authentication Failed",
            description: "There was an issue signing you in. Please try again.",
            variant: "destructive",
          });
          navigate('/auth/login');
          return;
        }

        // Check user profile to determine navigation
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            // Check if user profile exists
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();

            if (profileError || !profile) {
              // User exists in auth but not in profile table, create a new profile
              navigate('/auth/complete-profile');
              return;
            }

            // User exists in profile, redirect based on role
            if (profile.role === 'owner') {
              navigate('/owner/dashboard');
            } else if (profile.role === 'admin') {
              navigate('/control');
            } else {
              navigate('/user/discovery');
            }

            toast({
              title: "Welcome back!",
              description: `You're now signed in as ${profile.name}`,
            });
          }
        } catch (err) {
          console.error('Error checking user profile:', err);
          navigate('/user/discovery');
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        navigate('/auth/login');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dineVibe-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-dineVibe-primary mx-auto"></div>
        <h2 className="text-2xl font-bold mt-6 text-white">Completing your sign in...</h2>
        <p className="text-gray-400 mt-2">You'll be redirected automatically</p>
      </div>
    </div>
  );
};

export default AuthCallback;
