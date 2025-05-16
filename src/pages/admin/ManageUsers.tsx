
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  UserPlus, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  CheckCircle, 
  XCircle, 
  MoreHorizontal, 
  Edit, 
  Ban, 
  Star 
} from 'lucide-react';

// Sample user data
const usersData = {
  customers: [
    {
      id: 'c1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      joined: new Date('2025-01-15'),
      status: 'active',
      bookings: 8,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 'c2',
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      phone: '+1 (555) 234-5678',
      joined: new Date('2025-02-10'),
      status: 'active',
      bookings: 5,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'c3',
      name: 'Michael Williams',
      email: 'mwilliams@example.com',
      phone: '+1 (555) 345-6789',
      joined: new Date('2025-03-05'),
      status: 'suspended',
      bookings: 3,
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  ],
  owners: [
    {
      id: 'o1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 456-7890',
      joined: new Date('2025-01-10'),
      status: 'verified',
      restaurant: 'The Gourmet Kitchen',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    {
      id: 'o2',
      name: 'Robert Davis',
      email: 'rdavis@example.com',
      phone: '+1 (555) 567-8901',
      joined: new Date('2025-02-05'),
      status: 'pending',
      restaurant: 'Ocean Blue Seafood',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    {
      id: 'o3',
      name: 'Jessica Martinez',
      email: 'jmartinez@example.com',
      phone: '+1 (555) 678-9012',
      joined: new Date('2025-03-20'),
      status: 'verified',
      restaurant: 'Casa Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/37.jpg'
    }
  ]
};

const ManageUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Filter users based on search and status
  const filterUsers = (usersList: any[]) => {
    return usersList.filter(user => {
      // Filter by search query
      const searchMatches = !searchQuery || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (activeTab === 'owners' && user.restaurant && 
         user.restaurant.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by status
      const statusMatches = statusFilter === 'all' || user.status === statusFilter;
      
      return searchMatches && statusMatches;
    });
  };
  
  const filteredCustomers = filterUsers(usersData.customers);
  const filteredOwners = filterUsers(usersData.owners);
  
  // View user details
  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };
  
  // Get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'verified':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
            <p className="text-white text-opacity-90">
              Administer users and restaurant owners
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="customers" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <TabsList>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="owners">Restaurant Owners</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input 
                    placeholder={activeTab === 'customers' ? "Search users..." : "Search owners or restaurants..."}
                    className="pl-9 w-full md:w-[250px] h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {activeTab === 'customers' ? (
                      <>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90 h-9">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add {activeTab === 'customers' ? 'User' : 'Owner'}
                </Button>
              </div>
            </div>
            
            <TabsContent value="customers" className="mt-0">
              {filteredCustomers.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                          <tr>
                            <th className="px-6 py-3 text-left">User</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left hidden md:table-cell">Phone</th>
                            <th className="px-6 py-3 text-left hidden lg:table-cell">Joined</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center hidden sm:table-cell">Bookings</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredCustomers.map((user) => (
                            <tr 
                              key={user.id} 
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => viewUserDetails(user)}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                                    <img 
                                      src={user.avatar} 
                                      alt={user.name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  </div>
                                  <div className="font-medium">{user.name}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                  {user.email}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                                {user.phone}
                              </td>
                              <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                                {formatDate(user.joined)}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <Badge className={getStatusBadgeStyle(user.status)}>
                                  {user.status === 'active' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <XCircle className="h-3 w-3 mr-1" />
                                  )}
                                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-center hidden sm:table-cell">
                                {user.bookings}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    viewUserDetails(user);
                                  }}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No customers found</h2>
                  <p className="text-gray-600 mb-2">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Try adjusting your search filters' 
                      : 'No customers have registered yet'}
                  </p>
                  {(searchQuery || statusFilter !== 'all') && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="owners" className="mt-0">
              {filteredOwners.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                          <tr>
                            <th className="px-6 py-3 text-left">Owner</th>
                            <th className="px-6 py-3 text-left hidden lg:table-cell">Restaurant</th>
                            <th className="px-6 py-3 text-left">Contact</th>
                            <th className="px-6 py-3 text-left hidden lg:table-cell">Joined</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {filteredOwners.map((owner) => (
                            <tr 
                              key={owner.id} 
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => viewUserDetails(owner)}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                                    <img 
                                      src={owner.avatar} 
                                      alt={owner.name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  </div>
                                  <div className="font-medium">{owner.name}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                                {owner.restaurant}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                    {owner.email}
                                  </div>
                                  <div className="flex items-center text-gray-600 mt-1">
                                    <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                    {owner.phone}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">
                                {formatDate(owner.joined)}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <Badge className={getStatusBadgeStyle(owner.status)}>
                                  {owner.status === 'verified' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Shield className="h-3 w-3 mr-1" />
                                  )}
                                  {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end space-x-1">
                                  {owner.status === 'pending' && (
                                    <Button 
                                      variant="outline"
                                      size="sm"
                                      className="hidden sm:flex items-center text-blue-600 border-blue-200 hover:bg-blue-50"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('Verify owner');
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Verify
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      viewUserDetails(owner);
                                    }}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-semibold mb-4">No restaurant owners found</h2>
                  <p className="text-gray-600 mb-2">
                    {searchQuery || statusFilter !== 'all' 
                      ? 'Try adjusting your search filters' 
                      : 'No restaurant owners have registered yet'}
                  </p>
                  {(searchQuery || statusFilter !== 'all') && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-500" />
                  User Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Customers</div>
                    <div className="text-2xl font-bold">{usersData.customers.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Restaurant Owners</div>
                    <div className="text-2xl font-bold">{usersData.owners.length}</div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm text-gray-500">New This Month</div>
                    <div className="text-xl font-bold">8</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Verified Owners</div>
                      <div className="text-sm font-medium">
                        {usersData.owners.filter(o => o.status === 'verified').length} of {usersData.owners.length}
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{
                        width: `${(usersData.owners.filter(o => o.status === 'verified').length / usersData.owners.length) * 100}%`
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-500">Pending Verification</div>
                      <div className="text-sm font-medium">
                        {usersData.owners.filter(o => o.status === 'pending').length} of {usersData.owners.length}
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-2">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{
                        width: `${(usersData.owners.filter(o => o.status === 'pending').length / usersData.owners.length) * 100}%`
                      }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-amber-500" />
                  Top Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {usersData.customers
                    .sort((a, b) => b.bookings - a.bookings)
                    .slice(0, 3)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 mr-2">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="rounded-full h-8 w-8 object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.bookings} bookings</div>
                          </div>
                        </div>
                        <div className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          #{index + 1}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-20 w-20">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name}
                    className="h-20 w-20 rounded-full object-cover border-4 border-white shadow"
                  />
                </div>
                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                <Badge className={getStatusBadgeStyle(selectedUser.status)}>
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{formatDate(selectedUser.joined)}</p>
                  </div>
                </div>
                
                {selectedUser.restaurant && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Restaurant</p>
                      <p className="font-medium">{selectedUser.restaurant}</p>
                    </div>
                  </div>
                )}
                
                {selectedUser.bookings !== undefined && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                      <p className="font-medium">{selectedUser.bookings}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                
                {selectedUser.status === 'active' || selectedUser.status === 'verified' ? (
                  <Button variant="destructive" className="flex items-center">
                    <Ban className="h-4 w-4 mr-2" />
                    {selectedUser.status === 'active' ? 'Suspend User' : 'Revoke Verification'}
                  </Button>
                ) : (
                  <Button variant="default" className="flex items-center bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {selectedUser.status === 'suspended' ? 'Reactivate User' : 'Verify Owner'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ManageUsers;
