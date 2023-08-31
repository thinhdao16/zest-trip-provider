import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../apiInterceptors";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  if (token !== null) {
    const parsedToken = JSON.parse(token); // Parse the JSON token
    return parsedToken;
  }
  return null; // Handle the case when token is not found or null
};

const initialState = {
  profile: [],
  becomeProvider: [],
  loadingBecomeProvider: false,
  errorBecomeProvider: null as string | null,
};
export const becomeProvider = createAsyncThunk(
  "provider/becomeProvider", // Slice name: "tour"
  async (requestData: any) => {
    const token = getTokenFromLocalStorage()?.access_token;
    try {
      const response = await axios.post(
        `${BASE_URL}/provider`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch other data");
    }
  }
);
const providerSice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    profileProvider: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(becomeProvider.pending, (state) => {
        state.loadingBecomeProvider = true;
        state.errorBecomeProvider = null;
      })
      .addCase(becomeProvider.fulfilled, (state, action) => {
        state.loadingBecomeProvider = false;
        state.becomeProvider = action.payload;
        state.errorBecomeProvider = null;
      })
      .addCase(becomeProvider.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { profileProvider } = providerSice.actions;

export const { reducer: providerReducer } = providerSice;
