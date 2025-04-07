import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songDetail: null,
  open: false,
  loading: true,
  error: false,
  sideBarStyle: {},
  songLike: false,
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
    likeSong(state, action) {
      state.songLike = action.payload.data;
    },
  },
});

export const { setSongDetail, closeSongDetail, likeSong } =
  songDetailSlice.actions;

export default songDetailSlice.reducer;
