import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tours: [],
  loading: false,
  error: null as string | null,
};

// Create an async thunk to fetch the list of tours
export const fetchTours = createAsyncThunk("tour/fetchTours", async () => {
  const response = await axios.get("https://f-home-be.vercel.app/getAllUsers");
  return response.data; // Assuming the API response contains the list of tours
});

const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTours.pending, (state) => {
          state.loading = true;
          state.error = null; // Set error to null
        })
        .addCase(fetchTours.fulfilled, (state, action) => {
          state.loading = false;
          state.tours = action.payload;
          state.error = null; // Set error to null
        })
        .addCase(fetchTours.rejected, (state:any, action) => {
          state.loading = false;
          state.error = action.error.message; // Assign error message here
        });
    },
  });

export const { reducer: tourReducer } = tourSlice; // Exporting named export
