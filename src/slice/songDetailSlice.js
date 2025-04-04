import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songDetail: null,
  open: false,
  loading: true,
  error: false,
};

const songDetailSlice = createSlice({
  name: "songDetail",
  initialState,
  reducers: {
    setSongDetail(state, action) {
      console.log('action.payload.data', action.payload.data)
      state.songDetail = action.payload.data;
      state.open = true;
      state.loading = false;
      state.error = false;
    },
    closeSongDetail(state) {
      state.open = false;
    },
  },
});

export const { setSongDetail, closeSongDetail } = songDetailSlice.actions;

export default songDetailSlice.reducer;
