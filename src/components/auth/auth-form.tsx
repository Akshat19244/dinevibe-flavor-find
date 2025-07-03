import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building2, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Calendar,
  Users,
  ArrowRight
} from 'lucide-react';

interface AuthFormProps {
  defaultTab?: 'login' | 'signup';
  onEmailLogin?: (data: { email: string, password: string }) => Promise<void>;
  onEmailSignup?: (data: { 
    email: string, 
    password: string, 
    name?: string, 
    userType?: string,
    adminCode?: string
  }) => Promise<void>;
  onGoogleLogin?: () => Promise<void>;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  defaultTab = 'login',
  onEmailLogin,
  onEmailSignup,
  onGoogleLogin,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    adminCode: '',
  });
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onEmailLogin) {
      await onEmailLogin(loginData);
    } else {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Login with:', loginData);
        
        toast({
          title: "Welcome back!",
          description: "Login successful. Redirecting to your dashboard...",
        });
        
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
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (signupData.userType === 'admin' && !signupData.adminCode) {
      toast({
        title: "Admin code required",
        description: "Please enter your admin registration code.",
        variant: "destructive",
      });
      return;
    }
    
    if (onEmailSignup) {
      await onEmailSignup({
        email: signupData.email,
        password: signupData.password,
        name: signupData.name,
        userType: signupData.userType,
        adminCode: signupData.adminCode,
      });
    } else {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Signup with:', signupData);
        
        toast({
          title: "Account created successfully!",
          description: "Welcome to the future of event planning.",
        });
        
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
    }
  };
  
  const [localIsLoading, setIsLoading] = useState(false);
  const effectiveIsLoading = isLoading || localIsLoading;

  const userTypes = [
    {
      value: 'customer',
      label: 'Customer',
      icon: User,
      description: 'Find and book amazing events',
      color: 'bg-blue-500 hover:bg-blue-600 border-blue-200',
      badge: 'Plan Events'
    },
    {
      value: 'owner',
      label: 'Venue Owner',
      icon: Building2,
      description: 'Manage venues and bookings',
      color: 'bg-green-500 hover:bg-green-600 border-green-200',
      badge: 'Provide Events'
    },
    {
      value: 'admin',
      label: 'Admin',
      icon: Shield,
      description: 'Platform administration',
      color: 'bg-purple-500 hover:bg-purple-600 border-purple-200',
      badge: 'Manage Platform'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventHub
            </h1>
          </div>
          <p className="text-lg text-slate-600 font-medium">Plan or Provide - One Place for All Your Events</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>50,000+ Users</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>10,000+ Events</span>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
            <TabsList className="grid grid-cols-2 w-full h-14 p-1 bg-slate-100 rounded-xl">
              <TabsTrigger 
                value="login" 
                className="h-12 rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Welcome Back
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="h-12 rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Join Us
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-800">Sign In</CardTitle>
                <CardDescription className="text-slate-600">
                  Continue your event planning journey
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleLoginSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="login-password" className="text-sm font-semibold text-slate-700">Password</Label>
                      <Link to="/auth/reset-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-11 pr-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4 pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
                    disabled={effectiveIsLoading}
                  >
                    {effectiveIsLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                  
                  {onGoogleLogin && (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-sm text-slate-500 font-medium">OR</span>
                        <div className="flex-1 h-px bg-slate-200" />
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full h-12 border-slate-200 hover:bg-slate-50 font-semibold rounded-xl transition-all duration-200" 
                        onClick={onGoogleLogin}
                        disabled={effectiveIsLoading}
                      >
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </>
                  )}
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="mt-6">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-800">Create Account</CardTitle>
                <CardDescription className="text-slate-600">
                  Join thousands planning amazing events
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSignupSubmit}>
                <CardContent className="space-y-6">
                  {/* User Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Choose Your Role</Label>
                    <div className="grid gap-3">
                      {userTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = signupData.userType === type.value;
                        
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setSignupData({ ...signupData, userType: type.value })}
                            className={`
                              relative p-4 rounded-xl border-2 transition-all duration-200 text-left
                              ${isSelected 
                                ? `${type.color} text-white shadow-lg transform scale-[1.02]` 
                                : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                    {type.label}
                                  </span>
                                  <Badge 
                                    variant={isSelected ? "secondary" : "outline"}
                                    className={`text-xs ${isSelected ? 'bg-white/20 text-white border-white/30' : ''}`}
                                  >
                                    {type.badge}
                                  </Badge>
                                </div>
                                <p className={`text-sm mt-1 ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                                  {type.description}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm font-semibold text-slate-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="signup-name" 
                        placeholder="John Doe" 
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-semibold text-slate-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-11 pr-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-sm font-semibold text-slate-700">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input 
                        id="signup-confirm-password" 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••" 
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="pl-11 pr-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  {signupData.userType === 'admin' && (
                    <div className="space-y-2">
                      <Label htmlFor="admin-code" className="text-sm font-semibold text-slate-700">Admin Registration Code</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input 
                          id="admin-code" 
                          type="password" 
                          placeholder="Enter admin code" 
                          value={signupData.adminCode}
                          onChange={(e) => setSignupData({ ...signupData, adminCode: e.target.value })}
                          className="pl-11 h-12 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-6">
                  <Button 
                    type="submit" 
                    className={`
                      w-full h-12 text-white font-semibold rounded-xl shadow-lg transition-all duration-200
                      ${signupData.userType === 'customer' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                        : signupData.userType === 'owner'
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                      }
                    `}
                    disabled={effectiveIsLoading}
                  >
                    {effectiveIsLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="px-8 pb-6 text-center text-sm">
            <span className="text-slate-600">
              {activeTab === 'login' ? "New to EventHub? " : "Already have an account? "}
            </span>
            <button
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
            >
              {activeTab === 'login' ? "Create Account" : "Sign In"}
            </button>
          </div>
        </Card>
        
        <div className="text-center mt-6 text-sm text-slate-500">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;