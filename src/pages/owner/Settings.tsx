
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimePicker } from '@/components/ui/time-picker';
import { getRestaurantsByOwner } from '@/lib/api/restaurants';
import { useToast } from '@/components/ui/use-toast';
import { Restaurant } from '@/lib/api/types';
import { Badge } from '@/components/ui/badge';
import { Clock, Map, Users, Calendar, Settings as SettingsIcon, Building, Phone } from 'lucide-react';

const OwnerSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Restaurant settings
  const [restaurantSettings, setRestaurantSettings] = useState({
    openingTime: '09:00',
    closingTime: '22:00',
    acceptReservations: true,
    autoConfirmBookings: false,
    notifyOnBooking: true,
    minimumNotice: '2',
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptOnlinePayments: false,
    requireDeposit: false,
    depositAmount: '10',
    depositPercentage: true,
    cancellationFee: false,
    cancellationAmount: '5',
  });

  useEffect(() => {
    // Fetch user restaurants and profile data
    const fetchRestaurants = async () => {
      if (user) {
        try {
          const restaurantData = await getRestaurantsByOwner(user.id);
          setRestaurants(restaurantData);
          
          // Set profile data if we have a user
          if (user.user_metadata) {
            setProfileData({
              name: user.user_metadata.name || '',
              email: user.email || '',
              phone: user.user_metadata.phone || '',
              address: user.user_metadata.address || '',
            });
          }
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load your restaurant data. Please try again later.',
            variant: 'destructive',
          });
        }
      }
      setLoading(false);
    };

    fetchRestaurants();
  }, [user, toast]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleRestaurantSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update restaurant settings
    toast({
      title: "Settings Updated",
      description: "Your restaurant settings have been saved successfully.",
    });
  };

  const handlePaymentSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update payment settings
    toast({
      title: "Payment Settings Updated",
      description: "Your payment settings have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="owner" userName={user?.user_metadata?.name || 'Restaurant Owner'} />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Restaurant Settings</h1>
            <p className="text-white text-opacity-90">
              Manage your restaurant profile and account settings
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-10">
              <p>Loading your settings...</p>
            </div>
          ) : (
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[600px] mx-auto">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="restaurant">
                  <Building className="h-4 w-4 mr-2" />
                  Restaurant
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab Content */}
              <TabsContent value="profile">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            disabled
                          />
                          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Restaurant Tab Content */}
              <TabsContent value="restaurant">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Restaurant Settings</CardTitle>
                    <CardDescription>
                      Configure your restaurant's availability and booking policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {restaurants.length > 0 ? (
                      <form onSubmit={handleRestaurantSettingsSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 space-y-2">
                              <Label htmlFor="openingTime">Opening Time</Label>
                              <TimePicker
                                value={restaurantSettings.openingTime}
                                onChange={(time) => setRestaurantSettings({ ...restaurantSettings, openingTime: time })}
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <Label htmlFor="closingTime">Closing Time</Label>
                              <TimePicker
                                value={restaurantSettings.closingTime}
                                onChange={(time) => setRestaurantSettings({ ...restaurantSettings, closingTime: time })}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Accept Reservations</p>
                              <p className="text-sm text-gray-500">Allow customers to book tables at your restaurant</p>
                            </div>
                            <Switch 
                              checked={restaurantSettings.acceptReservations} 
                              onCheckedChange={(checked) => setRestaurantSettings({
                                ...restaurantSettings,
                                acceptReservations: checked
                              })}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Auto-Confirm Bookings</p>
                              <p className="text-sm text-gray-500">Automatically confirm new bookings without manual review</p>
                            </div>
                            <Switch 
                              checked={restaurantSettings.autoConfirmBookings} 
                              onCheckedChange={(checked) => setRestaurantSettings({
                                ...restaurantSettings,
                                autoConfirmBookings: checked
                              })}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Notify on New Booking</p>
                              <p className="text-sm text-gray-500">Receive email notifications for new bookings</p>
                            </div>
                            <Switch 
                              checked={restaurantSettings.notifyOnBooking} 
                              onCheckedChange={(checked) => setRestaurantSettings({
                                ...restaurantSettings,
                                notifyOnBooking: checked
                              })}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="minimumNotice">Minimum Notice (hours)</Label>
                            <Input 
                              id="minimumNotice" 
                              type="number"
                              value={restaurantSettings.minimumNotice}
                              onChange={(e) => setRestaurantSettings({ ...restaurantSettings, minimumNotice: e.target.value })}
                              min="0"
                              max="72"
                            />
                            <p className="text-xs text-gray-500">Minimum hours in advance for booking a table</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                            Save Settings
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-6">
                        <p className="mb-4">You don't have any registered restaurants yet.</p>
                        <Button asChild className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          <Link to="/owner/register-restaurant">Register Your Restaurant</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Payments Tab Content */}
              <TabsContent value="payments">
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>
                      Configure your restaurant's payment and cancellation policies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {restaurants.length > 0 ? (
                      <form onSubmit={handlePaymentSettingsSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Accept Online Payments</p>
                              <p className="text-sm text-gray-500">Allow customers to pay for bookings online</p>
                            </div>
                            <Switch 
                              checked={paymentSettings.acceptOnlinePayments} 
                              onCheckedChange={(checked) => setPaymentSettings({
                                ...paymentSettings,
                                acceptOnlinePayments: checked
                              })}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Require Deposit</p>
                              <p className="text-sm text-gray-500">Require a deposit to secure bookings</p>
                            </div>
                            <Switch 
                              checked={paymentSettings.requireDeposit} 
                              onCheckedChange={(checked) => setPaymentSettings({
                                ...paymentSettings,
                                requireDeposit: checked
                              })}
                            />
                          </div>
                          
                          {paymentSettings.requireDeposit && (
                            <div className="space-y-2 border-b pb-4">
                              <Label htmlFor="depositAmount">Deposit Amount</Label>
                              <div className="flex items-center gap-4">
                                <Input 
                                  id="depositAmount" 
                                  type="number"
                                  value={paymentSettings.depositAmount}
                                  onChange={(e) => setPaymentSettings({ ...paymentSettings, depositAmount: e.target.value })}
                                  className="max-w-[100px]"
                                  min="1"
                                />
                                <div className="flex items-center space-x-2">
                                  <Switch 
                                    id="depositPercentage"
                                    checked={paymentSettings.depositPercentage} 
                                    onCheckedChange={(checked) => setPaymentSettings({
                                      ...paymentSettings,
                                      depositPercentage: checked
                                    })}
                                  />
                                  <Label htmlFor="depositPercentage">As percentage</Label>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {paymentSettings.depositPercentage ? 
                                  `${paymentSettings.depositAmount}% of the total bill` : 
                                  `$${paymentSettings.depositAmount} flat amount`}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between border-b pb-4">
                            <div>
                              <p className="font-medium">Cancellation Fee</p>
                              <p className="text-sm text-gray-500">Charge a fee for late cancellations</p>
                            </div>
                            <Switch 
                              checked={paymentSettings.cancellationFee} 
                              onCheckedChange={(checked) => setPaymentSettings({
                                ...paymentSettings,
                                cancellationFee: checked
                              })}
                            />
                          </div>
                          
                          {paymentSettings.cancellationFee && (
                            <div className="space-y-2">
                              <Label htmlFor="cancellationAmount">Cancellation Fee Amount ($)</Label>
                              <Input 
                                id="cancellationAmount" 
                                type="number"
                                value={paymentSettings.cancellationAmount}
                                onChange={(e) => setPaymentSettings({ ...paymentSettings, cancellationAmount: e.target.value })}
                                className="max-w-[200px]"
                                min="0"
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                            Save Payment Settings
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-6">
                        <p className="mb-4">You don't have any registered restaurants yet.</p>
                        <Button asChild className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          <Link to="/owner/register-restaurant">Register Your Restaurant</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerSettings;
