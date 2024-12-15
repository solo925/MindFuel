import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


interface UserState {
  token: string | null;
  user: { [key: string]: any } | null; 
}

const initialState: UserState = {
  token: Cookies.get('token') || null, 
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set('token', action.payload.token);  
    },
   
    logout(state) {
      state.token = null;
      state.user = null;
      Cookies.remove('token');  
    },
  },
});


export const { setUser, logout } = userSlice.actions;


export default userSlice.reducer;
