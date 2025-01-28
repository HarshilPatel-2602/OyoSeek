import { createSlice } from '@reduxjs/toolkit' 

const userSlice = createSlice (
    {
        name: 'user',
        initialState: 
        {
            userId: '',
            email: '',
            role: '',
            currentLoc: '/',
        },
        reducers: 
        {
            login: (state, action) => 
            {
                state.userId = action.payload.userId ;
                state.email = action.payload.email ;
                state.role = action.payload.role ;
                state.currentLoc = '/'
            },
            logout: (state) => 
            {
                state.userId = '' ;
                state.email = '' ;
                state.role = '' ;
                state.currentLoc = '/login'
            },
            setLocation: (state, action) => 
            {
                state.currentLoc = action.payload;
            },
        },
    }
);

export const { login, logout , setLocation } = userSlice.actions ;

export default userSlice.reducer ;