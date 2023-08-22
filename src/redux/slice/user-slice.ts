import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    email: Cookies.get('email'),
    username: Cookies.get('username'),
    image: Cookies.get('url'),
}

export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers:{
        setUserImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
    }

})

export const {actions:userActions, reducer:userReducer} = userSlice;