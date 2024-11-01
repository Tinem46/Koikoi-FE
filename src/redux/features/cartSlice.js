import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Load cart state from local storage
const loadState = () => {
    try {
        const stateCart = localStorage.getItem('cart');
        return stateCart ? JSON.parse(stateCart) : { products: [] };
    } catch (err) {
        console.log(err)
        return { products: [] };
    }
};

const saveState = (state) => {
    try {
        const stateCart = JSON.stringify(state);
        localStorage.setItem('cart', stateCart);
    } catch (err) {
       console.log(err)
    }
};

const initialState = loadState();

// Async actions for API calls

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.products.findIndex(fish => fish.id === action.payload.id);
            if (index === -1) {
                state.products.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                });
            } else {
                state.products[index].quantity += action.payload.quantity || 1;
            }
            try {
                toast.success("Product added to cart");
            } catch (err) {
                console.error("Toast notification failed", err);
            }
            saveState(state); 
        },
        reset: (state) => {
            state.products = [];
            saveState(state); 
        },
        syncWithApi: (state, action) => {
            state.products = action.payload;
            saveState(state);
        },
    },
});
export const { addToCart, reset, remove, changeQuantity, increaseQuantity, decreaseQuantity, syncWithApi } = cartSlice.actions;
export default cartSlice.reducer;
