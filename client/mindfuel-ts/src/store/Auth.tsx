import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { userTypes } from '../types';

interface AuthState {
  user: null | userTypes;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null, // Load token from localStorage
  loading: false,
  error: null,
};

// AsyncThunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        { withCredentials: true }
      );
      return response.data; // Expecting { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// AsyncThunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { name, email, password, confirmpassword }: { name: string; email: string; password: string; confirmpassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/register',
        { name, email, password, confirmpassword },
        { withCredentials: true }
      );
      return response.data; // Expecting { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: userTypes; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem('token', action.payload.token); // Save token in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: userTypes; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem('token', action.payload.token); 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
