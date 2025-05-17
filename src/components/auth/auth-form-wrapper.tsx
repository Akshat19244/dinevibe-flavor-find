
import React, { useState } from 'react';
import AuthForm from '@/components/auth/auth-form';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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
      
      navigate(redirectPath);
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

  const handleEmailSignup = async (data: { email: string, password: string }) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Signup Successful',
        description: 'Please check your email to verify your account.',
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

  // We're passing the handlers to the existing AuthForm component
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
