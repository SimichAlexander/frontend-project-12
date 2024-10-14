import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi.js";
import authReducer from "../features/auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
