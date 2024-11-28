import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store';


const GuestRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.registration);
    
    return user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
