
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const OwnerSettings: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Restaurant Settings</h1>
            <p className="text-white text-opacity-90">
              Manage your restaurant profile and account settings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Settings Management Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a comprehensive settings panel for restaurant owners.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Update restaurant profile and photos</li>
              <li>• Manage menu items and categories</li>
              <li>• Set business hours and special closures</li>
              <li>• Configure booking policies and availability</li>
              <li>• Integrate payment processing and notifications</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerSettings;
