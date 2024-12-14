import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { userTypes } from '../types';

interface LoginState {
    user: null | userTypes;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// AsyncThunk for login
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/auth/login',
                { email, password },
                { withCredentials: true } 
            );

            return response.data; // Expecting { user, token } in response
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Login slice
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
                localStorage.setItem('token', action.payload.token); // Save token for session persistence
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
