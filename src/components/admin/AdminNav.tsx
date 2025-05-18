
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Users,
  BarChart4,
  Settings,
  Gauge,
  BellRing,
  PanelTop,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminNav: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully'
    });
    navigate('/');
  };
  
  const routes = [
    {
      title: 'Dashboard',
      icon: <Gauge className="w-5 h-5" />,
      href: '/admin/dashboard',
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      href: '/admin/users',
    },
    {
      title: 'Analytics',
      icon: <BarChart4 className="w-5 h-5" />,
      href: '/admin/reports',
    },
    {
      title: 'Notifications',
      icon: <BellRing className="w-5 h-5" />,
      href: '/admin/notify',
    },
    {
      title: 'Control Panel',
      icon: <PanelTop className="w-5 h-5" />,
      href: '/control',
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '/admin/settings',
    },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-2 justify-center md:justify-between">
        {routes.map((route) => (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
              location.pathname === route.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {route.icon}
            <span className="hidden md:inline">{route.title}</span>
          </Link>
        ))}
        
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-3 py-2 text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
