import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { loginUser } from '../../store/LoginSlice';

const LoginComponent: React.FC = () => {
    const dispatch = useDispatch < AppDispatch > ();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state: RootState) => state.login);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    if (user) {
     
        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button type="submit" disabled={loading}>
                    Login
                </button>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </form>
            <p>
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default LoginComponent;
