import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const slice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessage: (state, { payload }) => {
      state.messages = state.messages.filter(
        (message) => message.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload: { id } }) => {
      state.messages = state.messages.filter(
        (message) => message.channelId !== id
      );
    });
  },
});

export const { setMessages, addMessage, removeMessage } = slice.actions;

export default slice.reducer;
