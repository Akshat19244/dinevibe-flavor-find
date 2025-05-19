
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getUserProfile } from '@/lib/api/users';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  
  // Check if the user has admin privileges
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setProfileLoading(false);
        return;
      }
      
      try {
        const profile = await getUserProfile(user.id);
        // Check role or is_admin flag from the profile
        setIsAdmin(profile.role === 'admin' || profile.is_admin === true);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsAdmin(false);
      } finally {
        setProfileLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);
  
  // Show loading state while checking auth and admin status
  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/admin/auth" replace />;
  }
  
  // Redirect non-admin users
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <AdminNav />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default AdminLayout;
