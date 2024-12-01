import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { token } = useSelector((state: RootState) => state.login);

    if (!token) {
      
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
