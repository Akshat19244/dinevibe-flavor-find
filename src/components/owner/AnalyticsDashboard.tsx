
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  BarChart3,
  PieChart,
  Download,
  RefreshCw
} from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const stats = {
    totalRevenue: 485000,
    totalBookings: 24,
    avgBookingValue: 20208,
    customerSatisfaction: 4.6,
    growthRate: 18,
    responseTime: 2.3
  };

  const monthlyData = [
    { month: 'Jan', revenue: 125000, bookings: 15 },
    { month: 'Feb', revenue: 145000, bookings: 18 },
    { month: 'Mar', revenue: 165000, bookings: 22 },
    { month: 'Apr', revenue: 185000, bookings: 25 },
    { month: 'May', revenue: 205000, bookings: 28 },
    { month: 'Jun', revenue: 225000, bookings: 32 }
  ];

  const eventTypes = [
    { type: 'Weddings', count: 12, percentage: 40, revenue: 285000 },
    { type: 'Corporate', count: 8, percentage: 27, revenue: 125000 },
    { type: 'Birthdays', count: 6, percentage: 20, revenue: 75000 },
    { type: 'Dining', count: 4, percentage: 13, revenue: 45000 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0C0C0C]">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#8B0000] text-[#8B0000]">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-[#8B0000]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Total Revenue</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{formatCurrency(stats.totalRevenue)}</h3>
                <p className="text-xs text-green-600">+{stats.growthRate}% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#8B0000]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#D4AF37]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Total Bookings</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.totalBookings}</h3>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Calendar className="h-8 w-8 text-[#D4AF37]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Avg Booking Value</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{formatCurrency(stats.avgBookingValue)}</h3>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Customer Rating</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.customerSatisfaction}</h3>
                <p className="text-xs text-[#2F2F2F]">142 reviews</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Response Time</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.responseTime}h</h3>
                <p className="text-xs text-green-600">-0.5h improvement</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2F2F2F]">Growth Rate</p>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{stats.growthRate}%</h3>
                <p className="text-xs text-green-600">This quarter</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="bookings">Booking Analytics</TabsTrigger>
          <TabsTrigger value="events">Event Types</TabsTrigger>
          <TabsTrigger value="customer">Customer Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-[#8B0000] mb-4" />
                  <p className="text-[#2F2F2F] mb-2">Revenue Chart</p>
                  <p className="text-sm text-[#2F2F2F]">
                    Monthly revenue: {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0C0C0C]">Monthly Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto text-[#D4AF37] mb-2" />
                    <p className="text-[#2F2F2F]">Booking Trends Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0C0C0C]">Booking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Confirmed</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pending</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-3 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cancelled</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div className="w-1 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0C0C0C]">Event Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventTypes.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-[#2F2F2F]/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#0C0C0C]">{event.type}</h4>
                        <span className="text-sm text-[#2F2F2F]">{event.percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-[#8B0000] rounded-full" 
                          style={{ width: `${event.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="font-semibold text-[#0C0C0C]">{event.count} events</p>
                      <p className="text-sm text-[#8B0000]">{formatCurrency(event.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0C0C0C]">Customer Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[#2F2F2F]/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-[#D4AF37] mb-2" />
                    <p className="text-[#2F2F2F]">Demographics Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0C0C0C]">Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Priya Sharma', bookings: 5, revenue: 75000 },
                    { name: 'Rajesh Kumar', bookings: 3, revenue: 45000 },
                    { name: 'Anjali Gupta', bookings: 4, revenue: 38000 },
                    { name: 'Vikram Singh', bookings: 2, revenue: 35000 }
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-[#2F2F2F]/20 rounded">
                      <div>
                        <p className="font-medium text-[#0C0C0C]">{customer.name}</p>
                        <p className="text-sm text-[#2F2F2F]">{customer.bookings} bookings</p>
                      </div>
                      <span className="font-semibold text-[#8B0000]">
                        {formatCurrency(customer.revenue)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
