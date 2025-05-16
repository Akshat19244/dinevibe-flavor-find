
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-white text-opacity-90">
              View platform-wide performance metrics
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Reports Dashboard Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a comprehensive reporting system for platform administrators.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• View platform-wide booking statistics</li>
              <li>• Track user growth and engagement metrics</li>
              <li>• Monitor restaurant performance and ratings</li>
              <li>• Analyze revenue and transaction trends</li>
              <li>• Generate custom reports for specific time periods</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;
