import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSilce";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
