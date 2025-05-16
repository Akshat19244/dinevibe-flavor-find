
import React, { useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Bell, Key, CreditCard, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UserSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    bio: 'Food enthusiast and restaurant explorer.',
  });
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    newRestaurantAlerts: true,
    dealAlerts: true,
    bookingReminders: true,
  });
  
  // API key settings state
  const [apiKeys, setApiKeys] = useState({
    geminiKey: '',
    googleMapsKey: '',
    stripePublicKey: '',
    stripeSecretKey: '',
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend API
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would validate the current password and update with the new one
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  // Handle saving API keys
  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would securely store the API keys
    toast({
      title: "API keys saved",
      description: "Your API keys have been saved securely.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="customer" userName="John" />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-white text-opacity-90">
              Manage your profile, notifications, and security
            </p>
          </div>
        </div>
        
        {/* Settings tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px] mx-auto">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="api-keys">
                <Key className="h-4 w-4 mr-2" />
                API Keys
              </TabsTrigger>
            </TabsList>
            
            {/* Profile tab content */}
            <TabsContent value="profile">
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and personal information
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
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                        />
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                      />
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
            
            {/* Security tab content */}
            <TabsContent value="security">
              <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Ensure your account is using a secure password
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your saved payment methods
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between p-4 border rounded-md mb-4">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-dineVibe-primary" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage your account status
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out of All Devices
                    </Button>
                    
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Notifications tab content */}
            <TabsContent value="notifications">
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.pushNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            pushNotifications: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pb-4">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.smsNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications: checked
                          })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-gray-500">Receive emails about promotions and offers</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.promotionalEmails} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            promotionalEmails: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">New Restaurant Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when new restaurants join DineVibe</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.newRestaurantAlerts} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            newRestaurantAlerts: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Deal Alerts</p>
                          <p className="text-sm text-gray-500">Get notified about new deals and offers</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.dealAlerts} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            dealAlerts: checked
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between pb-4">
                        <div>
                          <p className="font-medium">Booking Reminders</p>
                          <p className="text-sm text-gray-500">Get reminded about your upcoming bookings</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.bookingReminders} 
                          onCheckedChange={(checked) => setNotificationSettings({
                            ...notificationSettings,
                            bookingReminders: checked
                          })}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* API Keys tab content */}
            <TabsContent value="api-keys">
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for third-party integrations
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSaveApiKeys} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="gemini-key">Gemini AI API Key</Label>
                        <Input 
                          id="gemini-key" 
                          value={apiKeys.geminiKey}
                          onChange={(e) => setApiKeys({ ...apiKeys, geminiKey: e.target.value })}
                          placeholder="Enter your Gemini API key for AI recommendations"
                        />
                        <p className="text-xs text-gray-500">Used for personalized restaurant and dish recommendations</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maps-key">Google Maps API Key</Label>
                        <Input 
                          id="maps-key" 
                          value={apiKeys.googleMapsKey}
                          onChange={(e) => setApiKeys({ ...apiKeys, googleMapsKey: e.target.value })}
                          placeholder="Enter your Google Maps API key for location services"
                        />
                        <p className="text-xs text-gray-500">Used for mapping and distance calculations</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stripe-public">Stripe Public Key</Label>
                        <Input 
                          id="stripe-public" 
                          value={apiKeys.stripePublicKey}
                          onChange={(e) => setApiKeys({ ...apiKeys, stripePublicKey: e.target.value })}
                          placeholder="Enter your Stripe public key for payment processing"
                        />
                        <p className="text-xs text-gray-500">Required for payment processing</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                        <Input 
                          id="stripe-secret" 
                          type="password"
                          value={apiKeys.stripeSecretKey}
                          onChange={(e) => setApiKeys({ ...apiKeys, stripeSecretKey: e.target.value })}
                          placeholder="Enter your Stripe secret key"
                        />
                        <p className="text-xs text-gray-500 font-medium">Note: Secret keys should be stored securely on the server side</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-dineVibe-primary hover:bg-dineVibe-primary/90">
                        Save API Keys
                      </Button>
                    </div>
                  </form>
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

export default UserSettings;
