import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from '@react-native-async-storage/async-storage';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userDetail: {}
    },
    reducers: {
        setToken: (state: any, action: any) => {
            state.token = action.payload;
        },
        clearToken: (state: any) => {
            state.token = null;
        },
        setUserDetail: (state: any, action: any) => {
            state.userDetail = action.payload;
        },
        clearUserDetail: (state: any) => {
            state.userDetail = {};
        }
    }
})

export const { setToken, clearToken, setUserDetail, clearUserDetail } = authSlice.actions;

export default authSlice.reducer;