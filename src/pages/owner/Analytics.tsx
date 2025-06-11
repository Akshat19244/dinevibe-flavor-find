
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const OwnerAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [metricType, setMetricType] = useState('revenue');

  // Sample analytics data - would come from database in real implementation
  const analyticsData = {
    revenue: {
      current: 485000,
      previous: 410000,
      change: 18.3,
      trend: 'up'
    },
    bookings: {
      current: 24,
      previous: 19,
      change: 26.3,
      trend: 'up'
    },
    customers: {
      current: 142,
      previous: 128,
      change: 10.9,
      trend: 'up'
    },
    rating: {
      current: 4.6,
      previous: 4.4,
      change: 4.5,
      trend: 'up'
    }
  };

  const eventTypeBreakdown = [
    { type: 'Weddings', count: 12, revenue: 280000, percentage: 57.7 },
    { type: 'Corporate Events', count: 6, revenue: 120000, percentage: 24.7 },
    { type: 'Birthday Parties', count: 4, revenue: 60000, percentage: 12.4 },
    { type: 'Anniversaries', count: 2, revenue: 25000, percentage: 5.2 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 320000, bookings: 18 },
    { month: 'Feb', revenue: 380000, bookings: 22 },
    { month: 'Mar', revenue: 450000, bookings: 26 },
    { month: 'Apr', revenue: 520000, bookings: 29 },
    { month: 'May', revenue: 485000, bookings: 24 },
    { month: 'Jun', revenue: 590000, bookings: 32 }
  ];

  const topCustomers = [
    { name: 'Sharma Wedding Planners', bookings: 8, revenue: 180000, lastBooking: '2024-06-15' },
    { name: 'TechCorp Solutions', bookings: 5, revenue: 125000, lastBooking: '2024-06-10' },
    { name: 'Elite Events', bookings: 4, revenue: 95000, lastBooking: '2024-06-08' },
    { name: 'Golden Celebrations', bookings: 3, revenue: 85000, lastBooking: '2024-06-05' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

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
                  Analytics Dashboard
                </h1>
                <p className="text-[#FFF5E1]/90">
                  Track your venue performance and business insights
                </p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0C0C0C]">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <Card className="card-luxury mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Time Range</label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-40 border-[#D4AF37]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="1year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0C0C0C] mb-2">Primary Metric</label>
                  <Select value={metricType} onValueChange={setMetricType}>
                    <SelectTrigger className="w-40 border-[#D4AF37]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="bookings">Bookings</SelectItem>
                      <SelectItem value="customers">Customers</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="mt-6 border-[#8B0000] text-[#8B0000]">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">
                      {formatCurrency(analyticsData.revenue.current)}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {getChangeIcon(analyticsData.revenue.trend)}
                      <span className={`text-sm ${getChangeColor(analyticsData.revenue.change)}`}>
                        +{analyticsData.revenue.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#8B0000]/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-[#8B0000]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Total Bookings</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">
                      {analyticsData.bookings.current}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {getChangeIcon(analyticsData.bookings.trend)}
                      <span className={`text-sm ${getChangeColor(analyticsData.bookings.change)}`}>
                        +{analyticsData.bookings.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#D4AF37]/10 rounded-full">
                    <Calendar className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Total Customers</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">
                      {analyticsData.customers.current}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {getChangeIcon(analyticsData.customers.trend)}
                      <span className={`text-sm ${getChangeColor(analyticsData.customers.change)}`}>
                        +{analyticsData.customers.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#2F2F2F]">Average Rating</p>
                    <h3 className="text-2xl font-bold text-[#0C0C0C]">
                      {analyticsData.rating.current}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {getChangeIcon(analyticsData.rating.trend)}
                      <span className={`text-sm ${getChangeColor(analyticsData.rating.change)}`}>
                        +{analyticsData.rating.change}%
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
              <TabsTrigger value="events">Event Types</TabsTrigger>
              <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            </TabsList>

            {/* Revenue Analysis */}
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Monthly Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 mx-auto text-[#8B0000] mb-4" />
                        <p className="text-[#2F2F2F] mb-2">Revenue Chart</p>
                        <div className="space-y-1 text-sm">
                          {monthlyData.slice(-3).map((month, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{month.month}:</span>
                              <span className="font-semibold">{formatCurrency(month.revenue)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-[#0C0C0C]">Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventTypeBreakdown.map((event, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{event.type}</span>
                              <span className="text-sm font-semibold">{formatCurrency(event.revenue)}</span>
                            </div>
                            <div className="w-full bg-[#2F2F2F]/20 rounded-full h-2">
                              <div 
                                className="bg-[#8B0000] h-2 rounded-full" 
                                style={{ width: `${event.percentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-[#2F2F2F]">{event.count} events</span>
                              <span className="text-xs text-[#2F2F2F]">{event.percentage}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Booking Trends */}
            <TabsContent value="bookings">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Booking Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
                        <p className="text-[#2F2F2F] mb-2">Monthly Bookings</p>
                        <div className="space-y-1 text-sm">
                          {monthlyData.slice(-3).map((month, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{month.month}:</span>
                              <span className="font-semibold">{month.bookings} bookings</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-[#0C0C0C]">Peak Booking Periods</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Wedding Season (Nov-Feb)</span>
                          <Badge className="bg-[#8B0000] text-[#FFF5E1]">High</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Corporate Events (Mar-May)</span>
                          <Badge className="bg-[#D4AF37] text-[#0C0C0C]">Medium</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Birthday Parties (All Year)</span>
                          <Badge variant="secondary">Steady</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Event Types */}
            <TabsContent value="events">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Event Type Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 mx-auto text-[#8B0000] mb-4" />
                        <p className="text-[#2F2F2F]">Event Distribution Chart</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {eventTypeBreakdown.map((event, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-[#0C0C0C]">{event.type}</h5>
                            <Badge variant="secondary">{event.count} events</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-[#2F2F2F]">Revenue:</span>
                              <p className="font-semibold text-[#8B0000]">{formatCurrency(event.revenue)}</p>
                            </div>
                            <div>
                              <span className="text-[#2F2F2F]">Share:</span>
                              <p className="font-semibold">{event.percentage}%</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Insights */}
            <TabsContent value="customers">
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-[#0C0C0C]">Top Customers & Repeat Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-[#2F2F2F]/20 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-semibold text-[#0C0C0C] mb-1">{customer.name}</h5>
                          <p className="text-sm text-[#2F2F2F]">Last booking: {customer.lastBooking}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#8B0000]">{formatCurrency(customer.revenue)}</p>
                          <p className="text-sm text-[#2F2F2F]">{customer.bookings} bookings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerAnalytics;
