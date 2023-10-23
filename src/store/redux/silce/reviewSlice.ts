import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { BASE_URL } from "../../apiInterceptors";
import { toast } from "react-toastify";

const initialState = {
  review: [],
  loading: false,
  error: null as string | null,
};

// Định nghĩa createAsyncThunk
export const getReview = createAsyncThunk("review/getReview", async () => {
  try {
    const idUser = localStorage.getItem("id_provider");
    const response = await axiosInstance.get(
      `${BASE_URL}/review/provider/${idUser}`,
      {}
    );
    toast.success("This is review!");
    return response.data.data;
  } catch (error) {
    toast.error("Failed to get review!");
    throw new Error("Failed to fetch tours");
  }
});

export const replyReview = createAsyncThunk(
  "review/replyReview",
  async (data: any) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/review/${data?.tourId}/reply/${data.id}`,
        { content: data?.content }
      );
      toast.success("Reply success!");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to reply!");
      throw new Error("Failed to fetch tours");
    }
  }
);
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    // Định nghĩa các reducers ở đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.review = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

// Trích xuất ra các action creators
// export const {
// } = reviewSlice.actions;

// Export reducer
export default reviewSlice.reducer;
