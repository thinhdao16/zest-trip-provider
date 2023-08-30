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
  tourGetDetail: [],
  loadingDetail: false,
  errorDetail: null as string | null,
};
// Assume tokenPayload is the decoded payload of the JWT token
const isTokenExpired = (tokenPayload:any) => {
  if (!tokenPayload || !tokenPayload.exp) {
    return true; // If payload or expiration time is missing, consider token expired
  }
  
  const expirationTimeInSeconds = tokenPayload.exp;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  
  return expirationTimeInSeconds < currentTimeInSeconds;
};

const refreshAccessToken = async () => {
  const refreshToken = getTokenFromLocalStorage()?.refresh_token;

  if (refreshToken) {
    try {
      const refreshResponse = await axios.post(
        "https://your-auth-server.com/refresh-token-endpoint",
        {
          refresh_token: refreshToken,
        }
      );
      const newAccessToken = refreshResponse.data.access_token;
      // Update the access token in localStorage or state
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      // Handle refresh token error
      console.error("Failed to refresh access token:", error);
      throw new Error("Failed to refresh access token");
    }
  } else {
    // Handle case when there's no refresh token available
    throw new Error("No refresh token available");
  }
};

// Create an Axios instance with Interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getTokenFromLocalStorage()?.access_token;
    // Check if token is expired
    if (isTokenExpired(accessToken)) {
      return refreshAccessToken()
        .then((newAccessToken) => {
          // Update the request's authorization header with new token
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return config;
        })
        .catch((error) => {
          // Handle refresh token error
          throw error;
        });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchTours = createAsyncThunk("tour/fetchTours", async () => {
  const token = getTokenFromLocalStorage()?.access_token;
  try {
    const response = await axios.get(
      "https://manager-ecom-cllh63fgua-df.a.run.app/tour/provider",
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
export const fetchTourDetail = createAsyncThunk(
  "tour/getDetailTour",
  async (index: any) => {
    const token = getTokenFromLocalStorage()?.access_token;
    try {
      const response = await axios.get(
        `https://manager-ecom-cllh63fgua-df.a.run.app/tour/detail/${index}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    const token = getTokenFromLocalStorage()?.access_token;
    try {
      const response = await axios.post(
        "https://manager-ecom-cllh63fgua-df.a.run.app/tour",
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
