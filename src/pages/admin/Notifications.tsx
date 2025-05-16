
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const Notifications: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">System Notifications</h1>
            <p className="text-white text-opacity-90">
              Send announcements and manage notifications
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Notification System Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're developing a powerful notification management system.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Send system-wide announcements</li>
              <li>• Create targeted notifications for specific user groups</li>
              <li>• Schedule promotional campaigns and reminders</li>
              <li>• Monitor notification delivery and engagement</li>
              <li>• Manage notification templates and content</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notifications;
