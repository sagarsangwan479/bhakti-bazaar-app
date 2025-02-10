import { Middleware } from '@reduxjs/toolkit';
import { removeCategoriesList } from '../reducer/productReducer';


// 7 days in milliseconds
// const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;
const EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;

export const expirationMiddleware: Middleware = store => next => action => {
    // First, let the action go through
    const result = next(action);
    
    // After each action, check the lastUpdated timestamp
    const state = store.getState();
    const lastUpdated = state.product?.lastUpdated;
    
    if (lastUpdated) {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastUpdated;
        
        // If more than 7 days have passed, dispatch removeCategoriesList
        if (timeDifference >= EXPIRATION_TIME) {
            store.dispatch(removeCategoriesList());
        }
    }
    
    return result;
};