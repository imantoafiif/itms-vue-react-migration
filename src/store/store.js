import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionReducer from './slices/sessionSlice'
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedSession = persistReducer(persistConfig, sessionReducer)

export const store = configureStore({
    reducer: {
        user: sessionReducer,
    }
})

export default store;