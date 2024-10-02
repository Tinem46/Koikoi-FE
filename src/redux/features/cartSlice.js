import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
    },
    reducers: {
       addtoCart:(state,action) =>{
        state.push({
            ...action.payload,
            quantity:1,
        })
       },
       reset:(state,action) =>initialState,
       remove:(state,action) =>[],
      changeQuantity:(state,action) =>[],
    },
});

export const {addToCart,reset,remove,changeQuantiy} = cartSlice.actions;
export default cartSlice.reducer;
