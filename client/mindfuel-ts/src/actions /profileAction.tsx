import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/profile', { withCredentials: true });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
});

// Update profile
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await axios.put('http://localhost:3000/api/v1/profile', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);

// Delete profile
export const deleteProfile = createAsyncThunk('profile/deleteProfile', async (_, { rejectWithValue }) => {
    try {
        await axios.delete('http://localhost:3000/api/v1/profile', { withCredentials: true });
        return true;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
});
