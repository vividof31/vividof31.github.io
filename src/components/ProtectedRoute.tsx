import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optional: Show a loading spinner while checking auth state
    return <div className="pt-24 text-center">Checking authentication...</div>;
  }

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/admin" replace />;
  }

  // User is logged in, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
