import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        categories: [],
        lastUpdated: null
    },
    reducers: {
        setCategoriesList: (state: any, action: any) => {
            state.categories = action.payload;
            state.lastUpdated = Date.now();
        },
        removeCategoriesList: (state: any) => {
            state.categories = [];
            state.lastUpdated = null;
        }
    }
})

export const { setCategoriesList, removeCategoriesList } = productSlice.actions;

export default productSlice.reducer;