import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';
import authReducer from './authReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    drawer: drawerReducer,
    cart: cartReducer,
    wishList : wishListReducer,
    auth: authReducer,
    product: productReducer
});

export default rootReducer;