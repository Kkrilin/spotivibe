import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songDetail: null,
  open: false,
  loading: true,
  error: false,
  sideBarStyle: {},
};

const songDetailSlice = createSlice({
  name: "songDetail",
  initialState,
  reducers: {
    setSongDetail(state, action) {
      console.log("action.payload.data", action.payload.data);
      state.songDetail = action.payload.data;
      state.open = true;
      state.loading = false;
      state.error = false;
      state.sideBarStyle = {};
    },
    closeSongDetail(state) {
      state.open = false;
      state.sideBarStyle = {
        marginLeft: "-10px",
        width: "0rem",
        animation: "hide 0.4s backwards",
      };
    },
  },
});

export const { setSongDetail, closeSongDetail } = songDetailSlice.actions;

export default songDetailSlice.reducer;
