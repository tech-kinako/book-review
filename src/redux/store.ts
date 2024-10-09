import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { paginationSlice } from "./paginationSlice";
import { userIdSlice } from "./userId";

export const store = configureStore({
  reducer: {
    user: userIdSlice.reducer,
    pagination: paginationSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
