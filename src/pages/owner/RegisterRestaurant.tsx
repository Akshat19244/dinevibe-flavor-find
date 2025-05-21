
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import RestaurantRegistrationForm from '@/components/owner/RestaurantRegistrationForm';

const RegisterRestaurant: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={user?.user_metadata?.name || 'Restaurant Owner'} />
      
      <main className="flex-grow py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <RestaurantRegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterRestaurant;
