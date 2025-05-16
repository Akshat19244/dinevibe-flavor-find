
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white text-opacity-90">
              Manage and monitor the DineVibe platform
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a powerful admin dashboard to manage the entire platform.
              Check back soon for features like:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• User and restaurant owner management</li>
              <li>• Content moderation for events and deals</li>
              <li>• Platform analytics and metrics</li>
              <li>• System notifications and announcements</li>
              <li>• Configuration settings for the entire platform</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
