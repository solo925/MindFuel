import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Define a type for the user slice
interface UserState {
  token: string | null;
  user: { [key: string]: any } | null; 
}

const initialState: UserState = {
  token: Cookies.get('token') || null,  //okies
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data
    setUser(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set('token', action.payload.token);  // Save token to cookies
    },
    // Action to clear user data
    logout(state) {
      state.token = null;
      state.user = null;
      Cookies.remove('token');  
    },
  },
});


export const { setUser, logout } = userSlice.actions;


export default userSlice.reducer;
