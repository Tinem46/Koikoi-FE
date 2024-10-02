import { createSlice } from "@reduxjs/toolkit";

// redux lưu thông tin user

// default value
const initialState = {
  isLoggedIn: false,
  id: null,
  username: null,
  // Add other user fields as needed
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      // Update other user fields
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.id = null;
      state.username = null;
      // Reset other user fields
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
