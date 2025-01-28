import { combineReducers, configureStore } from '@reduxjs/toolkit' 
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { BASE_URL } from '../config'

import userReducer from './Slices/userSlice'
import dashboardReducer from './Slices/dashboardSlice';
import Dashboard from '../Pages/dashboard'

const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
};

const rootReducer = combineReducers({
  user : userReducer,
  dashboard : dashboardReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // To avoid issues with non-serializable values in the state
        }),
});

export const persistor = persistStore(store);

export default store ;