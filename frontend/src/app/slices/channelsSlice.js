import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], activeChannel: { id: '1', name: 'general' } },
  reducers: {
    setChannels: (state, { payload }) => {
      return { ...state, channels: payload };
    },
    setActiveChannel: (state, { payload }) => {
      return { ...state, activeChannel: payload };
    },
    addChannel: (state, { payload }) => {
      return { ...state, channels: [...state.channels, payload] };
    },
    removeChannel: (state, { payload: { id } }) => {
      return { ...state, channels: state.channels.filter((channel) => channel.id !== id) };
    },
    renameChannel: (state, { payload: { id, name } }) => {
      state.channels.find((channel) => channel.id === id).name = name;
      return {
        ...state,
        channels: state.channels.map((channel) => (channel.id === id ? { ...channel, name } : channel)),
      };
    },
  },
});

export const { setChannels, setActiveChannel, addChannel, removeChannel, renameChannel } = slice.actions;

export default slice.reducer;
