import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://railway.bookreview.techtrain.dev",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
