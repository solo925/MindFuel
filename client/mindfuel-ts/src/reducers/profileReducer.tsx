import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteProfile, fetchProfile, updateProfile } from '../actions /profileAction';
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
