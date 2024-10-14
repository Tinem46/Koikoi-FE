// src/redux/features/fishSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load selected fish from localStorage if available
const loadSelectedFish = () => {
  try {
    const serializedState = localStorage.getItem('selectedFish');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    console.error("Could not load selected fish from localStorage", err);
    return null;
  }
};

const fishSlice = createSlice({
  name: 'fish',
  initialState: {
    selectedFish: loadSelectedFish(), // Initialize with loaded fish
  },
  reducers: {
    setSelectedFish: (state, action) => {
      state.selectedFish = action.payload;
      // Save selected fish to localStorage
      try {
        const serializedState = JSON.stringify(action.payload);
        localStorage.setItem('selectedFish', serializedState);
      } catch (err) {
        console.error("Could not save selected fish to localStorage", err);
      }
    },
  },
});

export const { setSelectedFish } = fishSlice.actions;
export default fishSlice.reducer;
