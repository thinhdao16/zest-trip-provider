import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";

const initialState = {
  profile: [],
  becomeProvider: [],
  loadingBecomeProvider: false,
  errorBecomeProvider: null as string | null,
  loading: false,
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
    } catch (error) {
      console.log(error);
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
      if (response.status === 200) {
        // toast.success("Availability created successfully!"); // Thông báo tạo Availability thành công
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
    } catch (error) {
      console.log(error);
      // toast.error("Failed to create Availability!");
      throw new Error("Failed to create Availability");
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
