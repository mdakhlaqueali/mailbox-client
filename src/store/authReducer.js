import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const isAuthenticated = !!token;

const initialAuthState = {isAuthenticated : isAuthenticated, isLogin:false, token:token };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state){
            state.isAuthenticated=true;
        },
        logout(state){
            state.isAuthenticated=false;
        },
        toggle(state){
            state.isLogin = !state.isLogin;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;