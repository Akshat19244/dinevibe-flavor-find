
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const OwnerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Restaurant Owner Dashboard</h1>
            <p className="text-white text-opacity-90">
              Manage your restaurant, events, deals, and customer bookings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Restaurant Owner Dashboard Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're working on building a comprehensive dashboard for restaurant owners.
              Check back soon for features like:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Upload and manage events</li>
              <li>• Create special deals and promotions</li>
              <li>• Track customer bookings and reservations</li>
              <li>• View analytics and performance metrics</li>
              <li>• Manage restaurant profile and menu</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
