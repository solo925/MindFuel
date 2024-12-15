import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../reducers/goalsReducer';
import habitReducer from '../reducers/habitsReducer';
import loginReducer from '../reducers/loginReducer';
import notificationReducer from '../reducers/notificationReducer';
import profileReducer from '../reducers/profileReducer';
import registrationReducer from '../reducers/registerReducer';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        login: loginReducer,
        profile: profileReducer,
        goals: goalsReducer,
        user: userReducer,
        habits: habitReducer,
        notifications: notificationReducer,
      
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
