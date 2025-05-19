import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  getAllRestaurants,
  updateRestaurantApprovalStatus,
  getPendingRestaurants,
  getRestaurantById
} from '@/lib/api/restaurants';
import { isUserAdmin } from '@/lib/api/admin';
import { Restaurant } from '@/lib/api/types';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Search, 
  Download, 
  CheckCircle, 
  XCircle, 
  Info,
  Building,
  Clock,
  MapPin,
  Utensils,
  DollarSign,
  Users
} from 'lucide-react';

const ManageRestaurants: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pendingRestaurants, setPendingRestaurants] = useState<any[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  // Unique cuisines
  const [cuisines, setCuisines] = useState<string[]>([]);
  
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      const admin = await isUserAdmin(user.id);
      if (!admin) {
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access this page.',
          variant: 'destructive'
        });
        navigate('/');
      }
    };
    
    const loadRestaurants = async () => {
      try {
        const [allRestaurants, pendingRestos] = await Promise.all([
          getAllRestaurants(),
          getPendingRestaurants()
        ]);
        
        setRestaurants(allRestaurants);
        setFilteredRestaurants(allRestaurants);
        setPendingRestaurants(pendingRestos);
        
        // Extract unique cuisines for filter
        const uniqueCuisines = [...new Set(allRestaurants.map(r => r.cuisine))];
        setCuisines(uniqueCuisines);
      } catch (error) {
        console.error('Error loading restaurants:', error);
        toast({
          title: 'Error',
          description: 'Failed to load restaurant data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
    loadRestaurants();
  }, [user, navigate, toast]);
  
  // Apply filters whenever search query or cuisine filter changes
  useEffect(() => {
    let result = [...restaurants];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(query) || 
          restaurant.location.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query)
      );
    }
    
    // Apply cuisine filter
    if (cuisineFilter !== 'all') {
      result = result.filter(restaurant => restaurant.cuisine === cuisineFilter);
    }
    
    setFilteredRestaurants(result);
  }, [searchQuery, cuisineFilter, restaurants]);
  
  const handleViewDetails = async (restaurantId: string) => {
    try {
      const restaurant = await getRestaurantById(restaurantId);
      setSelectedRestaurant(restaurant);
      setShowDetailsDialog(true);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load restaurant details.',
        variant: 'destructive'
      });
    }
  };
  
  const handleApproveRestaurant = async (restaurantId: string, approve: boolean) => {
    try {
      await updateRestaurantApprovalStatus(restaurantId, approve);
      
      toast({
        title: approve ? 'Restaurant Approved' : 'Restaurant Rejected',
        description: `The restaurant has been ${approve ? 'approved' : 'rejected'}.`
      });
      
      // Refresh restaurants list
      const [allRestaurants, pendingRestos] = await Promise.all([
        getAllRestaurants(),
        getPendingRestaurants()
      ]);
      
      setRestaurants(allRestaurants);
      setPendingRestaurants(pendingRestos);
      
      // Update filtered list
      let result = [...allRestaurants];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          restaurant => 
            restaurant.name.toLowerCase().includes(query) || 
            restaurant.location.toLowerCase().includes(query) ||
            restaurant.cuisine.toLowerCase().includes(query)
        );
      }
      
      if (cuisineFilter !== 'all') {
        result = result.filter(restaurant => restaurant.cuisine === cuisineFilter);
      }
      
      setFilteredRestaurants(result);
    } catch (error) {
      console.error('Error updating restaurant status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update restaurant approval status.',
        variant: 'destructive'
      });
    }
  };
  
  const handleExportCsv = () => {
    // Prepare CSV data
    const headers = ['ID', 'Name', 'Location', 'Cuisine', 'Price Range', 'Owner ID', 'Approved', 'Created At'];
    
    const csvData = filteredRestaurants.map(restaurant => [
      restaurant.id,
      restaurant.name,
      restaurant.location,
      restaurant.cuisine,
      restaurant.price_range || 'N/A',
      restaurant.owner_id,
      restaurant.is_approved ? 'Yes' : 'No',
      format(new Date(restaurant.created_at), 'yyyy-MM-dd HH:mm:ss')
    ]);
    
    // Add headers
    csvData.unshift(headers);
    
    // Convert to CSV string
    const csvString = csvData.map(row => row.join(',')).join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dineibeRestaurants_${format(new Date(), 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Restaurant Management</h1>
              <p className="text-gray-500">Manage and monitor restaurants on the platform</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 sm:mt-0"
              onClick={handleExportCsv}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">
                All Restaurants
                <span className="ml-2 bg-gray-200 text-gray-800 rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {restaurants.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending Approval
                {pendingRestaurants.length > 0 && (
                  <span className="ml-2 bg-yellow-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {pendingRestaurants.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>All Restaurants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search restaurants..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cuisines</SelectItem>
                        {cuisines.map(cuisine => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {isLoading ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary rounded-full" aria-hidden="true"></div>
                      <p className="mt-2">Loading restaurants...</p>
                    </div>
                  ) : filteredRestaurants.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No restaurants found matching your filters</p>
                    </div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Cuisine</TableHead>
                            <TableHead>Price Range</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRestaurants.map((restaurant) => (
                            <TableRow key={restaurant.id}>
                              <TableCell className="font-medium">{restaurant.name}</TableCell>
                              <TableCell>{restaurant.location}</TableCell>
                              <TableCell>{restaurant.cuisine}</TableCell>
                              <TableCell>{restaurant.price_range || 'N/A'}</TableCell>
                              <TableCell>
                                <Badge
                                  className={restaurant.is_approved ? 'bg-green-500' : 'bg-yellow-500'}
                                >
                                  {restaurant.is_approved ? 'Approved' : 'Pending'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewDetails(restaurant.id)}
                                >
                                  <Info className="h-4 w-4 mr-1" />
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Pending Approval Restaurants</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary rounded-full" aria-hidden="true"></div>
                      <p className="mt-2">Loading pending restaurants...</p>
                    </div>
                  ) : pendingRestaurants.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">No pending restaurants</p>
                      <p className="text-gray-500">All restaurant applications have been reviewed</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingRestaurants.map((restaurant) => (
                        <Card key={restaurant.id} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex flex-wrap justify-between gap-4 mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                                <div className="flex items-center text-gray-500 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {restaurant.location}
                                </div>
                              </div>
                              <Badge className="bg-yellow-500">Pending Approval</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Utensils className="h-4 w-4 mr-1" />
                                  Cuisine
                                </span>
                                <span className="font-medium">{restaurant.cuisine}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500 flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  Price Range
                                </span>
                                <span className="font-medium">{restaurant.price_range || 'N/A'}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  Staff Size
                                </span>
                                <span className="font-medium">{restaurant.staff_size || 'N/A'}</span>
                              </div>
                              
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500 flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Submitted
                                </span>
                                <span className="font-medium">{format(new Date(restaurant.created_at), 'PP')}</span>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4 mt-4">
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Owner Details</h4>
                                <p className="text-sm">
                                  <span className="font-medium">Name:</span> {restaurant.profiles?.name || 'N/A'}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Email:</span> {restaurant.profiles?.email || 'N/A'}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Contact:</span> {restaurant.profiles?.contact_number || 'N/A'}
                                </p>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewDetails(restaurant.id)}
                                >
                                  <Info className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleApproveRestaurant(restaurant.id, false)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleApproveRestaurant(restaurant.id, true)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Restaurant Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Restaurant Details</DialogTitle>
            <DialogDescription>
              Complete information about the restaurant.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRestaurant && (
            <div className="space-y-6 py-2">
              {/* Restaurant images */}
              {selectedRestaurant.images && selectedRestaurant.images.length > 0 && (
                <div className="h-48 overflow-hidden rounded-md">
                  <img 
                    src={selectedRestaurant.images[0]} 
                    alt={selectedRestaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Basic info */}
              <div>
                <h3 className="text-xl font-bold">{selectedRestaurant.name}</h3>
                <div className="flex items-center text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedRestaurant.location}
                </div>
                
                <div className="flex items-center mt-2">
                  <Badge className="mr-2">{selectedRestaurant.cuisine}</Badge>
                  {selectedRestaurant.price_range && (
                    <Badge variant="outline">{selectedRestaurant.price_range}</Badge>
                  )}
                </div>
                
                <p className="mt-4">{selectedRestaurant.description}</p>
              </div>
              
              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Restaurant Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Staff Size:</span> {selectedRestaurant.staff_size || 'Not specified'}</p>
                    <p><span className="font-medium">Created:</span> {format(new Date(selectedRestaurant.created_at), 'PPP')}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <Badge className={selectedRestaurant.is_approved ? 'bg-green-500' : 'bg-yellow-500'}>
                        {selectedRestaurant.is_approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                {/* Manager details */}
                {selectedRestaurant.manager_details && (
                  <div>
                    <h4 className="font-medium mb-2">Manager Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{' '}
                        {typeof selectedRestaurant.manager_details === 'object' && 
                         selectedRestaurant.manager_details !== null && 
                         'name' in selectedRestaurant.manager_details ? 
                          String(selectedRestaurant.manager_details.name) : 'Not specified'}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{' '}
                        {typeof selectedRestaurant.manager_details === 'object' && 
                         selectedRestaurant.manager_details !== null && 
                         'email' in selectedRestaurant.manager_details ? 
                          String(selectedRestaurant.manager_details.email) : 'Not specified'}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>{' '}
                        {typeof selectedRestaurant.manager_details === 'object' && 
                         selectedRestaurant.manager_details !== null && 
                         'contact' in selectedRestaurant.manager_details ? 
                          String(selectedRestaurant.manager_details.contact) : 'Not specified'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Menu images */}
              {selectedRestaurant.menu_images && selectedRestaurant.menu_images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Menu Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedRestaurant.menu_images.map((image, index) => (
                      <div key={index} className="h-32 rounded-md overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Menu ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Deals */}
              {selectedRestaurant.deals && selectedRestaurant.deals.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Current Deals</h4>
                  <div className="space-y-2">
                    {selectedRestaurant.deals.map((deal, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <h5 className="font-medium">{deal.title}</h5>
                        <p className="text-sm">{deal.description}</p>
                        {deal.discount_percentage && (
                          <Badge className="mt-2 bg-green-500">{deal.discount_percentage}% Off</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <DialogFooter>
                {!selectedRestaurant.is_approved ? (
                  <div className="flex w-full sm:justify-end gap-2">
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        handleApproveRestaurant(selectedRestaurant.id, false);
                        setShowDetailsDialog(false);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      variant="default"
                      onClick={() => {
                        handleApproveRestaurant(selectedRestaurant.id, true);
                        setShowDetailsDialog(false);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setShowDetailsDialog(false)}
                  >
                    Close
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageRestaurants;
