import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarClock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star,
  Camera,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingManagement from '@/components/owner/BookingManagement';
import AnalyticsDashboard from '@/components/owner/AnalyticsDashboard';
import VenueRegistrationForm from '@/components/owner/VenueRegistrationForm';

const OwnerDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [hasVenue, setHasVenue] = useState(true); // In real app, check from database

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

  const recentBookings = [
    {
      id: 'BK001',
      customerName: 'Sarah Johnson',
      eventType: 'Wedding Reception',
      date: '2024-06-18',
      time: '18:00',
      guests: 250,
      status: 'confirmed',
      amount: 125000
    },
    {
      id: 'BK002',
      customerName: 'Michael Chen',
      eventType: 'Corporate Event',
      date: '2024-06-20',
      time: '19:00',
      guests: 80,
      status: 'pending',
      amount: 45000
    },
    {
      id: 'BK003',
      customerName: 'Priya Sharma',
      eventType: 'Birthday Party',
      date: '2024-06-22',
      time: '16:00',
      guests: 50,
      status: 'confirmed',
      amount: 28000
    }
  ];

  const recentReviews = [
    {
      customerName: 'Anjali Gupta',
      rating: 5,
      comment: 'Absolutely wonderful venue! The decoration was perfect and staff was very helpful.',
      date: '2024-06-15'
    },
    {
      customerName: 'Rajesh Kumar',
      rating: 4,
      comment: 'Great food and ambiance. Would recommend for corporate events.',
      date: '2024-06-14'
    },
    {
      customerName: 'Lisa Wong',
      rating: 5,
      comment: 'Perfect wedding venue. Everything was exactly as we wanted.',
      date: '2024-06-13'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Total Bookings</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.totalBookings}</h3>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-[#8B0000]/10 rounded-full">
                    <CalendarClock className="h-6 w-6 text-[#8B0000]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Monthly Revenue</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">{formatCurrency(stats.monthlyRevenue)}</h3>
                    <p className="text-xs text-green-600">+18% from last month</p>
                  </div>
                  <div className="p-3 bg-[#D4AF37]/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Average Rating</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.avgRating}</h3>
                    <p className="text-xs text-[#2F2F2F]">{stats.totalReviews} reviews</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Growth Rate</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">+24%</h3>
                    <p className="text-xs text-green-600">This quarter</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
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
                {/* Quick Actions */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/owner/upload-event">
                        <Button variant="outline" className="w-full border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-[#FFF5E1]">
                          <Camera className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]"
                        onClick={() => document.querySelector('[data-state="active"][value="analytics"]')?.click()}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]"
                        onClick={() => document.querySelector('[data-state="active"][value="bookings"]')?.click()}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Manage Bookings
                      </Button>
                      <Link to="/owner/settings">
                        <Button variant="outline" className="w-full border-[#2F2F2F] text-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-[#FFF5E1]">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Status Summary */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Booking Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confirmed</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">{stats.confirmedBookings}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-100 text-yellow-800">{stats.pendingBookings}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cancelled</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-red-100 text-red-800">{stats.cancelledBookings}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Upcoming Events</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-[#D4AF37] text-[#0C0C0C]">{stats.upcomingEvents}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Notifications */}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C] flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-[#0C0C0C]">New booking request from Priya Sharma</p>
                        <p className="text-xs text-[#2F2F2F]">Wedding reception for 150 guests on July 15th</p>
                        <p className="text-xs text-[#2F2F2F]">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-[#0C0C0C]">Payment received for booking #BK002</p>
                        <p className="text-xs text-[#2F2F2F]">₹35,000 from Rajesh Kumar</p>
                        <p className="text-xs text-[#2F2F2F]">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-[#0C0C0C]">New review posted by Anjali Gupta</p>
                        <p className="text-xs text-[#2F2F2F]">5-star rating with positive feedback</p>
                        <p className="text-xs text-[#2F2F2F]">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            {/* Venue Tab */}
            <TabsContent value="venue">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Venue Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Venue Name</label>
                        <p className="font-semibold">Royal Garden Palace</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Capacity</label>
                        <p className="font-semibold">500 guests</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Location</label>
                        <p className="font-semibold">Bandra West, Mumbai</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Venue Type</label>
                        <p className="font-semibold">Banquet Hall with Garden</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Venue Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                        <Camera className="h-4 w-4 mr-2" />
                        Update Photos
                      </Button>
                      <Button variant="outline" className="w-full border-[#D4AF37] text-[#D4AF37]">
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                      <Button variant="outline" className="w-full border-[#2F2F2F] text-[#2F2F2F]">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Manage Amenities
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Photos</label>
                        <p className="font-semibold">Upload photos to showcase your venue</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Videos</label>
                        <p className="font-semibold">Upload videos to showcase your venue</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Upload Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Photos</label>
                        <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Videos</label>
                        <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">General</label>
                        <p className="font-semibold">Manage your venue settings</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Notifications</label>
                        <p className="font-semibold">Manage your notifications</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Security</label>
                        <p className="font-semibold">Manage your security settings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Profile Picture</label>
                        <p className="font-semibold">Upload your profile picture</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F2F] mb-1">Personal Information</label>
                        <p className="font-semibold">Update your personal information</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
