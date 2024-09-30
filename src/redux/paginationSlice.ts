import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPagination {
  currentPage: number;
}

const initialState: IPagination = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;
