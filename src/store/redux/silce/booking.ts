import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { toast } from "react-toastify";

const initialState = {
  booking: [],
  loadingBooking: false,
  errorBooking: null as string | null,
};

export const getBooking = createAsyncThunk("booking/getBooking", async () => {
  try {
    const pid = localStorage.getItem("id_provider");
    const response = await axiosInstance.post(`${BASE_URL}/booking/owned`, {
      provider_id: pid,
      select: "300",
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    // if (error.response && error.response.data && error.response.data.message) {
    //   const errorMessages = error.response.data.message;

    //   if (Array.isArray(errorMessages)) {
    //     errorMessages.forEach((errorMessage: string) => {
    //       console.log(errorMessage);
    //       toast.error(errorMessage);
    //     });
    //   } else if (typeof errorMessages === "string") {
    //     console.log(errorMessages);
    //     toast.error(errorMessages);
    //   } else {
    //     toast.error("Setup fail!");
    //   }
    // } else {
    //   toast.error("Setup fail!");
    // }
    throw new Error("Failed to fetch other data");
  }
});

export const acceptRefund = createAsyncThunk(
  "booking/acceptRefund", // Slice name: "tour"
  async (requestData: any) => {
    try {
      const formData = new FormData();
      formData.append("file", requestData?.File);
      const response = await axiosInstance.patch(
        `${BASE_URL}/booking/refund/accept/${requestData?.booking_id}`,
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create Availability");
      }
    } catch (error: any) {
      console.log(error);
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
          toast.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const createRefundForCus = createAsyncThunk(
  "booking/createRefundForCus", // Slice name: "tour"
  async (requestData: any) => {
    try {
      console.log(requestData);
      const formData = new FormData();
      formData.append("file", requestData?.File);
      formData.append("booking_id", requestData?.booking_id);
      formData.append("reason", requestData?.reason);

      const response = await axiosInstance.patch(
        `${BASE_URL}/booking/refund/issue`,
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create refund");
      }
    } catch (error: any) {
      console.log(error);
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
          toast.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
const bookingSice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // profileProvider: (state, action) => {
    //   state.booking = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooking.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.booking = action.payload;
        state.errorBooking = null;
      })
      .addCase(getBooking.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      })
      .addCase(acceptRefund.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(acceptRefund.fulfilled, (state) => {
        state.loadingBooking = false;
        state.errorBooking = null;
      })
      .addCase(acceptRefund.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      })
      .addCase(createRefundForCus.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(createRefundForCus.fulfilled, (state) => {
        state.loadingBooking = false;
        state.errorBooking = null;
      })
      .addCase(createRefundForCus.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: bookingReducer } = bookingSice;
