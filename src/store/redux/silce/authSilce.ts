import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  personalInfo: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    personalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
  },
});

export const { login, logout, personalInfo } = authSlice.actions;

export default authSlice.reducer;
