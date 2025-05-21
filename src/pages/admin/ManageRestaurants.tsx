
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getPendingRestaurants, updateRestaurantApprovalStatus } from '@/lib/api/restaurants';
import { logAdminAction } from '@/lib/api/admin';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Restaurant profile type with owner info
interface RestaurantWithOwner {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  description: string;
  created_at: string;
  owner_id: string;
  profiles: {
    name: string;
    email: string;
    contact_number?: string;
  };
}

const ManageRestaurants: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<RestaurantWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPendingRestaurants();
  }, []);
  
  const fetchPendingRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getPendingRestaurants();
      setRestaurants(data as RestaurantWithOwner[]);
    } catch (error) {
      console.error('Error fetching pending restaurants:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pending restaurants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleApprove = async (id: string) => {
    if (!user) return;
    
    try {
      await updateRestaurantApprovalStatus(id, true);
      
      // Log the action
      await logAdminAction(
        user.id, 
        'approve_restaurant', 
        'restaurants',
        id,
        { action: 'approve' }
      );
      
      toast({
        title: 'Success',
        description: 'Restaurant approved successfully',
      });
      
      // Remove from list
      setRestaurants(restaurants.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error approving restaurant:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve restaurant',
        variant: 'destructive',
      });
    }
  };
  
  const handleReject = async (id: string) => {
    if (!user || !window.confirm('Are you sure you want to reject this restaurant?')) return;
    
    try {
      // Alternative: you could delete or mark with special status
      await updateRestaurantApprovalStatus(id, false);
      
      // Log the action
      await logAdminAction(
        user.id, 
        'reject_restaurant', 
        'restaurants',
        id,
        { action: 'reject' }
      );
      
      toast({
        title: 'Success',
        description: 'Restaurant rejected',
      });
      
      // Remove from list
      setRestaurants(restaurants.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error rejecting restaurant:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject restaurant',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Restaurant Approval</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pending Restaurant Applications</span>
              <Button variant="outline" onClick={fetchPendingRestaurants}>Refresh</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span>No pending restaurant applications</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell className="font-medium">{restaurant.name}</TableCell>
                        <TableCell>
                          <div>{restaurant.profiles?.name}</div>
                          <div className="text-sm text-muted-foreground">{restaurant.profiles?.email}</div>
                        </TableCell>
                        <TableCell>{restaurant.location}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{restaurant.cuisine}</Badge>
                        </TableCell>
                        <TableCell>{new Date(restaurant.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="default" size="sm" onClick={() => handleApprove(restaurant.id)}>
                            <CheckCircle className="mr-1 h-4 w-4" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleReject(restaurant.id)}>
                            <XCircle className="mr-1 h-4 w-4" /> Reject
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
      </div>
    </AdminLayout>
  );
};

export default ManageRestaurants;
