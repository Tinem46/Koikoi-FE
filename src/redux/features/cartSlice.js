import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       addToCart: (state, action) => {
        const index = state.products.findIndex(fish => fish.id === action.payload.id);
        if(index == -1) {
            //chưa tồn tại
             state.products.push({
            ...action.payload, //food
            quantity: 1,
        });
        }else{
            //đã tồn tại
            state.products[index].quantity++;
        }
        toast.success("Product added to cart");
       },
       reset: (state) => initialState,
       
       remove: (state, action) => {
           state.products = state.products.filter(fish => fish.id !== action.payload.id);
       },
       changeQuantity: (state, action) => {
           const product = state.products.find(item => item.id === action.payload.id);
           if (product) {
               product.quantity = action.payload.quantity;
               product.totalPrice = product.price * action.payload.quantity;
           }
       }
    },
});

export const { addToCart, reset, remove, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
