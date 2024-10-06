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

// Save cart state to local storage
const saveState = (state) => {
    try {
        const stateCart = JSON.stringify(state);
        localStorage.setItem('cart', stateCart);
    } catch (err) {
       console.log(err)

    }
};

const initialState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.products.findIndex(fish => fish.id === action.payload.id);
            if (index === -1) {
                state.products.push({
                    ...action.payload,
                    quantity: 1,
                });
            } else {
                state.products[index].quantity++;
            }
            toast.success("Product added to cart");
            saveState(state); // Save state to local storage
        },
        reset: (state) => {
            const newState = { products: [] };
            saveState(newState); // Save state to local storage
            return newState;
        },
        remove: (state, action) => {
            state.products = state.products.filter(fish => fish.id !== action.payload.id);
            saveState(state); // Save state to local storage
        },
        changeQuantity: (state, action) => {
            const product = state.products.find(item => item.id === action.payload.id);
            if (product) {
                product.quantity = action.payload.quantity;
                product.totalPrice = product.price * action.payload.quantity;
                saveState(state); // Save state to local storage
            }
        }
    },
});

export const { addToCart, reset, remove, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
