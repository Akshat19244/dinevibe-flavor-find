import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getAllUsers, updateUserRole, setUserAsAdmin } from '@/lib/api/users';
import { isUserAdmin, logAdminAction } from '@/lib/api/admin';
import { User, Json } from '@/lib/api/types';
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
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { 
  Search, 
  UserCog, 
  Download, 
  CheckCircle, 
  XCircle, 
  Users, 
  User as UserIcon 
} from 'lucide-react';

const AdminUsers: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newAdminStatus, setNewAdminStatus] = useState(false);
  
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
    
    const loadUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        toast({
          title: 'Error',
          description: 'Failed to load users data.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAccess();
    loadUsers();
  }, [user, navigate, toast]);
  
  // Apply filters whenever search query or role filter changes
  useEffect(() => {
    let result = [...users];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setNewAdminStatus(user.is_admin || false);
    setShowEditDialog(true);
  };
  
  const handleSaveUserChanges = async () => {
    if (!selectedUser) return;
    
    try {
      // Update role if changed
      if (newRole !== selectedUser.role) {
        await updateUserRole(selectedUser.id, newRole);
        
        // Log admin action
        await logAdminAction(
          user?.id || '',
          'update_user_role',
          'profiles',
          selectedUser.id,
          { old_role: selectedUser.role, new_role: newRole } as Json
        );
      }
      
      // Update admin status if changed
      if (newAdminStatus !== selectedUser.is_admin) {
        await setUserAsAdmin(selectedUser.id, newAdminStatus);
        
        // Log admin action
        await logAdminAction(
          user?.id || '',
          newAdminStatus ? 'grant_admin_access' : 'revoke_admin_access',
          'profiles',
          selectedUser.id,
          { email: selectedUser.email } as Json
        );
      }
      
      // Refresh users list
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      
      toast({
        title: 'User Updated',
        description: `User ${selectedUser.name} has been updated successfully.`
      });
      
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update user. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  const handleExportCsv = () => {
    // Prepare CSV data
    const headers = ['ID', 'Name', 'Email', 'Role', 'Admin', 'Contact Number', 'Sign Up Date'];
    
    const csvData = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.is_admin ? 'Yes' : 'No',
      user.contact_number || 'N/A',
      format(new Date(user.signup_date), 'yyyy-MM-dd HH:mm:ss')
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
    link.setAttribute('download', `dinevibeusers_${format(new Date(), 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Count users by role
  const customerCount = users.filter(user => user.role === 'user').length;
  const ownerCount = users.filter(user => user.role === 'owner').length;
  const adminCount = users.filter(user => user.is_admin).length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-gray-500">Manage and monitor users on the platform</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 sm:mt-0"
              onClick={handleExportCsv}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Users CSV
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <h3 className="text-2xl font-bold">{users.length}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customers</p>
                    <h3 className="text-2xl font-bold">{customerCount}</h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserIcon className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Restaurant Owners</p>
                    <h3 className="text-2xl font-bold">{ownerCount}</h3>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <UserCog className="h-5 w-5 text-yellow-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
                    <h3 className="text-2xl font-bold">{adminCount}</h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <UserCog className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Users List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Customers</SelectItem>
                    <SelectItem value="owner">Restaurant Owners</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isLoading ? (
                <div className="py-8 text-center">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-primary rounded-full" aria-hidden="true"></div>
                  <p className="mt-2">Loading users...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No users found matching your filters</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Signed Up</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'owner' ? 'outline' : 'secondary'}>
                              {user.role === 'user' ? 'Customer' : 
                               user.role === 'owner' ? 'Restaurant Owner' : 
                               'Admin'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.is_admin ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-300" />
                            )}
                          </TableCell>
                          <TableCell>{format(new Date(user.signup_date), 'PP')}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
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
      </main>
      
      <Footer />
      
      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user account settings.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={selectedUser.name} 
                  disabled 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={selectedUser.email} 
                  disabled 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Customer</SelectItem>
                    <SelectItem value="owner">Restaurant Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="adminStatus"
                  checked={newAdminStatus}
                  onChange={(e) => setNewAdminStatus(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="adminStatus">Grant admin privileges</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveUserChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
