
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const OwnerDeals: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Deals</h1>
            <p className="text-white text-opacity-90">
              Create and track special offers for your restaurant
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Deals Management Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're developing a comprehensive deals management system.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Create happy hour specials, discounts, and promotions</li>
              <li>• Set validity periods and usage limits</li>
              <li>• Track voucher redemptions and performance</li>
              <li>• Target specific customer segments</li>
              <li>• Generate QR codes for easy redemption</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDeals;
