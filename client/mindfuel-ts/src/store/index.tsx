import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './golasSlice';
import loginReducer from './LoginSlice';
import profileReducer from './profileSlice';
import registrationReducer from './RegisterSlices';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        login: loginReducer,
        profile: profileReducer,
        goals: goalsReducer,
        user:userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
