import { Middleware } from '@reduxjs/toolkit';
import { removeCategoriesList, removeHomeFamousProductsList, removeHomeTrendingProductsList } from '../reducer/productReducer';


// 7 days in milliseconds
// const CATEGORIES_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;
const CATEGORIES_LIST_EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;
const HOME_FAMOUS_PRODUCTS_EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;
const HOME_TRENDING_PRODUCTS_EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;

export const expirationMiddleware: Middleware = store => next => action => {
    // First, let the action go through
    const result = next(action);
    
    // After each action, check the lastUpdated timestamp
    const state = store.getState();
    const categoriesListLastUpdated = state.product?.categoriesLastUpdated;
    const homeFamousProductsLastUpdated = state.product?.homeFamousProductsLastUpdated;
    const homeTrendingProductsListLastUpdated = state.product?.homeTrendingProductsListLastUpdated;
    
    if (categoriesListLastUpdated) {
        const currentTime = Date.now();
        const timeDifference = currentTime - categoriesListLastUpdated;
        
        // If more than 7 days have passed, dispatch removeCategoriesList
        if (timeDifference >= CATEGORIES_LIST_EXPIRATION_TIME) {
            store.dispatch(removeCategoriesList());
        }
    }
    
    if(homeFamousProductsLastUpdated) {
        const currentTime = Date.now();
        const timeDifference = currentTime - homeFamousProductsLastUpdated;
        
        // If more than 1 day have passed, dispatch removeHomeFamousProductsList
        if (timeDifference >= HOME_FAMOUS_PRODUCTS_EXPIRATION_TIME) {
            store.dispatch(removeHomeFamousProductsList());
        }
    }

    if(homeTrendingProductsListLastUpdated) {
        const currentTime = Date.now();
        const timeDifference = currentTime - homeTrendingProductsListLastUpdated;
        
        // If more than 1 day have passed, dispatch removeHomeTrendingProductsList
        if (timeDifference >= HOME_TRENDING_PRODUCTS_EXPIRATION_TIME) {
            store.dispatch(removeHomeTrendingProductsList());
        }
    }

    return result;
};