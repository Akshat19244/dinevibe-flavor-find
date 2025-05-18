
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLinkProps {
  variant?: 'default' | 'subtle' | 'link';
}

const AdminLink: React.FC<AdminLinkProps> = ({ variant = 'default' }) => {
  if (variant === 'link') {
    return (
      <Link 
        to="/admin/auth" 
        className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1"
      >
        <Shield className="h-3 w-3" />
        Admin Access
      </Link>
    );
  }
  
  if (variant === 'subtle') {
    return (
      <Link to="/admin/auth">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          Admin Access
        </Button>
      </Link>
    );
  }
  
  return (
    <Link to="/admin/auth">
      <Button size="sm" className="flex items-center gap-1">
        <Shield className="h-4 w-4" />
        Admin Access
      </Button>
    </Link>
  );
};

export default AdminLink;
