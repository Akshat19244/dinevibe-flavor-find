
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Store, Calendar, DollarSign, Download } from 'lucide-react';

const AdminReports: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>('30days');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 125000, bookings: 45 },
    { month: 'Feb', revenue: 145000, bookings: 52 },
    { month: 'Mar', revenue: 165000, bookings: 61 },
    { month: 'Apr', revenue: 155000, bookings: 58 },
    { month: 'May', revenue: 185000, bookings: 67 },
    { month: 'Jun', revenue: 205000, bookings: 73 },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 1200, owners: 45 },
    { month: 'Feb', users: 1450, owners: 52 },
    { month: 'Mar', users: 1680, owners: 61 },
    { month: 'Apr', users: 1920, owners: 68 },
    { month: 'May', users: 2180, owners: 75 },
    { month: 'Jun', users: 2450, owners: 82 },
  ];

  const venueTypeData = [
    { name: 'Banquet Halls', value: 35, color: '#8B0000' },
    { name: 'Restaurants', value: 28, color: '#D4AF37' },
    { name: 'Hotels', value: 20, color: '#2F2F2F' },
    { name: 'Gardens', value: 12, color: '#4A5568' },
    { name: 'Others', value: 5, color: '#718096' },
  ];

  const topVenuesData = [
    { name: 'Royal Garden Palace', bookings: 45, revenue: 125000 },
    { name: 'Grand Ballroom', bookings: 38, revenue: 98000 },
    { name: 'Sunset Terrace', bookings: 32, revenue: 87000 },
    { name: 'Heritage Hall', bookings: 28, revenue: 75000 },
    { name: 'Crystal Palace', bookings: 25, revenue: 68000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportReport = (type: string) => {
    setLoading(true);
    // Mock export functionality
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Report Generated',
        description: `${type} report has been generated and downloaded.`,
      });
    }, 2000);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Platform Analytics & Reports</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into platform performance and user behavior
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportReport('Platform Overview')}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(1280000)}</div>
              <p className="text-xs text-green-600">+12.5% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-green-600">+8.2% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Venues</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs text-green-600">+15.3% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">356</div>
              <p className="text-xs text-green-600">+18.7% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="users">User Growth</TabsTrigger>
            <TabsTrigger value="venues">Venue Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="revenue" stroke="#8B0000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#D4AF37" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8B0000" strokeWidth={2} name="Users" />
                    <Line type="monotone" dataKey="owners" stroke="#D4AF37" strokeWidth={2} name="Venue Owners" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="venues" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Venue Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={venueTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {venueTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Venues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topVenuesData.map((venue, index) => (
                      <div key={venue.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{venue.name}</div>
                          <div className="text-sm text-muted-foreground">{venue.bookings} bookings</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(venue.revenue)}</div>
                          <div className="text-sm text-muted-foreground">#{index + 1}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">73.2%</div>
                  <p className="text-sm text-muted-foreground">Booking conversion rate</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Average Booking Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatCurrency(65000)}</div>
                  <p className="text-sm text-muted-foreground">Per booking</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">4.6/5</div>
                  <p className="text-sm text-muted-foreground">Average rating</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
