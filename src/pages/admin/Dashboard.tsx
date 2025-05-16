
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  CalendarClock, 
  Users, 
  BarChart, 
  ChevronRight, 
  Bell,
  Settings,
  ShieldAlert,
  BadgeCheck,
  Globe,
  Calendar,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";

const AdminDashboard: React.FC = () => {
  // Sample data for the dashboard
  const stats = {
    totalUsers: 842,
    newUsers: 24,
    totalRestaurants: 57,
    pendingVerifications: 6,
    activeEvents: 37,
    totalBookings: 1284,
    completionRate: 93,
    systemHealth: 100
  };
  
  // Recent signups
  const recentSignups = [
    {
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      type: 'customer',
      time: '2 hours ago',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    {
      name: 'Ocean Blue Restaurant',
      email: 'contact@oceanblue.com',
      type: 'owner',
      time: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      type: 'customer',
      time: '1 day ago',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
    }
  ];
  
  // Recent verifications
  const pendingVerifications = [
    {
      name: 'Spice Garden Restaurant',
      email: 'info@spicegarden.com',
      location: 'Chicago, IL',
      time: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      name: 'Seafood Harbor',
      email: 'contact@seafoodharbor.com',
      location: 'Miami, FL',
      time: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    }
  ];
  
  // Recent activities
  const recentActivities = [
    {
      action: 'New restaurant verified',
      details: 'Italian Bistro was verified by admin',
      time: '1 hour ago',
      type: 'verification'
    },
    {
      action: 'System update',
      details: 'New features deployed successfully',
      time: '3 hours ago',
      type: 'system'
    },
    {
      action: 'New event published',
      details: 'Wine Tasting Night at Cellar House',
      time: '5 hours ago',
      type: 'event'
    },
    {
      action: 'User reported issue',
      details: 'Booking system error reported',
      time: '1 day ago',
      type: 'issue'
    }
  ];
  
  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <BadgeCheck className="h-4 w-4 text-green-500" />;
      case 'system':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'issue':
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white text-opacity-90">
              Manage and monitor the DineVibe platform
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                      <span className="text-sm text-green-600">+{stats.newUsers} new</span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Restaurant Partners</p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-2xl font-bold">{stats.totalRestaurants}</h3>
                      <span className="text-sm text-yellow-600">{stats.pendingVerifications} pending</span>
                    </div>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <BadgeCheck className="h-5 w-5 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{stats.activeEvents}</h3>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <CalendarClock className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Calendar className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions and System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to="/admin/users">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-full">
                        <Users className="h-8 w-8 text-blue-600 mb-2" />
                        <h3 className="font-medium">Manage Users</h3>
                        <p className="text-sm text-gray-500 mt-1">View and manage user accounts</p>
                      </div>
                    </Link>
                    
                    <Link to="/admin/users?filter=pending">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-full">
                        <BadgeCheck className="h-8 w-8 text-yellow-600 mb-2" />
                        <h3 className="font-medium">Verify Restaurants</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <Badge className="bg-yellow-100 border-0 text-yellow-800">{stats.pendingVerifications}</Badge> pending approvals
                        </p>
                      </div>
                    </Link>
                    
                    <Link to="/admin/reports">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-full">
                        <BarChart className="h-8 w-8 text-purple-600 mb-2" />
                        <h3 className="font-medium">View Reports</h3>
                        <p className="text-sm text-gray-500 mt-1">Access detailed analytics</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Server Status</span>
                      <span className="text-sm font-medium text-green-600">Online</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Booking Completion</span>
                      <span className="text-sm font-medium">{stats.completionRate}%</span>
                    </div>
                    <Progress value={stats.completionRate} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="pt-2 text-center">
                    <Button variant="outline" className="text-sm w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity, Signups, and Pending Verifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
                <CardDescription>New users registered on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSignups.map((user, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium text-sm">{user.name}</h3>
                          <Badge className="ml-2 text-xs" variant="outline">
                            {user.type === 'customer' ? 'User' : 'Restaurant'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">{user.time}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Link to="/admin/users">
                    <Button variant="ghost" className="w-full text-sm justify-between">
                      View All Users
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
                <CardDescription>Restaurant owners awaiting verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((owner, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={owner.avatar} 
                            alt={owner.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{owner.name}</h3>
                          <p className="text-xs text-gray-500">{owner.location}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500">{owner.email}</span>
                        <span className="text-xs text-gray-400">{owner.time}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="w-1/2 text-xs">Reject</Button>
                        <Button size="sm" className="w-1/2 text-xs">Verify</Button>
                      </div>
                    </div>
                  ))}
                  
                  {pendingVerifications.length === 0 ? (
                    <div className="text-center py-6">
                      <BadgeCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-medium">All caught up!</h3>
                      <p className="text-sm text-gray-500">No pending verifications</p>
                    </div>
                  ) : (
                    <Link to="/admin/users?filter=pending">
                      <Button variant="ghost" className="w-full text-sm justify-between">
                        View All Pending
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="mt-0.5">
                        <div className="p-1.5 rounded-full bg-gray-100">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{activity.action}</h3>
                        <p className="text-xs text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="ghost" className="w-full text-sm justify-between">
                    View All Activity
                    <ChevronRight className="h-4 w-4" />
                  </Button>
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

export default AdminDashboard;
