import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  artists: [],
  playlists: [],
  login: false,
  loading: true,
  error: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.login = true;
      state.data = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    setArtists(state, action) {
      console.log(action, 'action')
      state.artists = action.payload.data;
    },
    setPlalists(state, action) {
      state.playlists = action.payload.data;
    },
  },
});

export const { setProfileData, setArtists, setPlalists } = profileSlice.actions;

export default profileSlice.reducer;
