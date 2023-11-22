import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { toast } from "react-toastify";

const initialState = {
  voucher: [],
  profile: [],
  becomeProvider: [],
  loadingBecomeProvider: false,
  errorBecomeProvider: null as string | null,
  loadingProvider: false,
  error: null as string | null,
};
export const becomeProvider = createAsyncThunk(
  "provider/becomeProvider",
  async ({
    formData,
    onSuccessCallback,
  }: {
    formData: FormData;
    onSuccessCallback: () => void;
  }) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/provider`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert("Please wait for admin approval.");
      onSuccessCallback();
      console.log(response);
      return response.data;
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
          toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);
export const createProviderAvt = createAsyncThunk(
  "provider/createProviderProfile", // Slice name: "tour"
  async (requestData: any) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/provider/avatar`,
        { file: requestData },
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        // toast.success("Voucher created successfully!");
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to create Availability");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to create Availability!");
      throw new Error("Failed to create Availability");
    }
  }
);
export const createProviderBanner = createAsyncThunk(
  "provider/createProviderBanner", // Slice name: "tour"
  async (requestData: any) => {
    try {
      console.log(requestData);
      const response = await axiosInstance.patch(
        `${BASE_URL}/provider/banner`,
        { file: requestData },
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
          toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);

export const createVoucher = createAsyncThunk(
  "provider/createVoucher",
  async (formData: any) => {
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/voucher/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      // alert("Please wait for admin approval.");
      if (response.status === 201) {
        toast.success("Voucher created successfully!");
      }
      console.log(response);
      return response.data;
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
          toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Setup fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to fetch other data");
    }
  }
);

export const getVoucher = createAsyncThunk("provider/getVoucher", async () => {
  try {
    const pid = localStorage.getItem("id_provider");
    const response = await axiosInstance.get(`${BASE_URL}/voucher`, {
      params: {
        provider: pid,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
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
});
export const updateVoucher = createAsyncThunk(
  "provider/updateVoucher", // Slice name: "tour"
  async (requestData: any) => {
    try {
      console.log(requestData);
      const response = await axiosInstance.patch(
        `${BASE_URL}/voucher/update`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to update Voucher");
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
          toast.error("Update fail"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Update fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to update other data");
    }
  }
);
export const updateVoucherMapTour = createAsyncThunk(
  "provider/updateVoucherMapTour", // Slice name: "tour"
  async (requestData: any) => {
    try {
      console.log(requestData);
      const response = await axiosInstance.patch(
        `${BASE_URL}/voucher/mapTour`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
        return response.data;
      } else {
        // toast.error("Failed to create Availability!"); // Thông báo lỗi khi tạo Availability
        throw new Error("Failed to update Voucher");
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
          toast.error("Update fail"); // Thông báo đăng nhập thất bại mặc định
        }
      } else {
        toast.error("Update fail!"); // Thông báo đăng nhập thất bại mặc định
      }
      throw new Error("Failed to update other data");
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
        state.loadingBecomeProvider = false;
        state.error = action.error.message;
      })
      .addCase(createVoucher.pending, (state) => {
        state.loadingProvider = true;
        state.errorBecomeProvider = null;
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.loadingProvider = false;
        state.errorBecomeProvider = null;
      })
      .addCase(createVoucher.rejected, (state: any, action) => {
        state.loadingProvider = false;
        state.error = action.error.message;
      })
      .addCase(getVoucher.pending, (state) => {
        state.loadingProvider = true;
        state.errorBecomeProvider = null;
      })
      .addCase(getVoucher.fulfilled, (state, action) => {
        state.loadingProvider = false;
        state.voucher = action.payload;
        state.errorBecomeProvider = null;
      })
      .addCase(getVoucher.rejected, (state: any, action) => {
        state.loadingProvider = false;
        state.error = action.error.message;
      });
  },
});

export const { profileProvider } = providerSice.actions;

export const { reducer: providerReducer } = providerSice;
