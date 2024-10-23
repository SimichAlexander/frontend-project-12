import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "channels",
  initialState: { channels: [], activeChannel: "1" },
  reducers: {
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload
      );
    },
  },
});

export const { setChannels, setActiveChannel, addChannel, removeChannel } =
  slice.actions;

export default slice.reducer;
