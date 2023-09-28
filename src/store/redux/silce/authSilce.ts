import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";

const initialState = {
  isLoggedIn: false,
  user: null,
  personalInfo: [],
  check: "abc ",
  loading: false,
  error: null as string | null,
};

export const getPersonalInfo = createAsyncThunk(
  "auth/getInfo", // Slice name: "tour"
  async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/users/me`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch other data");
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
        state.error = null;
      })
      .addCase(getPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
