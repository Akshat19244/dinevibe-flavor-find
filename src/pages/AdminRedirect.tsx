
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRedirect: React.FC = () => {
  return <Navigate to="/admin/dashboard" replace />;
};

export default AdminRedirect;
