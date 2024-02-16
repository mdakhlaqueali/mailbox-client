import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const isAuthenticated = !!token;

const initialAuthState = {isAuthenticated : isAuthenticated, isLogin:false, token:token, email:email, receiverEmail: '' };

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state, action){
            state.isAuthenticated=true;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout(state){
            state.isAuthenticated=false;
            state.email = null;
            state.token = null;
        },
        toggle(state){
            state.isLogin = !state.isLogin;
        },
        setReceiver(state, action){
            localStorage.setItem("receiverEmail", action.payload)
            state.receiverEmail = action.payload;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;