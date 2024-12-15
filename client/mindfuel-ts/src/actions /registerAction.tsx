import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const registerUser = createAsyncThunk(
    'registration/registerUser',
    async (
        { name, email, password, confirmpassword }: { name: string; email: string; password: string; confirmpassword: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register',
                { name, email, password, confirmpassword },
                { withCredentials: true });
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);
