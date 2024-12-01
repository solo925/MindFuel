import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../store/LoginSlice';

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.login);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Welcome, {user?.name || 'Guest'}!</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default HomePage;
