import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { message } from "antd";

const initialState = {
  isLoggedIn: false,
  user: null,
  personalInfo: {},
  check: "abc ",
  loading: false,
  error: null as string | null,
  commision: [],
  boost: [],
  wallet: [],
  listBank: [],
  walletTransaction: [],
  reporter: [],
};

export const getPersonalInfo = createAsyncThunk("auth/getInfo", async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/provider/profile`);
    localStorage.setItem("id_provider", response.data.data.id);

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch other data");
  }
});

export const getCommistionRate = createAsyncThunk(
  "auth/getCommistionRate",
  async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/global/commission-rate`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch other data");
    }
  }
);
export const getBoostPrice = createAsyncThunk(
  "auth/getBoostPrice",
  async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/global/boost-price`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch other data");
    }
  }
);
export const getWalletMe = createAsyncThunk("auth/getWalletMe", async () => {
  try {
    const idProvider = localStorage.getItem("id_provider");
    const response = await axiosInstance.get(`${BASE_URL}/user-wallet/me`, {
      data: {
        user_id: idProvider,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch other data");
  }
});

export const getWalletTransactionMe = createAsyncThunk(
  "auth/getWalletTransactionMe",
  async () => {
    try {
      const idUser = localStorage.getItem("user_id");
      const response = await axiosInstance.get(
        `${BASE_URL}/user-wallet/withdraw/user/${idUser}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch other data");
    }
  }
);

export const getListBank = createAsyncThunk("auth/getListBank", async () => {
  try {
    const response = await axiosInstance.get(`https://api.vietqr.io/v2/banks`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch other data");
  }
});

export const getReporter = createAsyncThunk("auth/getReporter", async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/report`);
    return response.data.data.providers;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch other data");
  }
});
export const postWithDraw = createAsyncThunk(
  "auth/postWithDraw",
  async (data: any) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/user-wallet/withdraw-all`,
        {
          bankName: data.bankName,
          bankAccountNumber: data.bankAccountNumber,
          bankAccountName: data.bankAccountName,
        }
      );
      console.log(response);
      if (response.status === 201) {
        message.success("Withdraw successfully wait admin ");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      message.error("Fail withdraw");
      throw new Error("Failed to fetch other data");
    }
  }
);
export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (data: any) => {
    console.log(data);
    try {
      const response = await axiosInstance.put(`${BASE_URL}/provider`, {
        ...data,
      });
      console.log(response);
      if (response.status === 200) {
        message.success("Update profile successfully");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      message.error("Fail withdraw");
      throw new Error("Failed to fetch other data");
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    personalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
        state.error = null;
      })
      .addCase(getPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(getCommistionRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommistionRate.fulfilled, (state, action) => {
        state.loading = false;
        state.commision = action.payload;
        state.error = null;
      })
      .addCase(getCommistionRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getBoostPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoostPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.boost = action.payload;
        state.error = null;
      })
      .addCase(getBoostPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getWalletMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletMe.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
        state.error = null;
      })
      .addCase(getWalletMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getListBank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListBank.fulfilled, (state, action) => {
        state.loading = false;
        state.listBank = action.payload;
        state.error = null;
      })
      .addCase(getListBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(postWithDraw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postWithDraw.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(postWithDraw.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getWalletTransactionMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletTransactionMe.fulfilled, (state, action) => {
        state.loading = false;
        state.walletTransaction = action.payload;
        state.error = null;
      })
      .addCase(getWalletTransactionMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getReporter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReporter.fulfilled, (state, action) => {
        state.loading = false;
        state.reporter = action.payload;
        state.error = null;
      })
      .addCase(getReporter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
