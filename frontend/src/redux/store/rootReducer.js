import {reducer as userReducers} from "../slices/userSlice"
import {reducer as productReducers} from "../slices/productSlice"
import { reducer as orderReducers } from "../slices/orderSlice";
import {reducer as cartReducer} from "../slices/cartSlice";
import { combineReducer } from '@reduxjs/toolkit';

export const rootReducer = combineReducer({
    user: userReducers,
    product: productReducers,
    order : orderReducers,
    cart : cartReducer
});