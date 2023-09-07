import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, axiosInstance } from "../../apiInterceptors";
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
  tourGetDetail: [],
  loadingDetail: false,
  errorDetail: null as string | null,
  loadingCreateTour: false,
  errorCreateTour: null as boolean | null,
};

export const fetchTours = createAsyncThunk("tour/fetchTours", async () => {
  // const token = getTokenFromLocalStorage();
  try {
    const response = await axiosInstance.get(`${BASE_URL}/tour/provider`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log(response)

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch tours");
  }
});
export const fetchTourDetail = createAsyncThunk(
  "tour/getDetailTour",
  async (index: any) => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/tour/detail/${index}`,
      );
      console.log(response);
      return response.data.data.data;
    } catch (error) {
      throw new Error("Failed to fetch tours");
    }
  }
);

// Create another async thunk to fetch other data
export const postCreateTour = createAsyncThunk(
  "tour/postCreateTour", // Slice name: "tour"
  async (requestData: any) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/tour`,
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
      console.log(error);
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
        state.loadingCreateTour = true;
        state.errorCreateTour = null;
      })
      .addCase(postCreateTour.fulfilled, (state, action) => {
        state.loadingCreateTour = false;
        state.otherData = action.payload;
        state.errorCreateTour = null;
      })
      .addCase(postCreateTour.rejected, (state) => {
        state.loadingCreateTour = false;
        state.errorCreateTour = true;
      })
      .addCase(fetchTourDetail.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(fetchTourDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.tourGetDetail = action.payload;
        state.errorDetail = null;
      })
      .addCase(fetchTourDetail.rejected, (state: any, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.error.message;
      });
  },
});

export const { updateTourDetail } = tourSlice.actions;
export const { reducer: tourReducer } = tourSlice;
