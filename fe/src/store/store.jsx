import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.jsx';
import articlesSlice from "./articlesSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        articlesSlice:articlesSlice,
    }
});