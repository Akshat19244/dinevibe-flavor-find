
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const AdminSettings: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Settings</h1>
            <p className="text-white text-opacity-90">
              Configure platform-wide settings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Admin Settings Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a comprehensive settings panel for platform administrators.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Configure platform-wide preferences and defaults</li>
              <li>• Manage API integrations and keys</li>
              <li>• Set up payment processing and commission rates</li>
              <li>• Define user roles and permissions</li>
              <li>• Customize email templates and notification settings</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminSettings;
