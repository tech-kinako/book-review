import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

interface IAuth {
  isSignIn: boolean;
}

const cookies = new Cookies();

const initialState: IAuth = {
  isSignIn: cookies.get("token") !== undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
      cookies.remove("token");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
