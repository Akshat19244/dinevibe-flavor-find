
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAllUsers, updateUserRole, toggleUserAdmin } from '@/lib/api/users';
import { User } from '@/lib/api/types';
import { logAdminAction } from '@/lib/api/admin';
import { AlertCircle, CheckCircle, Shield, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// User profile type that extends the base User type for admin panel usage
interface UserProfile extends User {
  is_admin: boolean;
}

const ManageUsers: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isUpdateRoleOpen, setIsUpdateRoleOpen] = useState<boolean>(false);
  const [isToggleAdminOpen, setIsToggleAdminOpen] = useState<boolean>(false);
  const [updatingRole, setUpdatingRole] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      // Make sure all users have the required is_admin property
      const usersWithRequiredProps = usersData.map(user => ({
        ...user,
        is_admin: user.is_admin === true
      })) as UserProfile[];
      
      setUsers(usersWithRequiredProps);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Could not load user data.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;
    
    setUpdatingRole(true);
    try {
      await updateUserRole(selectedUser.id, selectedRole);
      
      // Log the admin action
      if (user) {
        await logAdminAction(
          user.id,
          'update_user_role',
          'profiles',
          selectedUser.id,
          {
            previous_role: selectedUser.role,
            new_role: selectedRole
          }
        );
      }
      
      toast({
        title: 'Role Updated',
        description: `User ${selectedUser.name}'s role has been updated to ${selectedRole}.`
      });
      
      setIsUpdateRoleOpen(false);
      fetchUsers(); // Refresh user list
      
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update user role.',
        variant: 'destructive'
      });
    } finally {
      setUpdatingRole(false);
    }
  };
  
  const handleToggleAdmin = async () => {
    if (!selectedUser) return;
    
    const newAdminStatus = !selectedUser.is_admin;
    
    try {
      await toggleUserAdmin(selectedUser.id, newAdminStatus);
      
      // Log the admin action
      if (user) {
        await logAdminAction(
          user.id,
          newAdminStatus ? 'grant_admin' : 'revoke_admin',
          'profiles',
          selectedUser.id,
          { new_admin_status: newAdminStatus }
        );
      }
      
      toast({
        title: 'Admin Status Updated',
        description: `${selectedUser.name} is ${newAdminStatus ? 'now' : 'no longer'} an admin.`
      });
      
      setIsToggleAdminOpen(false);
      fetchUsers(); // Refresh user list
      
    } catch (error) {
      console.error('Error toggling admin status:', error);
      toast({
        title: 'Update Failed',
        description: 'Could not update admin status.',
        variant: 'destructive'
      });
    }
  };
  
  const handleOpenUpdateRole = (user: UserProfile) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setIsUpdateRoleOpen(true);
  };
  
  const handleOpenToggleAdmin = (user: UserProfile) => {
    setSelectedUser(user);
    setIsToggleAdminOpen(true);
  };
  
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">
              View and manage user accounts on the platform.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={fetchUsers}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : users.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>No users found.</AlertDescription>
          </Alert>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Admin Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {user.avatar_url ? (
                          <img 
                            src={user.avatar_url} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <UserIcon className="w-8 h-8 text-gray-400" />
                        )}
                        <span>{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'owner'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.is_admin ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" /> 
                          Admin
                        </div>
                      ) : (
                        <div className="text-gray-500">Not Admin</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.contact_number || 'Not provided'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenUpdateRole(user)}
                        >
                          Update Role
                        </Button>
                        <Button 
                          variant={user.is_admin ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => handleOpenToggleAdmin(user)}
                        >
                          {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Update Role Dialog */}
      <Dialog open={isUpdateRoleOpen} onOpenChange={setIsUpdateRoleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User Role</DialogTitle>
            <DialogDescription>
              Change the role of {selectedUser?.name}. This will affect their permissions and access.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="owner">Restaurant Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateRoleOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateRole}
              disabled={updatingRole}
            >
              {updatingRole ? 'Updating...' : 'Update Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Toggle Admin Dialog */}
      <Dialog open={isToggleAdminOpen} onOpenChange={setIsToggleAdminOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.is_admin ? 'Remove Admin Status' : 'Grant Admin Status'}</DialogTitle>
            <DialogDescription>
              {selectedUser?.is_admin 
                ? `This will remove admin privileges from ${selectedUser?.name}.` 
                : `This will grant admin privileges to ${selectedUser?.name}.`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                {selectedUser?.is_admin 
                  ? 'The user will no longer have access to admin features.'
                  : 'The user will gain access to all admin features.'}
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsToggleAdminOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant={selectedUser?.is_admin ? "destructive" : "default"}
              onClick={handleToggleAdmin}
            >
              {selectedUser?.is_admin ? 'Remove Admin' : 'Make Admin'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageUsers;
