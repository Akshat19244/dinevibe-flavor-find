
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Download, 
  BarChart, 
  PieChart, 
  LineChart,
  Filter,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { format, subMonths } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const currentDate = new Date();
  
  // Sample data for charts
  const generateDateData = () => {
    let data = [];
    
    if (timeRange === '7days') {
      // Last 7 days data
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: format(date, 'MMM dd'),
          bookings: Math.floor(Math.random() * 30) + 10,
          events: Math.floor(Math.random() * 5) + 1,
          users: Math.floor(Math.random() * 8) + 2,
        });
      }
    } else if (timeRange === '30days') {
      // Last 30 days data (grouped by 3 days)
      for (let i = 9; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 3));
        data.push({
          date: format(date, 'MMM dd'),
          bookings: Math.floor(Math.random() * 80) + 40,
          events: Math.floor(Math.random() * 15) + 5,
          users: Math.floor(Math.random() * 20) + 8,
        });
      }
    } else {
      // Last 12 months data
      for (let i = 11; i >= 0; i--) {
        const date = subMonths(currentDate, i);
        data.push({
          date: format(date, 'MMM'),
          bookings: Math.floor(Math.random() * 300) + 100,
          events: Math.floor(Math.random() * 45) + 15,
          users: Math.floor(Math.random() * 65) + 25,
        });
      }
    }
    
    return data;
  };
  
  const dateData = generateDateData();
  
  // Restaurant categories data for pie chart
  const categoryData = [
    { name: 'Italian', value: 28 },
    { name: 'Asian', value: 22 },
    { name: 'American', value: 18 },
    { name: 'Mexican', value: 15 },
    { name: 'Indian', value: 12 },
    { name: 'Other', value: 5 },
  ];
  
  // User types data for pie chart
  const userTypeData = [
    { name: 'Customers', value: 75 },
    { name: 'Restaurant Owners', value: 25 },
  ];
  
  // Colors for pie charts
  const COLORS = ['#FF5A5F', '#FBC02D', '#4CAF50', '#00BFA6', '#2196F3', '#9C27B0'];
  const USER_COLORS = ['#4CAF50', '#2196F3'];
  
  // Sample metrics data
  const metricsData = [
    { 
      title: 'Total Bookings', 
      value: 1284, 
      change: 12.8, 
      positive: true 
    },
    { 
      title: 'Active Users', 
      value: 842, 
      change: 4.2, 
      positive: true 
    },
    { 
      title: 'Upcoming Events', 
      value: 37, 
      change: -2.5, 
      positive: false 
    },
    { 
      title: 'Avg. Rating', 
      value: 4.8, 
      change: 0.2, 
      positive: true 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-white text-opacity-90">
              View platform-wide performance metrics
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Platform Overview</h2>
            
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <h3 className="text-3xl font-bold mt-1">
                        {typeof metric.value === 'number' && metric.title === 'Avg. Rating' 
                          ? metric.value.toFixed(1) 
                          : metric.value.toLocaleString()}
                      </h3>
                    </div>
                    <div className={`px-2 py-1 rounded-md flex items-center ${
                      metric.positive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {metric.positive 
                        ? <ArrowUpRight className="h-4 w-4 mr-1" /> 
                        : <ArrowDownRight className="h-4 w-4 mr-1" />
                      }
                      <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Booking Trends
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dateData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="bookings" 
                        name="Bookings"
                        stroke="#FF5A5F" 
                        fill="#FF5A5F" 
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    Activities Comparison
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={dateData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="events" 
                        name="Events" 
                        fill="#FBC02D" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="users" 
                        name="New Users" 
                        fill="#00BFA6" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Restaurant Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => entry.name}
                        labelLine={{ stroke: '#c0c0c0', strokeWidth: 0.5, opacity: 0.8 }}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {categoryData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 mr-1 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm">{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => entry.name}
                        labelLine={{ stroke: '#c0c0c0', strokeWidth: 0.5, opacity: 0.8 }}
                      >
                        {userTypeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={USER_COLORS[index % USER_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {userTypeData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 mr-1 rounded-full"
                        style={{ backgroundColor: USER_COLORS[index % USER_COLORS.length] }}
                      ></div>
                      <span className="text-sm">{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;
