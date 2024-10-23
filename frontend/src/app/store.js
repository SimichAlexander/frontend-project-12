import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi.js";
import authReducer from "./slices/auth/authSlice.js";
import channelsReducer from "./slices/chat/channelsSlice.js";
import messagesReducer from "./slices/chat/messagesSlice.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
