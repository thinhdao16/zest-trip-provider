import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { message } from "antd";

const initialState = {
  booking: [],
  bookingDetail: [],
  loadingBooking: false,
  errorBooking: null as string | null,
};

export const getBooking = createAsyncThunk(
  "booking/getBooking",
  async (data: any) => {
    try {
      const pid = localStorage.getItem("id_provider");
      const response = await axiosInstance.post(`${BASE_URL}/booking/owned`, {
        provider_id: pid,
        select: "1000",
        ...data,
      });
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      throw new Error("Failed to fetch other data");
    }
  }
);

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
        message.success("Accept refund successfully!");
        return response.data;
      } else {
        // message.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        message.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const createRefundForCus = createAsyncThunk(
  "booking/createRefundForCus", // Slice name: "tour"
  async (requestData: any) => {
    try {
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
        message.success("Create issue successfully!");
        return response.data;
      } else {
        // message.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to Issue Refund");
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        message.error("Accept fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);

export const getBookingDetail = createAsyncThunk(
  "booking/getBookingDetail",
  async (idBookDetail: string) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/booking/owned`, {
        tour_id: idBookDetail,
        select: "1000",
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Setup fail!");
        }
      } else {
        message.error("Setup fail!");
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const cancelTour = createAsyncThunk(
  "booking/cancelTour",
  async (idBookDetail: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/booking/cancel/${idBookDetail?.idTour}`,
        {
          date: idBookDetail?.dataDate,
          reason: idBookDetail?.reason,
        }
      );
      if (response.status === 201) {
        message.success("Cancell success");
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Setup fail!");
        }
      } else {
        message.error("Setup fail!");
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const blockTour = createAsyncThunk(
  "booking/blockTour",
  async (idBookDetail: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/booking/block/${idBookDetail?.idTour}`,
        {
          date: idBookDetail?.dataDate,
        }
      );
      if (response.status === 201) {
        message.success("Block success");
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Setup fail!");
        }
      } else {
        message.error("Setup fail!");
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const unBlockTour = createAsyncThunk(
  "booking/unBlockTour",
  async (idBookDetail: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/booking/block-remove/${idBookDetail?.idTour}`,
        {
          date: idBookDetail?.dataDate,
        }
      );
      if (response.status === 200) {
        message.success("Unblock success");
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
            message.error(errorMessage);
          });
        } else if (typeof errorMessages === "string") {
          console.log(errorMessages);
          message.error(errorMessages);
        } else {
          message.error("Setup fail!");
        }
      } else {
        message.error("Setup fail!");
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
      })
      .addCase(getBookingDetail.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(getBookingDetail.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.bookingDetail = action.payload;
        state.errorBooking = null;
      })
      .addCase(getBookingDetail.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      })

      .addCase(cancelTour.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(cancelTour.fulfilled, (state) => {
        state.loadingBooking = false;
        state.errorBooking = null;
      })
      .addCase(cancelTour.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      })

      .addCase(blockTour.pending, (state) => {
        state.loadingBooking = true;
        state.errorBooking = null;
      })
      .addCase(blockTour.fulfilled, (state) => {
        state.loadingBooking = false;
        state.errorBooking = null;
      })
      .addCase(blockTour.rejected, (state: any, action) => {
        state.loadingBooking = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: bookingReducer } = bookingSice;
