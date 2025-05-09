// refreshSlice.js
import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: { globalCount: 0 },
  reducers: {
    triggerRefresh: (state) => {
      state.globalCount += 1;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
