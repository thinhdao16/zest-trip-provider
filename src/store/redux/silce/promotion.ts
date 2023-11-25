import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { toast } from "react-toastify";

const initialState = {
  promotion: [],
  loadingPromotion: false,
  errorPromotion: null as string | null,
  boostPromotion: [],
};

export const boostTour = createAsyncThunk(
  "booking/boostTour",
  async (data: { tour_ids: string[] }) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/provider/boost`, {
        tour_ids: data?.tour_ids,
        redirectUrl: "https://google.com",
      });
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessages = error.response.data.message;

        if (Array.isArray(errorMessages)) {
          errorMessages.forEach((errorMessage: string) => {
            console.log(errorMessage);
            toast.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          toast.error(errorMessages);
        } else {
          toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);

const promotionSice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    // profileProvider: (state, action) => {
    //   state.booking = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(boostTour.pending, (state) => {
        state.loadingPromotion = true;
        state.errorPromotion = null;
      })
      .addCase(boostTour.fulfilled, (state, action) => {
        state.loadingPromotion = false;
        state.boostPromotion = action.payload;
        state.errorPromotion = null;
      })
      .addCase(boostTour.rejected, (state: any, action) => {
        state.loadingPromotion = false;
        state.errorPromotion = action.error.message;
      });
  },
});

export const { reducer: promotionReducer } = promotionSice;
