import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingManagement from '@/components/owner/BookingManagement';
import AnalyticsDashboard from '@/components/owner/AnalyticsDashboard';
import VenueRegistrationForm from '@/components/owner/VenueRegistrationForm';
import DashboardStats from '@/components/owner/DashboardStats';
import QuickActions from '@/components/owner/QuickActions';
import BookingStatusSummary from '@/components/owner/BookingStatusSummary';
import NotificationPanel from '@/components/owner/NotificationPanel';
import VenueManagementTab from '@/components/owner/VenueManagementTab';
import MediaManagementTab from '@/components/owner/MediaManagementTab';
import SettingsManagementTab from '@/components/owner/SettingsManagementTab';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const OwnerDashboard: React.FC = () => {
  const [hasVenue, setHasVenue] = useState(true); // In real app, check from database
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  // Sample data - would come from Firebase/Supabase in real implementation
  const stats = {
    totalBookings: 24,
    monthlyRevenue: 485000,
    avgRating: 4.6,
    totalReviews: 142,
    pendingBookings: 3,
    confirmedBookings: 21,
    cancelledBookings: 2,
    upcomingEvents: 8
  };

  useEffect(() => {
    if (!user) return;
    async function fetchUnread() {
      // Use our function to get unread count
      const { data } = await supabase.rpc("get_unread_message_count", { user_uuid: user.id });
      if (typeof data === "number") setUnreadChatCount(data);
    }
    fetchUnread();
  }, [user]);

  if (!hasVenue) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
        <Navbar />
        
        <main className="flex-grow">
          <div className="bg-[#0C0C0C] py-12">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-4">
                Welcome to DineVibe Partner Portal
              </h1>
              <p className="text-[#FFF5E1]/90 text-lg">
                Register your venue to start receiving bookings and managing your business
              </p>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <VenueRegistrationForm />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5E1]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-[#0C0C0C] py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#FFF5E1] mb-2">
                  Owner Dashboard
                </h1>
                <p className="text-[#FFF5E1]/90">
                  Manage your venue, bookings, and customer experience
                </p>
              </div>
              <div className="flex space-x-4">
                <Link to="/owner/upload-event">
                  <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </Link>
                <Link to="/owner/settings">
                  <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <DashboardStats stats={stats} />
          
          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickActions 
                  onAnalyticsClick={() => setActiveTab('analytics')}
                  onBookingsClick={() => setActiveTab('bookings')}
                />
                <BookingStatusSummary stats={stats} />
              </div>
              <NotificationPanel />
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              {unreadChatCount > 0 && (
                <div className="mb-4 text-blue-700 font-semibold">
                  You have {unreadChatCount} unread chat message{unreadChatCount > 1 ? "s" : ""} from customers.
                </div>
              )}
              <BookingManagement />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            {/* Venue Tab */}
            <TabsContent value="venue">
              <VenueManagementTab />
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <MediaManagementTab />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <SettingsManagementTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
