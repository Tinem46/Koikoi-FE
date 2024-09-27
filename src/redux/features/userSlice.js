import { createSlice } from "@reduxjs/toolkit";

// redux lưu thông tin user

// default value
const initialState = {
  isLoggedIn: false,
  // ... other user-related state
};

export const userSlice = createSlice({
  name: "user",
  initialState, //initialState: initialState
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      // ... update other user data
    },
    logout: (state) => {
      state.isLoggedIn = false;
      // ... reset other user data
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
