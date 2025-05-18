
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserProfile, updateUserRole, setUserAsAdmin } from '@/lib/api/users';
import { logAdminAction } from '@/lib/api/admin';
import { 
  getAdminRegistrationCode, 
  updateAdminRegistrationCode, 
  isInitialAdminSetupComplete 
} from '@/lib/api/admin-settings';
import { AlertCircle, LogIn, UserPlus, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminAuth: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialSetup, setIsInitialSetup] = useState<boolean>(false);
  
  // Login states
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  
  // Registration states
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [regName, setRegName] = useState<string>('');
  const [regAdminCode, setRegAdminCode] = useState<string>('');
  
  // Check if this is initial setup or regular login
  useEffect(() => {
    const checkAdminSetup = async () => {
      try {
        const isSetupComplete = await isInitialAdminSetupComplete();
        setIsInitialSetup(!isSetupComplete);
        
        // If initial setup, automatically switch to register tab
        if (!isSetupComplete) {
          setActiveTab('register');
        }
      } catch (error) {
        console.error('Error checking admin setup:', error);
      }
    };
    
    checkAdminSetup();
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) throw error;
      
      // Check if the user is an admin
      const profile = await getUserProfile(data.user.id);
      
      if (!profile.is_admin) {
        await supabase.auth.signOut();
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive'
        });
        return;
      }
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back to the admin panel.',
      });
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
      
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Failed to login. Please check your credentials.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (regPassword !== regConfirmPassword) {
        toast({
          title: 'Registration Failed',
          description: 'Passwords do not match.',
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }
      
      if (!isInitialSetup) {
        // Verify admin code if not initial setup
        const storedCode = await getAdminRegistrationCode();
        
        if (regAdminCode !== storedCode) {
          toast({
            title: 'Registration Failed',
            description: 'Invalid admin registration code.',
            variant: 'destructive'
          });
          setIsLoading(false);
          return;
        }
      }
      
      // Create user
      const { data, error } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            name: regName,
          }
        }
      });
      
      if (error) throw error;
      
      // Update user role and admin status
      if (data.user) {
        await updateUserRole(data.user.id, 'admin');
        await setUserAsAdmin(data.user.id, true);
        
        // During initial setup, set a default admin registration code
        if (isInitialSetup) {
          const defaultCode = 'DINEVIBE-ADMIN-2025';
          await updateAdminRegistrationCode(defaultCode);
          
          toast({
            title: 'Initial Admin Setup Complete',
            description: `Default admin registration code set to: ${defaultCode}. Keep this code secure and change it after logging in.`,
          });
        }
        
        // Log admin creation
        const currentUser = await supabase.auth.getUser();
        if (currentUser.data.user) {
          await logAdminAction(
            'create_admin_account',
            'profiles',
            data.user.id,
            { created_by: currentUser.data.user.id, admin_email: regEmail }
          );
        }
      }
      
      toast({
        title: 'Registration Successful',
        description: 'Admin account created successfully. You can now login.',
      });
      
      // Switch to login tab
      setActiveTab('login');
      
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Failed to create admin account.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="admin" userName="Admin" />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-4 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex justify-center items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              DineVibe Admin Access
            </CardTitle>
            <CardDescription>
              {isInitialSetup 
                ? 'Initial Admin Setup - Register Two Permanent Admins'
                : activeTab === 'login' 
                  ? 'Login to access the administrator dashboard'
                  : 'Create a new administrator account'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isInitialSetup && (
              <Alert className="mb-6 bg-yellow-50 text-yellow-800 border-yellow-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Initial setup mode: You can register up to 2 permanent admins without a registration code.
                </AlertDescription>
              </Alert>
            )}

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login as Administrator
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input
                      id="reg-name"
                      placeholder="John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                    <Input
                      id="reg-confirm-password"
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {!isInitialSetup && (
                    <div className="space-y-2">
                      <Label htmlFor="reg-admin-code">Admin Registration Code</Label>
                      <Input
                        id="reg-admin-code"
                        type="password"
                        placeholder="Enter admin authorization code"
                        value={regAdminCode}
                        onChange={(e) => setRegAdminCode(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                        Creating account...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register Administrator
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminAuth;
