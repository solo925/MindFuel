import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions /loginAction';
import { LoginState } from '../types';


const initialState: LoginState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

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
