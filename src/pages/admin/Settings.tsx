
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAdminRegistrationCode, updateAdminRegistrationCode } from '@/lib/api/admin-settings';
import { logAdminAction } from '@/lib/api/admin';
import { Shield, RefreshCw, Save, EyeOff, Eye } from 'lucide-react';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [newRegistrationCode, setNewRegistrationCode] = useState('');
  const [confirmNewCode, setConfirmNewCode] = useState('');
  const [showCurrentCode, setShowCurrentCode] = useState(false);
  
  // Load current admin registration code
  useEffect(() => {
    const loadRegistrationCode = async () => {
      try {
        const code = await getAdminRegistrationCode();
        setRegistrationCode(code || '');
      } catch (error) {
        console.error('Error loading registration code:', error);
        toast({
          title: 'Error',
          description: 'Failed to load admin registration code.',
          variant: 'destructive'
        });
      }
    };
    
    loadRegistrationCode();
  }, [toast]);
  
  // Generate a random code
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'DINEVIBE-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewRegistrationCode(result);
    setConfirmNewCode(result);
  };
  
  // Update admin registration code
  const handleUpdateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newRegistrationCode !== confirmNewCode) {
      toast({
        title: 'Error',
        description: 'New code and confirmation do not match.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await updateAdminRegistrationCode(newRegistrationCode);
      
      // Log the action
      await logAdminAction(
        'update_admin_registration_code',
        'admin_settings',
        undefined,
        { old_code_length: registrationCode.length }
      );
      
      toast({
        title: 'Success',
        description: 'Admin registration code has been updated.',
      });
      
      // Update the current code
      setRegistrationCode(newRegistrationCode);
      setNewRegistrationCode('');
      setConfirmNewCode('');
    } catch (error) {
      console.error('Error updating registration code:', error);
      toast({
        title: 'Error',
        description: 'Failed to update admin registration code.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        </div>

        <Tabs defaultValue="security" className="max-w-3xl">
          <TabsList>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Registration Security
                </CardTitle>
                <CardDescription>
                  Manage the registration code that new administrators need to provide when registering
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Current Registration Code */}
                <div className="space-y-2">
                  <Label htmlFor="current-code">Current Registration Code</Label>
                  <div className="flex">
                    <Input
                      id="current-code"
                      type={showCurrentCode ? "text" : "password"}
                      value={registrationCode}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowCurrentCode(!showCurrentCode)}
                      className="ml-2"
                    >
                      {showCurrentCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is the code that new admin users need to enter during registration
                  </p>
                </div>
                
                {/* Update Registration Code Form */}
                <form onSubmit={handleUpdateCode} className="space-y-4 border-t pt-4">
                  <h3 className="font-medium">Update Registration Code</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-code">New Registration Code</Label>
                    <div className="flex">
                      <Input
                        id="new-code"
                        type="text"
                        value={newRegistrationCode}
                        onChange={(e) => setNewRegistrationCode(e.target.value)}
                        required
                        className="font-mono"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateRandomCode}
                        className="ml-2 whitespace-nowrap"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-code">Confirm New Code</Label>
                    <Input
                      id="confirm-code"
                      type="text"
                      value={confirmNewCode}
                      onChange={(e) => setConfirmNewCode(e.target.value)}
                      required
                      className="font-mono"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading || !newRegistrationCode}
                    className="mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Registration Code
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Keep this code secure. Only share it with users who should have admin access.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general platform settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  General settings will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced platform settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced settings will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
