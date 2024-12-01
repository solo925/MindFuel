import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { userTypes } from '../types';

interface ProfileState {
    user: userTypes | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    loading: false,
    error: null,
};

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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfileState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<userTypes>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<userTypes>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProfile.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
