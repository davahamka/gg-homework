import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1],
  },
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export default authSlice.reducer;
