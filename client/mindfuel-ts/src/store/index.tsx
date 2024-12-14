import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../reducers/goalsReducer';
import habitReducer from '../reducers/habitsReducer';
import loginReducer from './LoginSlice';
import notificationReducer from './notificationSlice';
import profileReducer from './profileSlice';
import registrationReducer from './RegisterSlices';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        login: loginReducer,
        profile: profileReducer,
        goals: goalsReducer,
        user: userReducer,
        habits: habitReducer,
        notifications: notificationReducer,   // Add the reducer for notifications here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer for habit progress here  // Add the reducer
      
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
