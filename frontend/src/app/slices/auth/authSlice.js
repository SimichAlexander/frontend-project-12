import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    username: localStorage.getItem("username") || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.username = payload.username;
      state.token = payload.token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
