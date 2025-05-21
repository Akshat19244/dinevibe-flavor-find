
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getPendingRestaurants, updateRestaurantApprovalStatus } from '@/lib/api/restaurants';
import { useToast } from '@/components/ui/use-toast';
import { logAdminAction } from '@/lib/api/admin';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Json } from '@/lib/api/types';

// Restaurant profile type with owner info
interface RestaurantWithOwner {
  id: string;
  name: string;
  description: string;
  location: string;
  cuisine: string;
  price_range?: string;
  created_at: string;
  owner_id: string;
  profiles: {
    name: string;
    email: string;
    contact_number?: string;
  };
  // Additional properties that were added later
  budget_range?: { min: number; max: number } | null;
  seating_capacity?: number;
  offers_decoration?: boolean;
  is_approved?: boolean;
  images?: string[];
}

const ManageRestaurants: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<RestaurantWithOwner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    fetchPendingRestaurants();
  }, []);
  
  const fetchPendingRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getPendingRestaurants();
      // Use type assertion to match the expected type
      setRestaurants(data as unknown as RestaurantWithOwner[]);
    } catch (error) {
      console.error('Error fetching pending restaurants:', error);
      toast({
        title: 'Error',
        description: 'Could not load pending restaurant data.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleApproval = async (id: string, isApproved: boolean) => {
    // Set processing state for this restaurant
    setProcessing(prev => ({ ...prev, [id]: true }));
    
    try {
      await updateRestaurantApprovalStatus(id, isApproved);
      
      // Log the admin action
      if (user) {
        await logAdminAction(
          user.id,
          isApproved ? 'approve_restaurant' : 'reject_restaurant',
          'restaurants',
          id
        );
      }
      
      toast({
        title: isApproved ? 'Restaurant Approved' : 'Restaurant Rejected',
        description: isApproved 
          ? 'The restaurant has been approved and is now visible to users.'
          : 'The restaurant has been rejected.'
      });
      
      // Remove the restaurant from the list
      setRestaurants(prev => prev.filter(rest => rest.id !== id));
      
    } catch (error) {
      console.error('Error updating restaurant approval:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update restaurant approval status.',
        variant: 'destructive'
      });
    } finally {
      // Reset processing state
      setProcessing(prev => ({ ...prev, [id]: false }));
    }
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pending Restaurants</h1>
            <p className="text-muted-foreground">
              Review and approve restaurant listings before they appear on the platform.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchPendingRestaurants}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <div className="h-64 rounded-md bg-muted animate-pulse" />
          </div>
        ) : restaurants.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/80" />
              <p className="mt-4 text-lg font-medium">No pending restaurants</p>
              <p className="text-sm text-muted-foreground">
                All restaurant submissions have been reviewed.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Applications ({restaurants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Cuisine</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{restaurant.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {restaurant.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{restaurant.profiles.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {restaurant.profiles.email}
                          </div>
                          {restaurant.profiles.contact_number && (
                            <div className="text-xs text-muted-foreground">
                              {restaurant.profiles.contact_number}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{restaurant.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {restaurant.cuisine}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(restaurant.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleApproval(restaurant.id, true)}
                            disabled={processing[restaurant.id]}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleApproval(restaurant.id, false)}
                            disabled={processing[restaurant.id]}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageRestaurants;
