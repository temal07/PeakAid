import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from "./user/userSlice.js";
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import geminiReducer from './gemini/geminiSlice.js';

// combine reducers

// add reducers here
const rootReducers = combineReducers({
    user: userReducer,
    gemini: geminiReducer,
});

// configuration for all reducers
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

// combine the config and rootReducers together.
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    // add a middlware for error handling 
    // NOTE: I think this is probably the
    // reason I was getting an error saying
    // that redux detected a non-serialisable
    // value. It's because I didn't add any middle
    // ware for error handling
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);