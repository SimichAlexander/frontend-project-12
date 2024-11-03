import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], activeChannel: { id: '1', name: 'general' } },
  reducers: {
    setActiveChannel: (state, { payload }) => ({ ...state, activeChannel: payload }),
  },
});
export const { setActiveChannel } = slice.actions;

export default slice.reducer;
