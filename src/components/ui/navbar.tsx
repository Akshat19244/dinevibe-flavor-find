import React, { useState, useEffect } from 'react';
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
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  User,
  Settings,
  LogOut,
  Calendar,
  Search,
  Users,
  Building,
  BarChart,
  ChevronDown,
  Bell,
  Badge as LucideBadge,
} from 'lucide-react';

interface NavbarProps {
  userType?: string | null;
  userName?: string | null;
}

const NotificationBell = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={toggleNotifications}>
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <LucideBadge className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs px-1">
            {notifications.length}
          </LucideBadge>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {notification.message}
                </a>
              ))
            ) : (
              <span className="block px-4 py-2 text-sm text-gray-500">No new notifications</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ userType, userName }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = async () => {
      // Replace this with your actual API call
      const mockNotifications = [
        { id: 1, message: 'Your booking has been confirmed!' },
        { id: 2, message: 'New restaurant added near you.' },
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserDashboardLink = () => {
    if (!userType) return '/auth/login';
    
    switch (userType) {
      case 'admin':
        return '/admin/dashboard';
      case 'business_owner':
        return '/owner/dashboard';
      default:
        return '/user/discovery';
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DV</span>
            </div>
            <span className="text-xl font-bold text-[#2E3A59]">DineVibe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              About
            </Link>
            <Link to="/events" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              Events
            </Link>
            <Link to="/for-business" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              For Business
            </Link>
            <Link to="/partner-with-us" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              Partner With Us
            </Link>
            <Link to="/3d-preview" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              3D Preview
            </Link>
            <Link to="/media" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
              Media
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell notifications={notifications} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="hidden md:block text-slate-700">{userName || 'User'}</span>
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getUserDashboardLink())}>
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    {userType === 'customer' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/user/my-bookings')}>
                          <Calendar className="mr-2 h-4 w-4" />
                          My Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/user/discovery')}>
                          <Search className="mr-2 h-4 w-4" />
                          Discovery
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/user/event-planning')}>
                          <Users className="mr-2 h-4 w-4" />
                          Plan Event
                        </DropdownMenuItem>
                      </>
                    )}
                    {userType === 'business_owner' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/owner/list-restaurant')}>
                          <Building className="mr-2 h-4 w-4" />
                          List Restaurant
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/owner/analytics')}>
                          <BarChart className="mr-2 h-4 w-4" />
                          Analytics
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/user/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
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
                  className="text-slate-700 hover:text-[#FF6F61]"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth/signup')}
                  className="bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/about" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    About
                  </Link>
                  <Link to="/events" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    Events
                  </Link>
                  <Link to="/for-business" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    For Business
                  </Link>
                  <Link to="/partner-with-us" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    Partner With Us
                  </Link>
                  <Link to="/3d-preview" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    3D Preview
                  </Link>
                  <Link to="/media" className="text-slate-700 hover:text-[#FF6F61] transition-colors">
                    Media
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
