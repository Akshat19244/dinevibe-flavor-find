
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <Skeleton className="h-8 w-full max-w-md mb-4" />
        <Skeleton className="h-[200px] w-full max-w-3xl mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth/login?from=${location.pathname}`} state={{ from: location }} replace />;
  }

  // If no role restrictions or role checking is implemented elsewhere
  if (!allowedRoles) {
    return <>{children}</>;
  }

  // Check user role if roles are specified
  // This would require fetching user profile from Supabase
  // For now we'll allow access and implement proper role checking later
  return <>{children}</>;
};

export default ProtectedRoute;
