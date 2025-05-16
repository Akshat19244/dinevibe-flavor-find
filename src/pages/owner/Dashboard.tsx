
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Users, Ticket, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  // Sample statistics - would be fetched from Firebase in a real implementation
  const stats = {
    totalBookings: 24,
    upcomingEvents: 3,
    activeDeals: 5,
    customerReach: 142
  };

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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-dineVibe-primary/10 rounded-full mr-4">
                    <CalendarClock className="h-6 w-6 text-dineVibe-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-dineVibe-accent/10 rounded-full mr-4">
                    <Users className="h-6 w-6 text-dineVibe-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer Reach</p>
                    <h3 className="text-2xl font-bold">{stats.customerReach}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/10 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                    <h3 className="text-2xl font-bold">{stats.upcomingEvents}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-500/10 rounded-full mr-4">
                    <Ticket className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                    <h3 className="text-2xl font-bold">{stats.activeDeals}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Access Cards */}
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/owner/upload-event">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader className="bg-gradient-to-r from-dineVibe-primary/20 to-dineVibe-primary/5">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarClock className="w-5 h-5 mr-2" />
                    Upload New Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600">Create and publish special events at your restaurant</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/owner/deals">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader className="bg-gradient-to-r from-dineVibe-accent/20 to-dineVibe-accent/5">
                  <CardTitle className="flex items-center text-lg">
                    <Ticket className="w-5 h-5 mr-2" />
                    Manage Deals
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600">Create special offers, discounts, and vouchers</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/owner/customers">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
                <CardHeader className="bg-gradient-to-r from-green-500/20 to-green-500/5">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Track Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600">View and manage customer reservations</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* Recent Bookings Preview */}
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Latest Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* This would be populated from Firebase in a real implementation */}
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Table for 2 • May 18, 7:30 PM</p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Confirmed</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <h3 className="font-medium">Michael Chen</h3>
                    <p className="text-sm text-gray-600">Table for 4 • May 19, 8:00 PM</p>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Confirmed</div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <h3 className="font-medium">Jessica Williams</h3>
                    <p className="text-sm text-gray-600">Table for 6 • May 20, 7:00 PM</p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Pending</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/owner/customers" className="text-dineVibe-primary font-medium hover:underline">
                  View All Bookings
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
