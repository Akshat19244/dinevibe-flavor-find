
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import RestaurantProfile from '@/components/restaurant/RestaurantProfile';
import MenuManagement from '@/components/restaurant/MenuManagement';
import TableManagement from '@/components/restaurant/TableManagement';
import WaitTimePredictor from '@/components/ai/WaitTimePredictor';
import { 
  Store, 
  Menu, 
  Users, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Star
} from 'lucide-react';

const RestaurantDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock restaurant data
  const restaurant = {
    id: '1',
    name: 'Bella Vista Restaurant',
    description: 'Authentic Italian cuisine with a modern twist, featuring fresh ingredients and traditional recipes passed down through generations.',
    cuisine: ['Italian', 'Mediterranean', 'European'],
    address: '123 Food Street, Mumbai, Maharashtra 400001',
    phone: '+91 98765 43210',
    email: 'contact@bellavista.com',
    hours: 'Mon-Sun: 11:00 AM - 11:00 PM',
    priceRange: '₹₹₹',
    rating: 4.7,
    totalReviews: 342,
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    features: ['WiFi', 'Air Conditioning', 'Outdoor Seating', 'Parking', 'Live Music', 'Bar']
  };

  // Mock analytics data
  const analyticsData = {
    todayRevenue: 45000,
    todayOrders: 87,
    avgOrderValue: 517,
    occupancyRate: 78,
    waitTime: 12,
    newReviews: 5,
    avgRating: 4.6,
    monthlyGrowth: 12.5
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={user?.user_metadata?.name || 'Restaurant Owner'} />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Restaurant Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your restaurant operations and track performance
            </p>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-2xl font-bold">{formatCurrency(analyticsData.todayRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">+{analyticsData.monthlyGrowth}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Orders</p>
                    <p className="text-2xl font-bold">{analyticsData.todayOrders}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Avg: {formatCurrency(analyticsData.avgOrderValue)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold">{analyticsData.occupancyRate}%</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Wait time: {analyticsData.waitTime} min
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold">{analyticsData.avgRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {analyticsData.newReviews} new reviews
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Wait Time Predictor */}
          <div className="mb-8">
            <WaitTimePredictor
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
              capacity={80}
              currentGuests={62}
              averageDiningTime={75}
            />
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Restaurant Profile
              </TabsTrigger>
              <TabsTrigger value="menu" className="flex items-center gap-2">
                <Menu className="h-4 w-4" />
                Menu Management
              </TabsTrigger>
              <TabsTrigger value="tables" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Table Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <RestaurantProfile 
                restaurant={restaurant}
                isOwner={true}
                onUpdate={(updatedRestaurant) => {
                  console.log('Restaurant updated:', updatedRestaurant);
                }}
              />
            </TabsContent>

            <TabsContent value="menu">
              <MenuManagement 
                restaurantId={restaurant.id}
                isOwner={true}
              />
            </TabsContent>

            <TabsContent value="tables">
              <TableManagement 
                restaurantId={restaurant.id}
                isOwner={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RestaurantDashboard;
