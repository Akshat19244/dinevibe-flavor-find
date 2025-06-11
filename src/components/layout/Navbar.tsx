
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  User,
  LogOut,
  Calendar,
  Search,
  Users,
  Building,
  BarChart,
  ChevronDown,
  Bell,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [notifications] = useState([]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserDashboardLink = () => {
    if (!user) return '/auth/login';
    
    const userType = user.user_metadata?.userType || 'customer';
    switch (userType) {
      case 'admin':
        return '/admin/dashboard';
      case 'business_owner':
        return '/owner/dashboard';
      default:
        return '/user/dashboard';
    }
  };

  return (
    <nav className="bg-[#0C0C0C] border-b border-[#2F2F2F] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center">
              <span className="text-[#FFF5E1] font-bold text-lg">DV</span>
            </div>
            <span className="text-2xl font-bold text-[#FFF5E1]">DineVibe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/discovery" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              Discovery
            </Link>
            <Link to="/dining" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              Dining
            </Link>
            <Link to="/events" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              Events
            </Link>
            <Link to="/ai-assistant" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              AI Assistant
            </Link>
            <Link to="/3d-preview" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              3D Preview
            </Link>
            <Link to="/partner-with-us" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
              Partner With Us
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="text-[#FFF5E1]">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 rounded-full bg-[#8B0000] text-[#FFF5E1] text-xs px-1">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-[#FFF5E1]">
                      <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center">
                        <span className="text-[#FFF5E1] text-sm font-medium">
                          {user.user_metadata?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="hidden md:block">{user.user_metadata?.name || 'User'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#FFF5E1] border-[#2F2F2F]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getUserDashboardLink())}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/user/my-bookings')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/discovery')}>
                      <Search className="mr-2 h-4 w-4" />
                      Discovery
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth/login')}
                  className="text-[#FFF5E1] hover:text-[#D4AF37]"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth/signup')}
                  className="bg-[#8B0000] hover:bg-[#660000] text-[#FFF5E1]"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[#FFF5E1]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#0C0C0C] border-[#2F2F2F]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/discovery" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    Discovery
                  </Link>
                  <Link to="/dining" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    Dining
                  </Link>
                  <Link to="/events" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    Events
                  </Link>
                  <Link to="/ai-assistant" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    AI Assistant
                  </Link>
                  <Link to="/3d-preview" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    3D Preview
                  </Link>
                  <Link to="/partner-with-us" className="text-[#FFF5E1] hover:text-[#D4AF37] transition-colors">
                    Partner With Us
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
