import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { userTypes } from '../types';


interface RegistrationState {
    user: null | userTypes;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: RegistrationState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};


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


const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        resetState: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
                console.log('Token:', action.payload.token);
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetState } = registrationSlice.actions;

export default registrationSlice.reducer;
