import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState : {
       cartItems : JSON.parse(localStorage.getItem('cartItems')) || [], 
       shippingAddress : {},
    },
    reducers : {
        setCartItems(state, action){
            state.cartItems = action.payload;
            console.log(state.cartItems);

            localStorage.setItem("cartItems", JSON.stringify(action.payload));
        },
        removeCartItems(state, action){
            const id = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== id);
        }
    }
})