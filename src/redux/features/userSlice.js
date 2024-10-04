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
    forgotPassword: (state, action) => {
      state.isLoggedIn = false;
      state.id = null;
      state.username = null;
      state.email = action.payload.email;
      state.otp = action.payload.otp;
      // Reset other user fields
    },
    verifyEmail: (state, action) => {
      state.isLoggedIn = false;
      state.id = null;
      state.username = null;
      state.email = action.payload.email;
      // Reset other user fields
    },
  },
});

export const { login, logout, forgotPassword, verifyEmail } = userSlice.actions;
export default userSlice.reducer;