import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from '../actions /registerAction';
import { RegistrationState } from '../types';



const initialState: RegistrationState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};



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
