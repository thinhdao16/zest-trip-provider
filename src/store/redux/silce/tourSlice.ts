import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, axiosInstance } from "../../apiInterceptors";
import { toast } from "react-toastify";

const initialState = {
  tours: [],
  otherData: [],
  loading: false,
  error: null as string | null,
  tourDetail: [],
  tourGetDetail: [],
  tagTour: [],
  vehicleTour: [],
  loadingDetail: false,
  errorDetail: null as string | null,
  loadingCreateTour: false,
  errorCreateTour: null as boolean | null,
  loadingTourImageDetail: false,
  availabilityAll: [],
};

export const fetchTours = createAsyncThunk(
  "tour/fetchTours",
  async (pagination: any) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/tour/provider`, {
        params: {
          search: pagination?.valueSeacrch,
          limit: pagination?.pageSize,
          page: pagination?.currentPage,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("Failed to fetch tours");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tours!");
      throw new Error("Failed to fetch tours");
    }
  }
);

export const fetchTourDetail = createAsyncThunk(
  "tour/getDetailTour",
  async (index: string) => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/tour/detail/${index}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch tours");
    }
  }
);

export const getTagTour = createAsyncThunk("tour/getTagTour", async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/resource/tag`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch tours");
  }
});
export const getVehicleTour = createAsyncThunk(
  "tour/getVehicleTour",
  async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/resource/vehicle`);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch tours");
    }
  }
);
// Create another async thunk to fetch other data
export const postCreateTour = createAsyncThunk(
  "tour/postCreateTour", // Slice name: "tour"
  async (requestData: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/tour`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Tour created successfully!"); // Thông báo tạo tour thành công
        return response.data;
      } else {
        toast.error("Failed to create tour!"); // Thông báo lỗi khi tạo tour
        throw new Error("Failed to create tour");
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

export const postCreateAvailabilityTour = createAsyncThunk(
  "tour/postCreateAvailabilityTour", // Slice name: "tour"
  async (requestDataAvailability: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/availability`,
        requestDataAvailability,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create Availability");
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

export const postCreateTicketTour = createAsyncThunk(
  "tour/postCreateTicketTour", // Slice name: "tour"
  async (requestDataTicket: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/pricing`,
        requestDataTicket,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create Availability");
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

export const addTourImage = createAsyncThunk(
  "tour/addTourImage", // Slice name: "tour"
  async (requestData: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/tour/tourImage/${requestData?.id}`,
        requestData?.formDataImg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error("Failed to create tour!"); // Thông báo lỗi khi tạo tour
        throw new Error("Failed to create tour");
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

export const editContentTour = createAsyncThunk(
  "tour/editContentTour", // Slice name: "tour"
  async (requestData: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/tour/content/${requestData?.id}`,
        requestData?.dataValue,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error("Failed to create tour!"); // Thông báo lỗi khi tạo tour
        throw new Error("Failed to create tour");
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

export const editTicketTour = createAsyncThunk(
  "tour/editTicketTour", // Slice name: "tour"
  async (requestDataTicket: any) => {
    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/pricing/update`,
        requestDataTicket,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to create ticket");
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
export const editTicketAvailability = createAsyncThunk(
  "tour/editTicketAvailability", // Slice name: "tour"
  async (requestDataAvai: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/availability/update/${requestDataAvai?.id}`,
        requestDataAvai,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create Availability");
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
export const editStatusTour = createAsyncThunk(
  "tour/editStatusTour", // Slice name: "tour"
  async (requestDataTicket: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/tour/status`,
        requestDataTicket,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to create ticket");
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
export const getAvailability = createAsyncThunk(
  "tour/getAvailability",
  async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/availability/all`);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch availability");
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
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
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

      .addCase(postCreateTicketTour.pending, (state) => {
        state.loadingCreateTour = true;
        state.errorCreateTour = null;
      })
      .addCase(postCreateTicketTour.fulfilled, (state, action) => {
        state.loadingCreateTour = false;
        state.otherData = action.payload;
        state.errorCreateTour = null;
      })
      .addCase(postCreateTicketTour.rejected, (state) => {
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
      .addCase(fetchTourDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.error.message || null;
      })
      .addCase(getTagTour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTagTour.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getTagTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tagTour = action.payload;
        state.error = null;
      })
      .addCase(getVehicleTour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicleTour.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getVehicleTour.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicleTour = action.payload;
        state.error = null;
      })
      .addCase(addTourImage.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(addTourImage.fulfilled, (state) => {
        state.loadingDetail = false;
        state.error = null;
      })
      .addCase(addTourImage.rejected, (state) => {
        state.loadingDetail = false;
        state.error = null;
      })
      .addCase(editContentTour.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(editContentTour.fulfilled, (state) => {
        state.loadingDetail = false;
        state.error = null;
      })
      .addCase(editContentTour.rejected, (state) => {
        state.loadingDetail = false;
        state.error = null;
      })
      .addCase(getAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.availabilityAll = action.payload;
        state.error = null;
      })
      .addCase(getAvailability.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { updateTourDetail } = tourSlice.actions;
export const { reducer: tourReducer } = tourSlice;
