
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserProfile } from '@/lib/api/users';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requireAdmin = false 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isCheckingRoles, setIsCheckingRoles] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!user) {
        setIsCheckingRoles(false);
        return;
      }
      
      try {
        const profile = await getUserProfile(user.id);
        setUserProfile(profile);
        
        if (requireAdmin && !profile.is_admin) {
          setHasAccess(false);
        } else if (allowedRoles && !allowedRoles.includes(profile.role)) {
          setHasAccess(false);
        } else {
          setHasAccess(true);
        }
      } catch (error) {
        console.error('Error checking user access:', error);
        setHasAccess(false);
      } finally {
        setIsCheckingRoles(false);
      }
    };
    
    if (!loading) {
      checkUserAccess();
    }
  }, [user, loading, allowedRoles, requireAdmin]);

  if (loading || isCheckingRoles) {
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
  
  if (!hasAccess) {
    // If admin access required but user is not an admin
    if (requireAdmin) {
      return <Navigate to="/admin/auth" state={{ from: location }} replace />;
    }
    
    // If specific role access required but user doesn't have that role
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
