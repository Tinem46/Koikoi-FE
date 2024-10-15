import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import fishSlice from './features/fishSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    fish: fishSlice,
  },

})

export const getRootState = () => store.getState();

