
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const OwnerAnalytics: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Restaurant Analytics</h1>
            <p className="text-white text-opacity-90">
              Track performance metrics for your restaurant
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Analytics Dashboard Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're developing a comprehensive analytics platform.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• View booking trends over time</li>
              <li>• Track customer engagement and repeat visits</li>
              <li>• Monitor deal performance and redemption rates</li>
              <li>• Analyze feedback and ratings</li>
              <li>• Get insights on peak hours and capacity utilization</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerAnalytics;
