import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        categories: [],
        categoriesLastUpdated: null,
        homeFamousProducts: [],
        homeFamousProductsLastUpdated: null,
        homeTrendingProducts: [],
        homeTrendingProductsListLastUpdated: null,
    },
    reducers: {
        setCategoriesList: (state: any, action: any) => {
            state.categories = action.payload;
            state.categoriesLastUpdated = Date.now();
        },
        removeCategoriesList: (state: any) => {
            state.categories = [];
            state.categoriesLastUpdated = null;
        },
        setHomeFamousProductsList: (state: any, action: any) => {
            state.homeFamousProducts = action.payload;
            state.homeFamousProductsLastUpdated = Date.now();
        },
        removeHomeFamousProductsList: (state: any) => {
            state.homeFamousProducts = [];
            state.homeFamousProductsLastUpdated = null;
        },
        setHomeTrendingProductsList: (state: any, action: any) => {
            state.homeTrendingProducts = action.payload;
            state.homeTrendingProductsListLastUpdated = Date.now();
        },
        removeHomeTrendingProductsList: (state: any) => {
            state.homeTrendingProducts = [];
            state.homeTrendingProductsListLastUpdated = null;
        }
    }
})

export const { setCategoriesList, removeCategoriesList, setHomeFamousProductsList, removeHomeFamousProductsList, setHomeTrendingProductsList, removeHomeTrendingProductsList } = productSlice.actions;

export default productSlice.reducer;