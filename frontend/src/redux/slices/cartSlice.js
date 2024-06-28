import {createSlice} from "@reduxjs/toolkit"
import cartAPI from "../../mocks/cart";

const cartSlice = createSlice({
    name: "cart",
    initialState : {
       cartItems : JSON.parse(localStorage.getItem('cartItems')) || [], 
    //    shippingAddress : {},
    //    paymentMethod: {},
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
    paymentMethod: localStorage.getItem('paymentMethod') || '',
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
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        setShippingAddress(state, action){
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
        },
        setPaymentMethod(state,action){
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        },
    }
})

export const {
    setCartItems,
    removeCartItems,
    setShippingAddress,
    setPaymentMethod
} = cartSlice.actions;

export const addToCart = (id, qty) => async(dispatch, getState) => {
    try {
        const {cartItems} = getState().cart;
        const product = await cartAPI.fetchProduct(id);

        let  existingItemIndex = -1;

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]._id === id){
                existingItemIndex = i;
                break;
            }
        }

        if (existingItemIndex !== -1) {
            //If an item with the same product ID exist, update its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].qty += qty;
            dispatch(setCartItems(updatedCartItems));
        } else {
            //If the product does'nt exist in the cart, add it as a new line
            dispatch(setCartItems([...cartItems, {...product, qty}]))
        }
    } catch (error) {
        console.log("Error adding item to cart:", error);
    }
};

export const removeFromCart=(id)=>(dispatch, getState) => {
    try {
        dispatch(removeCartItems(id));
    } catch (error) {
        console.log("Error removing item from cart:", error);
    }
};

export const saveShippingAddress=(data)=>(dispatch) =>{
    dispatch(setShippingAddress(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(setPaymentMethod(data));
}

export const {reducer} = cartSlice;

export default cartSlice;
