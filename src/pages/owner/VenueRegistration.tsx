
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VenueRegistrationForm from '@/components/owner/VenueRegistrationForm';

const VenueRegistration: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
              Partner With DineVibe
            </h1>
            <p className="text-[#FFF5E1]/90 text-lg">
              Join our exclusive network of premium venues and start receiving bookings today
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <VenueRegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenueRegistration;
