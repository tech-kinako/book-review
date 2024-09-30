import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { paginationSlice } from "./paginationSlice";

export const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
