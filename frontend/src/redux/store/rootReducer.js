import {reducer as userReducers} from "../slices/userSlice"
import {reducer as productReducers} from "../slices/productSlice"
import { reducer as orderReducers } from "../slices/orderSlice";
import {reducer as cartReducer} from "../slices/cartSlice";
import { combineReducers } from '@reduxjs/toolkit';

 const rootReducer = combineReducers({
    user: userReducers,
    product: productReducers,
    order : orderReducers,
    cart : cartReducer
});

export default rootReducer