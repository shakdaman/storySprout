import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useChild } from '../contexts/ChildContext';
import LoadingSpinner from './LoadingSpinner';

interface ChildProtectedRouteProps {
  children: React.ReactNode;
}

const ChildProtectedRoute: React.FC<ChildProtectedRouteProps> = ({ children }) => {
  const { currentChild, loading } = useChild();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentChild) {
    return <Navigate to="/child/login" replace />;
  }

  return <>{children}</>;
};

export default ChildProtectedRoute;
