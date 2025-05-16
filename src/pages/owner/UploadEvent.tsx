
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

const UploadEvent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName="Restaurant Owner" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Event</h1>
            <p className="text-white text-opacity-90">
              Create and promote special events at your restaurant
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Event Upload Feature Coming Soon</h2>
            <p className="text-gray-600 mb-4">
              We're building a powerful event management system for restaurant owners.
              Soon you'll be able to:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Create special dinner events, tastings, and classes</li>
              <li>• Upload images and detailed descriptions</li>
              <li>• Set capacity limits and pricing</li>
              <li>• Manage registrations and attendees</li>
              <li>• Send notifications to interested customers</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadEvent;
