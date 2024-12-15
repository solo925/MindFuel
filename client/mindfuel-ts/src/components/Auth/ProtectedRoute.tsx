import Cookies from "js-cookie";
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { loading } = useSelector((state: RootState) => state.login);
    const token = Cookies.get('token');
    console.log(token);

    if (!token && !loading) {
      
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
