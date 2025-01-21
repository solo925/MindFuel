import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import InputField from '../forms/commoninput'; // Reusable InputField
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { loginUser } from '../../actions /loginAction';

const LoginComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                {/* Using InputField component */}
                <InputField
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <div className="mt-4">
                    <InputField
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className="mt-6"
                >
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginComponent;
