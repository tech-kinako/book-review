import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  user: string;
}

const initialState: IUser = {
  user: "",
};

export const userIdSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userIdSlice.actions;
