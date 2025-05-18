
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getUserProfile } from '@/lib/api/users';
import { getSystemStats } from '@/lib/api/admin';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import AdminNav from '@/components/admin/AdminNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { User, Users, Utensils, CalendarCheck, Tag } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) {
        navigate('/admin/auth');
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Load user profile
        const profile = await getUserProfile(user.id);
        setUserProfile(profile);
        
        if (!profile.is_admin) {
          toast({
            title: 'Access Denied',
            description: 'You do not have admin privileges.',
            variant: 'destructive'
          });
          navigate('/');
          return;
        }
        
        // Load system stats
        const systemStats = await getSystemStats();
        setStats(systemStats);
        
      } catch (error) {
        console.error('Error loading admin dashboard:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboard();
  }, [user, navigate, toast]);
  
  // Dummy data for charts
  const userActivityData = [
    { name: 'Jan', Users: 400, Bookings: 240 },
    { name: 'Feb', Users: 300, Bookings: 139 },
    { name: 'Mar', Users: 200, Bookings: 980 },
    { name: 'Apr', Users: 278, Bookings: 390 },
    { name: 'May', Users: 189, Bookings: 480 },
    { name: 'Jun', Users: 239, Bookings: 380 },
  ];
  
  const userTypesData = [
    { name: 'Customers', value: stats?.usersCount || 100 },
    { name: 'Restaurant Owners', value: stats?.restaurantsCount || 20 },
    { name: 'Admins', value: 2 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar userType="admin" userName="Admin" />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName={userProfile?.name || 'Admin'} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 mb-6">Welcome back, {userProfile?.name}. Here's what's happening with DineVibe.</p>
          
          <AdminNav />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="p-2 bg-blue-100 rounded-full mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-1">{stats?.usersCount || 0}</CardTitle>
                <p className="text-sm text-gray-500">Total Users</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="p-2 bg-green-100 rounded-full mb-4">
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl mb-1">{stats?.restaurantsCount || 0}</CardTitle>
                <p className="text-sm text-gray-500">Restaurants</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="p-2 bg-yellow-100 rounded-full mb-4">
                  <CalendarCheck className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl mb-1">{stats?.reservationsCount || 0}</CardTitle>
                <p className="text-sm text-gray-500">Reservations</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="p-2 bg-purple-100 rounded-full mb-4">
                  <Tag className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl mb-1">{stats?.claimedDealsCount || 0}</CardTitle>
                <p className="text-sm text-gray-500">Claimed Deals</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userActivityData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Users" fill="#8884d8" />
                      <Bar dataKey="Bookings" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-500">A new user has signed up for DineVibe</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">2 hours ago</div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <Utensils className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium">Restaurant approved</p>
                    <p className="text-sm text-gray-500">A new restaurant was approved and is now listed</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">5 hours ago</div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                    <CalendarCheck className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-medium">New reservation</p>
                    <p className="text-sm text-gray-500">A customer made a new reservation at The Savory Plate</p>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">Yesterday</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
