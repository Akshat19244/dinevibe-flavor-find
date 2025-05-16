
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  userType?: 'customer' | 'owner' | 'admin' | null;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userType = null, userName = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define navigation links based on user type
  const getNavLinks = () => {
    if (userType === 'customer') {
      return [
        { to: '/user/discovery', label: 'Discovery' },
        { to: '/user/upcoming', label: 'Upcoming Events' },
        { to: '/user/deals', label: 'Deals' },
        { to: '/user/bookings', label: 'My Bookings' },
      ];
    } else if (userType === 'owner') {
      return [
        { to: '/owner/upload-event', label: 'Upload Event' },
        { to: '/owner/deals', label: 'Upload Deals' },
        { to: '/owner/customers', label: 'Track Bookings' },
        { to: '/owner/analytics', label: 'Analytics' },
      ];
    } else if (userType === 'admin') {
      return [
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/reports', label: 'Reports' },
        { to: '/admin/notify', label: 'Notifications' },
      ];
    } else {
      return [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/features', label: 'Features' },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-dineVibe-primary to-dineVibe-accent bg-clip-text text-transparent">
                DineVibe
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-gray-700 hover:text-dineVibe-primary font-medium transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            {userType ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-dineVibe-primary rounded-full"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-dineVibe-accent flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium hidden lg:inline">
                        {userName || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {userType && (
              <Button variant="ghost" size="icon" className="relative mr-2">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-dineVibe-primary rounded-full"></span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dineVibe-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          {!userType && (
            <div className="pt-4 flex flex-col space-y-2">
              <Link to="/auth/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/auth/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {userType && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-dineVibe-accent flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="ml-3 text-sm font-medium">{userName || 'User'}</span>
              </div>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dineVibe-primary hover:bg-gray-50">
                Profile
              </Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dineVibe-primary hover:bg-gray-50">
                Settings
              </Link>
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-dineVibe-primary hover:bg-gray-50">
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
