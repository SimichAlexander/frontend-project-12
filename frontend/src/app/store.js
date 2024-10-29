import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
