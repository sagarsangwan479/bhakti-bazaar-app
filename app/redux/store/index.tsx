// import { applyMiddleware, createStore } from 'redux';
// import rootReducer from '../reducer/index';
// import thunk from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { expirationMiddleware } from '../middlewares/expirationMiddleware';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'product']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expirationMiddleware) });

export const persister = persistStore(store);
export default store;