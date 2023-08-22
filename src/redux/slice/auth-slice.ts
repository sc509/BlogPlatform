import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isLoggedIn: Boolean(Cookies.get('token')),
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logOut(state){
      state.isLoggedIn = false;
      Cookies.remove('token');
      Cookies.remove('username');
      Cookies.remove('email');
    }
  },
});

export const {actions, reducer: authReducer} = authSlice