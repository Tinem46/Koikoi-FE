import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import cartSlice from './features/cartSlice'
import fishSlice from './features/fishSlice';
import revenueSlice from './features/revenueSlice';
import compareSlice from './features/compareSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    fish: fishSlice,
    revenue: revenueSlice,
    compare: compareSlice,
  },
})

export const getRootState = () => store.getState();
