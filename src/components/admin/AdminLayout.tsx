
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking auth
  if (loading) {
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
