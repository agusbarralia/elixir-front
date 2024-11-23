import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import tagsReducer from './tagsSlice';
import checkoutReducer from './checkoutSlice';

export const store = configureStore({
    reducer: {
        products : productReducer,
        users : userReducer,
        cart: cartReducer,
        tags: tagsReducer,
        checkout: checkoutReducer   
    }

})