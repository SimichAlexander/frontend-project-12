import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "channels",
  initialState: { channels: [], activeChannel: { id: "1", name: "general" } },
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
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    renameChannel: (state, { payload: { id, name } }) => {
      state.channels.find((channel) => channel.id === id).name = name;
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = slice.actions;

export default slice.reducer;
