import { configureStore } from '@reduxjs/toolkit' 
import userReducer from './Slices/userSlice'
import { BASE_URL } from '../config';
import dashboardReducer from './Slices/dashboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard : dashboardReducer,
  },
});

export default store ;