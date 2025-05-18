
import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Store,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminNav: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(true);
  
  // Navigation items
  const navItems = [
    { 
      path: '/admin/dashboard', 
      name: 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      path: '/admin/users', 
      name: 'Users', 
      icon: Users 
    },
    { 
      path: '/admin/restaurants', 
      name: 'Restaurants', 
      icon: Store 
    },
    { 
      path: '/admin/reservations', 
      name: 'Reservations', 
      icon: Calendar 
    },
    { 
      path: '/admin/reports', 
      name: 'Reports', 
      icon: FileText 
    },
    { 
      path: '/admin/logs', 
      name: 'Admin Logs', 
      icon: Bell 
    },
    { 
      path: '/admin/settings', 
      name: 'Settings', 
      icon: Settings 
    },
  ];
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/auth');
      toast({
        title: 'Logged Out',
        description: 'You have been logged out of the admin panel',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Function to determine if a nav item is active
  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div 
      className={cn(
        "bg-slate-900 text-white h-full flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      {/* Admin Logo/Title */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-primary" />
          {expanded && (
            <span className="ml-2 text-lg font-semibold">Admin Panel</span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-8 w-8 text-white hover:bg-slate-800"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>
      
      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm rounded-lg",
                  isActive ? "bg-primary text-white font-medium" : "text-gray-300 hover:bg-slate-800"
                )}
              >
                <item.icon className={cn("h-5 w-5", !expanded && "mx-auto")} />
                {expanded && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-300 hover:bg-slate-800 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className={cn("h-5 w-5", !expanded && "mx-auto")} />
          {expanded && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
