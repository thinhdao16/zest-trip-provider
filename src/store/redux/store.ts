import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./silce/authSilce";
import { tourReducer } from "./silce/tourSlice";
import { providerReducer } from "./silce/providerSlice";
import reviewSlice from "./silce/reviewSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
    provider: providerReducer,
    review: reviewSlice,
  },
  // middleware: [thunk],
});

export default store;
