import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './RegisterSlices';

const store = configureStore({
    reducer: {
        registration: registrationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
