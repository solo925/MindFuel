import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import InputField from '../forms/commoninput'; // Reusable InputField
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { registerUser } from '../../actions /registerAction';

const RegisterComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.registration);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                {/* Name Field */}
                <InputField
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* Email Field */}
                <div className="mt-4">
                    <InputField
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password Field */}
                <div className="mt-4">
                    <InputField
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="mt-4">
                    <InputField
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className="mt-6"
                >
                    {loading ? <CircularProgress size={24} /> : 'Register'}
                </Button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterComponent;
