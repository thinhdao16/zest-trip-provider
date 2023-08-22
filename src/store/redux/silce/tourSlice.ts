import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Function to retrieve token from localStorage
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  if (token !== null) {
    const parsedToken = JSON.parse(token); // Parse the JSON token
    return parsedToken;
  }
  return null; // Handle the case when token is not found or null
};

const initialState = {
  tours: [],
  otherData: [],
  loading: false,
  error: null as string | null,
  tourDetail: [],
};


// Create an async thunk to fetch the list of tours
export const fetchTours = createAsyncThunk("tour/fetchTours", async () => {
  const token = getTokenFromLocalStorage()?.data?.access_token;
  try {
    const response = await axios.get(
      "https://tour-ecom-cllh63fgua-df.a.run.app/tour",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch tours");
  }
});

// Create another async thunk to fetch other data
export const postCreateTour = createAsyncThunk(
  "tour/postCreateTour", // Slice name: "tour"
  async (requestData: any) => {
    const token = getTokenFromLocalStorage()?.data?.access_token;
    try {
      const response = await axios.post(
        "https://manager-ecom-cllh63fgua-df.a.run.app/tour",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch other data");
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    updateTourDetail: (state, action) => {
      state.tourDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
        state.error = null;
      })
      .addCase(fetchTours.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postCreateTour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreateTour.fulfilled, (state, action) => {
        state.loading = false;
        state.otherData = action.payload;
        state.error = null;
      })
      .addCase(postCreateTour.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTourDetail } = tourSlice.actions;
export const { reducer: tourReducer } = tourSlice;
