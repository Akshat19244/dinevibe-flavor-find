import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeSelector from '@/components/ui/theme-selector';
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
  Tag,
  BookOpen,
  BarChart3,
  Plus,
  Users,
  Building,
  FileText,
  Settings as SettingsIcon,
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
import { useTheme } from '@/contexts/ThemeContext';

interface NavbarProps {
  userType?: 'customer' | 'owner' | 'admin' | null;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userType = "customer", userName = "User" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Get the settings path based on user type
  const getSettingsPath = () => {
    if (userType === 'admin') return '/admin/settings';
    if (userType === 'owner') return '/owner/settings';
    return '/user/settings';
  };

  // Define navigation links based on user type
  const getNavigationLinks = () => {
    switch (userType) {
      case "customer":
        return [
          { href: "/user/discovery", label: "Discover", icon: Compass },
          { href: "/user/planning", label: "Plan Event", icon: Calendar },
          { href: "/user/ai-assistant", label: "AI Assistant", icon: Brain, badge: "NEW" },
          { href: "/user/upcoming", label: "Upcoming", icon: Clock },
          { href: "/user/deals", label: "Deals", icon: Tag },
          { href: "/user/bookings", label: "Bookings", icon: BookOpen },
        ];
      case "owner":
        return [
          { href: "/owner/dashboard", label: "Dashboard", icon: BarChart3 },
          { href: "/owner/register-restaurant", label: "Register Restaurant", icon: Plus },
          { href: "/owner/upload-event", label: "Events", icon: Calendar },
          { href: "/owner/deals", label: "Deals", icon: Tag },
          { href: "/owner/customers", label: "Customers", icon: Users },
        ];
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/restaurants", label: "Restaurants", icon: Building },
          { href: "/admin/reports", label: "Reports", icon: FileText },
          { href: "/control", label: "Control Panel", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavigationLinks();

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                DineVibe
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-foreground/80 hover:text-primary font-medium transition-all duration-300 relative group animate-fade-in-up stagger-${index + 1}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* User controls */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSelector />
            
            {userType ? (
              <>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-bold">3</span>
                  </span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-primary/10">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-sm font-medium">
                          {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium hidden lg:inline">
                        {userName || 'User'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-effect border-border/50">
                    <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-primary/10" 
                      onClick={() => navigate('/user/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-primary/10"
                      onClick={() => navigate(getSettingsPath())}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="cursor-pointer hover:bg-destructive/10 text-destructive"
                      onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" className="border-primary/20 text-foreground hover:bg-primary/10">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSelector />
            {userType && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border/50 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block px-3 py-2 rounded-lg text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {!userType && (
              <div className="pt-4 flex flex-col space-y-2 border-t border-border/20">
                <Link to="/auth/login">
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {userType && (
              <div className="pt-4 border-t border-border/20">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="ml-3 text-sm font-medium">{userName || 'User'}</span>
                </div>
                <Link to="/user/profile" className="block px-3 py-2 rounded-lg text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                  Profile
                </Link>
                <Link to={getSettingsPath()} className="block px-3 py-2 rounded-lg text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                  Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-all duration-300">
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
