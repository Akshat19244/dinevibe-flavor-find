
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface AuthFormProps {
  defaultTab?: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ defaultTab = 'login' }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  
  // Form states
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
  });
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login with:', loginData);
      
      toast({
        title: "Login successful!",
        description: "Welcome back to DineVibe.",
      });
      
      // Redirect based on user type - in real app, this would come from auth response
      navigate('/user/discovery');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validation
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error("Passwords don't match");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Signup with:', signupData);
      
      toast({
        title: "Account created!",
        description: "Welcome to DineVibe. Your account has been created successfully.",
      });
      
      // Redirect based on user type
      if (signupData.userType === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/discovery');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            <span className="bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent bg-clip-text text-transparent">
              DineVibe
            </span>
          </CardTitle>
          <CardDescription>Find Your Flavor, Feel Your Vibe</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="login-password">Password</Label>
                    <Link to="/auth/reset-password" className="text-xs text-dineVibe-primary hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button type="submit" className="w-full bg-dineVibe-primary hover:bg-dineVibe-primary/90" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="John Doe" 
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input 
                    id="signup-confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <Button 
                      type="button"
                      variant={signupData.userType === 'customer' ? 'default' : 'outline'}
                      className={signupData.userType === 'customer' ? 'bg-dineVibe-primary' : ''}
                      onClick={() => setSignupData({ ...signupData, userType: 'customer' })}
                    >
                      Customer
                    </Button>
                    <Button 
                      type="button"
                      variant={signupData.userType === 'owner' ? 'default' : 'outline'}
                      className={signupData.userType === 'owner' ? 'bg-dineVibe-accent' : ''}
                      onClick={() => setSignupData({ ...signupData, userType: 'owner' })}
                    >
                      Restaurant Owner
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className={`w-full ${signupData.userType === 'owner' ? 'bg-dineVibe-accent hover:bg-dineVibe-accent/90' : 'bg-dineVibe-primary hover:bg-dineVibe-primary/90'}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="px-8 pb-6 text-center text-sm">
          <span className="text-gray-600">
            {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            className="text-dineVibe-primary hover:underline font-medium"
            onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
          >
            {activeTab === 'login' ? "Sign Up" : "Login"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
