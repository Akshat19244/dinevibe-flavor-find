
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAllUsers, updateUserRole, toggleUserAdmin } from '@/lib/api/users';
import { logAdminAction } from '@/lib/api/admin';
import { AlertCircle, CheckCircle, Shield, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// User profile type
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'owner' | 'admin';
  is_admin: boolean;
  signup_date: string;
}

const AdminUsers: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleAdmin = async (userId: string, isCurrentlyAdmin: boolean) => {
    if (!user) return;
    
    try {
      // Don't allow removing admin status if it would result in fewer than 1 admin
      if (isCurrentlyAdmin) {
        const adminCount = users.filter(u => u.is_admin).length;
        if (adminCount <= 1) {
          toast({
            title: 'Action Denied',
            description: 'At least one admin must exist in the system.',
            variant: 'destructive',
          });
          return;
        }
      }
      
      await toggleUserAdmin(userId, !isCurrentlyAdmin);
      
      // Log the action
      await logAdminAction(
        user.id, 
        isCurrentlyAdmin ? 'remove_admin' : 'add_admin', 
        'profiles',
        userId,
        { action: isCurrentlyAdmin ? 'remove_admin' : 'add_admin' }
      );
      
      toast({
        title: 'Success',
        description: `Admin status ${isCurrentlyAdmin ? 'removed' : 'granted'}.`,
      });
      
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update admin status',
        variant: 'destructive',
      });
    }
  };
  
  const openRoleDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsRoleDialogOpen(true);
  };
  
  const handleRoleChange = async () => {
    if (!selectedUser || !user) return;
    
    try {
      await updateUserRole(selectedUser.id, newRole as 'user' | 'owner' | 'admin');
      
      // Log the action
      await logAdminAction(
        user.id, 
        'update_user_role', 
        'profiles',
        selectedUser.id,
        { old_role: selectedUser.role, new_role: newRole }
      );
      
      toast({
        title: 'Success',
        description: `User role updated to ${newRole}.`,
      });
      
      // Close dialog and refresh users
      setIsRoleDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteUser = async (userId: string, email: string) => {
    if (!user || !window.confirm(`Are you sure you want to delete user ${email}?`)) return;
    
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      // Log the action
      await logAdminAction(
        user.id, 
        'delete_user', 
        'profiles',
        userId,
        { email }
      );
      
      toast({
        title: 'Success',
        description: 'User deleted successfully.',
      });
      
      // Refresh users
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };
  
  const getRoleIcon = (role: string, isAdmin: boolean) => {
    if (isAdmin) return <Shield className="h-4 w-4 text-purple-500" />;
    if (role === 'owner') return <CheckCircle className="h-4 w-4 text-blue-500" />;
    return <UserIcon className="h-4 w-4 text-gray-500" />;
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">User Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Users</span>
              <Button variant="outline" onClick={fetchUsers}>Refresh</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>No users found</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userItem) => (
                      <TableRow key={userItem.id}>
                        <TableCell className="font-medium">{userItem.name}</TableCell>
                        <TableCell>{userItem.email}</TableCell>
                        <TableCell className="flex items-center">
                          {getRoleIcon(userItem.role, userItem.is_admin)}
                          <span className="ml-2 capitalize">{userItem.role}</span>
                          {userItem.is_admin && <span className="ml-2 text-xs bg-purple-100 text-purple-800 py-0.5 px-2 rounded-full">Admin</span>}
                        </TableCell>
                        <TableCell>{new Date(userItem.signup_date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => openRoleDialog(userItem)}>
                            Change Role
                          </Button>
                          <Button 
                            variant={userItem.is_admin ? "destructive" : "outline"} 
                            size="sm"
                            onClick={() => handleToggleAdmin(userItem.id, userItem.is_admin)}
                          >
                            {userItem.is_admin ? 'Remove Admin' : 'Make Admin'}
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
        
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change User Role</DialogTitle>
              <DialogDescription>
                Change the role for user {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Customer</SelectItem>
                  <SelectItem value="owner">Restaurant Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRoleChange}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
