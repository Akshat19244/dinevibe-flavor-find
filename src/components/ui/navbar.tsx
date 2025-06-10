import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Sparkles,
  Compass,
  Calendar,
  Brain,
  BarChart3,
  Users,
  Building,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from '@/components/notifications/NotificationBell';

interface NavbarProps {
  userType?: 'customer' | 'owner' | 'admin' | null;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userType = "customer", userName = "User" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getSettingsPath = () => {
    if (userType === 'admin') return '/admin/settings';
    if (userType === 'owner') return '/owner/settings';
    return '/user/settings';
  };

  const getNavigationLinks = () => {
    switch (userType) {
      case "customer":
        return [
          { href: "/user/discovery", label: "Discover", icon: Compass },
          { href: "/user/event-planning", label: "Plan Events", icon: Calendar },
          { href: "/user/ai-assistant", label: "AI Assistant", icon: Brain },
          { href: "/user/bookings", label: "My Bookings", icon: Calendar },
        ];
      case "owner":
        return [
          { href: "/owner/dashboard", label: "Dashboard", icon: BarChart3 },
          { href: "/owner/restaurant-dashboard", label: "Restaurant", icon: Building },
          { href: "/owner/analytics", label: "Analytics", icon: BarChart3 },
        ];
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/restaurants", label: "Restaurants", icon: Building },
          { href: "/admin/media-management", label: "Media", icon: Building },
        ];
      default:
        return [
          { href: "/about", label: "About", icon: null },
          { href: "/media", label: "Media", icon: null },
          { href: "/events", label: "Events", icon: null },
          { href: "/contact", label: "Contact", icon: null },
        ];
    }
  };

  const navLinks = getNavigationLinks();

  return (
    <nav className="bg-slate-900 sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DineVibe
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.label}-${index}`}
                to={link.href}
                className="text-slate-300 hover:text-blue-400 font-medium transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            {userType && userType !== null ? (
              <>
                <NotificationBell />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-800 text-slate-300">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium hidden lg:inline">
                        {userName || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuLabel className="text-slate-200">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 text-slate-300" 
                      onClick={() => navigate('/user/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 text-slate-300"
                      onClick={() => navigate(getSettingsPath())}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-red-900 text-red-400"
                      onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    Login
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {userType && userType !== null && (
              <NotificationBell />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-slate-800 text-slate-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={`mobile-${link.label}-${index}`}
                to={link.href}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {(!userType || userType === null) && (
              <div className="pt-4 flex flex-col space-y-2 border-t border-slate-700">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-slate-600 hover:bg-slate-700 text-slate-300">
                    Login
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {userType && userType !== null && (
              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-slate-300">{userName || 'User'}</span>
                </div>
                <Link to="/user/profile" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <Link to={getSettingsPath()} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-red-900 transition-all duration-300"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
