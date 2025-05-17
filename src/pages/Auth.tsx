
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AuthFormWrapper from '@/components/auth/auth-form-wrapper';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  const authTitle = type === 'login' ? 'Welcome Back' : 'Create Your Account';
  const authDescription = type === 'login' 
    ? 'Sign in to your DineVibe account to continue your culinary journey'
    : 'Join DineVibe and discover amazing restaurants and exclusive events';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{authTitle}</h1>
            <p className="text-gray-600">{authDescription}</p>
          </div>
          
          <AuthFormWrapper defaultTab={type === 'login' ? 'login' : 'signup'} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
