import { createSlice } from "@reduxjs/toolkit";
// import AsyncStorage from '@react-native-async-storage/async-storage';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userDetail: {}
    },
    reducers: {
        setUserDetail: (state: any, action: any) => {
            state.userDetail = action.payload;
        },
        clearUserDetail: (state: any) => {
            state.userDetail = {};
        }
    }
})

export const { setUserDetail, clearUserDetail } = authSlice.actions;

export default authSlice.reducer;