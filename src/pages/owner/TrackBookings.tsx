
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const TrackBookings: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Track Bookings</h1>
            <p className="text-white text-opacity-90">
              Manage customer reservations and bookings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Booking Management Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a powerful booking management system.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• View all upcoming and past reservations</li>
              <li>• Manage table assignments and availability</li>
              <li>• Track customer preferences and special requests</li>
              <li>• Send confirmation and reminder messages</li>
              <li>• Handle booking modifications and cancellations</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackBookings;
