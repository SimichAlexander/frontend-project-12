import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi.js';
import { channelsApi } from './services/channelsApi.js';
import channelsReducer from './slices/channelsSlice.js';
import { messagesApi } from './services/messagesApi.js';

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    channels: channelsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
});
