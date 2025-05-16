
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Filter, Search, User, Calendar } from 'lucide-react';

// Import Supabase functions
import { 
  getAllReservations, 
  getAllRestaurants, 
  getCurrentUser, 
  getUserProfile 
} from '@/lib/supabase';

const ControlPanel: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  
  // Data states
  const [users, setUsers] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  
  // Filter states
  const [userFilter, setUserFilter] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('');
  const [reservationFilter, setReservationFilter] = useState('');
  
  // Static admin credentials for demo (in production, these would be in a secure database)
  const adminCredentials = {
    username: 'admin',
    password: 'dinevibe123'
  };
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    // In a real application, we would check if the current user is an admin via Supabase
    // Here, we'll simulate successful auth if they've already entered credentials
    setIsLoading(false);
    
    // For demo purposes, check if they're stored in session storage
    const storedAuth = sessionStorage.getItem('adminAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      toast({
        title: "Authenticated",
        description: "You have been successfully logged in as admin.",
      });
      loadData();
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load users
      // In a real implementation, this would fetch from the Supabase users table
      // For demo, we'll create some mock data
      setUsers([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', signup_date: '2023-06-10' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', signup_date: '2023-06-12' },
        { id: '3', name: 'Restaurant Owner', email: 'owner@example.com', role: 'owner', signup_date: '2023-06-05' },
      ]);
      
      // Load restaurants
      // In a real implementation, this would use getAllRestaurants()
      setRestaurants([
        { id: '1', name: 'The Savory Plate', owner_id: '3', location: 'Navrangpura', cuisine: 'Italian' },
        { id: '2', name: 'Urban Spice Fusion', owner_id: '3', location: 'Bodakdev', cuisine: 'Indian Fusion' },
      ]);
      
      // Load reservations
      // In a real implementation, this would use getAllReservations()
      setReservations([
        { 
          id: '1', 
          user_id: '1',
          user_name: 'John Doe', 
          restaurant_id: '1',
          restaurant_name: 'The Savory Plate',
          guest_count: 2,
          budget: 'premium',
          location: 'Navrangpura',
          event_type: 'anniversary',
          booking_date: '2023-07-15',
          status: 'confirmed'
        },
        { 
          id: '2', 
          user_id: '2',
          user_name: 'Jane Smith', 
          restaurant_id: '2',
          restaurant_name: 'Urban Spice Fusion',
          guest_count: 4,
          budget: 'luxury',
          location: 'Bodakdev',
          event_type: 'birthday',
          booking_date: '2023-07-20',
          status: 'pending'
        },
      ]);
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load admin panel data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "Export Failed",
        description: "No data to export.",
        variant: "destructive",
      });
      return;
    }
    
    // Create CSV string
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Export Successful",
      description: `${filename} has been downloaded.`,
    });
  };
  
  // Filter functions
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
    user.email.toLowerCase().includes(userFilter.toLowerCase()) ||
    user.role.toLowerCase().includes(userFilter.toLowerCase())
  );
  
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(restaurantFilter.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(restaurantFilter.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(restaurantFilter.toLowerCase())
  );
  
  const filteredReservations = reservations.filter(reservation => 
    reservation.user_name.toLowerCase().includes(reservationFilter.toLowerCase()) ||
    reservation.restaurant_name.toLowerCase().includes(reservationFilter.toLowerCase()) ||
    reservation.event_type.toLowerCase().includes(reservationFilter.toLowerCase()) ||
    reservation.location.toLowerCase().includes(reservationFilter.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-dineVibe-background">
        <Navbar userType="admin" userName="Admin" />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-dineVibe-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-dineVibe-text">Loading admin panel...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-dineVibe-background">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md bg-card border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">DineVibe Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-dineVibe-dark/50 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-dineVibe-dark/50 border-gray-700"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90"
                >
                  Access Control Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-dineVibe-background">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-secondary py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">DineVibe Control Panel</h1>
            <p className="text-white text-opacity-90">
              Manage users, restaurants, and reservations
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="users" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-dineVibe-text">Registered Users</h2>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className="pl-10 bg-dineVibe-dark/50 border-gray-700 w-full md:w-[300px]"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-dineVibe-primary text-dineVibe-primary"
                    onClick={() => handleExportCSV(filteredUsers, 'dinevibe-users')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
              
              <Card className="bg-card border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-dineVibe-dark/50">
                        <TableRow>
                          <TableHead className="text-dineVibe-text">User ID</TableHead>
                          <TableHead className="text-dineVibe-text">Name</TableHead>
                          <TableHead className="text-dineVibe-text">Email</TableHead>
                          <TableHead className="text-dineVibe-text">Role</TableHead>
                          <TableHead className="text-dineVibe-text">Signup Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-dineVibe-text/70">
                              No users found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-mono text-dineVibe-text/70">{user.id}</TableCell>
                              <TableCell className="text-dineVibe-text">{user.name}</TableCell>
                              <TableCell className="text-dineVibe-text">{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  user.role === 'admin' 
                                    ? 'bg-dineVibe-primary/20 text-dineVibe-primary' 
                                    : user.role === 'owner'
                                    ? 'bg-dineVibe-secondary/20 text-dineVibe-secondary'
                                    : 'bg-dineVibe-text/10 text-dineVibe-text/70'
                                }`}>
                                  {user.role}
                                </span>
                              </TableCell>
                              <TableCell className="text-dineVibe-text/70">{user.signup_date}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Restaurants Tab */}
            <TabsContent value="restaurants" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-dineVibe-text">Registered Restaurants</h2>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search restaurants..."
                      value={restaurantFilter}
                      onChange={(e) => setRestaurantFilter(e.target.value)}
                      className="pl-10 bg-dineVibe-dark/50 border-gray-700 w-full md:w-[300px]"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-dineVibe-primary text-dineVibe-primary"
                    onClick={() => handleExportCSV(filteredRestaurants, 'dinevibe-restaurants')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
              
              <Card className="bg-card border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-dineVibe-dark/50">
                        <TableRow>
                          <TableHead className="text-dineVibe-text">Restaurant ID</TableHead>
                          <TableHead className="text-dineVibe-text">Name</TableHead>
                          <TableHead className="text-dineVibe-text">Owner ID</TableHead>
                          <TableHead className="text-dineVibe-text">Location</TableHead>
                          <TableHead className="text-dineVibe-text">Cuisine</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRestaurants.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-dineVibe-text/70">
                              No restaurants found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredRestaurants.map((restaurant) => (
                            <TableRow key={restaurant.id}>
                              <TableCell className="font-mono text-dineVibe-text/70">{restaurant.id}</TableCell>
                              <TableCell className="text-dineVibe-text">{restaurant.name}</TableCell>
                              <TableCell className="font-mono text-dineVibe-text/70">{restaurant.owner_id}</TableCell>
                              <TableCell className="text-dineVibe-text">{restaurant.location}</TableCell>
                              <TableCell className="text-dineVibe-text">{restaurant.cuisine}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reservations Tab */}
            <TabsContent value="reservations" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-dineVibe-text">All Reservations</h2>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search reservations..."
                      value={reservationFilter}
                      onChange={(e) => setReservationFilter(e.target.value)}
                      className="pl-10 bg-dineVibe-dark/50 border-gray-700 w-full md:w-[300px]"
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-dineVibe-primary text-dineVibe-primary"
                    onClick={() => handleExportCSV(filteredReservations, 'dinevibe-reservations')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
              
              <Card className="bg-card border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-dineVibe-dark/50">
                        <TableRow>
                          <TableHead className="text-dineVibe-text">ID</TableHead>
                          <TableHead className="text-dineVibe-text">User</TableHead>
                          <TableHead className="text-dineVibe-text">Restaurant</TableHead>
                          <TableHead className="text-dineVibe-text">Guests</TableHead>
                          <TableHead className="text-dineVibe-text">Event Type</TableHead>
                          <TableHead className="text-dineVibe-text">Date</TableHead>
                          <TableHead className="text-dineVibe-text">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReservations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-dineVibe-text/70">
                              No reservations found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredReservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                              <TableCell className="font-mono text-dineVibe-text/70">{reservation.id}</TableCell>
                              <TableCell className="text-dineVibe-text">{reservation.user_name}</TableCell>
                              <TableCell className="text-dineVibe-text">{reservation.restaurant_name || 'Unassigned'}</TableCell>
                              <TableCell className="text-dineVibe-text">{reservation.guest_count}</TableCell>
                              <TableCell className="text-dineVibe-text capitalize">{reservation.event_type}</TableCell>
                              <TableCell className="text-dineVibe-text">{reservation.booking_date}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  reservation.status === 'confirmed' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : reservation.status === 'pending'
                                    ? 'bg-yellow-500/20 text-yellow-500'
                                    : reservation.status === 'cancelled'
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-dineVibe-text/10 text-dineVibe-text/70'
                                }`}>
                                  {reservation.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
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

export default ControlPanel;
