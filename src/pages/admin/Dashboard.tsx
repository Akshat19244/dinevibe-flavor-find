
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Calendar, 
  FileText, 
  Settings, 
  TrendingUp,
  AlertTriangle 
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { getSystemStats } from '@/lib/api/admin';
import AdminNav from '@/components/admin/AdminNav';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<any>({
    usersCount: 0,
    restaurantsCount: 0,
    pendingRestaurantsCount: 0,
    reservationsCount: 0,
    claimedDealsCount: 0
  });
  const [systemStatus, setSystemStatus] = useState({
    api: 'healthy',
    database: 'healthy',
    storage: 'healthy',
    auth: 'healthy'
  });

  // Fetch system stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getSystemStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading system stats:', error);
        toast({
          title: 'Error',
          description: 'Failed to load system statistics.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check system status (mock for now)
    const checkSystemStatus = async () => {
      // In a real app, you'd ping each service
      setSystemStatus({
        api: 'healthy',
        database: 'healthy',
        storage: 'healthy',
        auth: 'healthy'
      });
    };
    
    loadStats();
    checkSystemStatus();
  }, [toast]);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview and management of the DineVibe platform
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/reports">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Admin Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats.usersCount}</div>
              <p className="text-xs text-muted-foreground">Platform registered users</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Restaurants</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats.restaurantsCount}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500">{stats.pendingRestaurantsCount} pending approval</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats.reservationsCount}</div>
              <p className="text-xs text-muted-foreground">Total bookings made</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Claimed Deals</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stats.claimedDealsCount}</div>
              <p className="text-xs text-muted-foreground">Claimed promotions</p>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current health of DineVibe services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${systemStatus.api === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>API Services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${systemStatus.database === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Database</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${systemStatus.storage === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${systemStatus.auth === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Authentication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Pending Approvals</span>
                {stats.pendingRestaurantsCount > 0 && (
                  <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                    {stats.pendingRestaurantsCount}
                  </span>
                )}
              </div>
            </TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Restaurant Approvals</CardTitle>
                <CardDescription>New restaurant registrations awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.pendingRestaurantsCount === 0 ? (
                  <p className="text-muted-foreground">No pending approvals</p>
                ) : (
                  <div className="text-center py-4">
                    <p className="mb-4">You have {stats.pendingRestaurantsCount} restaurant(s) awaiting approval</p>
                    <Button asChild>
                      <Link to="/admin/restaurants">
                        Review Pending Restaurants
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View detailed logs in the Admin Logs section
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/admin/logs">
                    View All Activity Logs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>User engagement and revenue metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed analytics are available in the Reports section
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/admin/reports">
                    View Detailed Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-2" asChild>
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-2" asChild>
                <Link to="/admin/restaurants">
                  <Store className="mr-2 h-4 w-4" />
                  Manage Restaurants
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reservation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-2" asChild>
                <Link to="/admin/reservations">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Reservations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
