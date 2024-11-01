// src/redux/features/revenueSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  revenueData: [],
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    setRevenueData: (state, action) => {
      state.revenueData = action.payload;
    },
  },
});

export const { setRevenueData } = revenueSlice.actions;
export default revenueSlice.reducer;

