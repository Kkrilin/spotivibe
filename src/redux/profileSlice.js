import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  artists: [],
  playlists: [],
  likedSongs: [],
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
      state.artists = action.payload.data;
    },
    addArtist(state, action) {
      state.artists.push(action.payload.data);
    },
    removeArtist(state, action) {
      state.artists = state.artists.filter(
        (art) => art.id !== action.payload.id
      );
    },
    setPlalists(state, action) {
      state.playlists = action.payload.data;
    },
    addPlaylist(state, action) {
      state.playlists.push(action.payload.data);
    },
    removePlaylist(state, action) {
      state.playlists = state.playlists.filter(
        (pl) => pl.id !== action.payload.id
      );
    },
    addItemToPlaylist(state, action) {
      state.playlists = state.playlists.map((pl) => {
        if (pl.id === action.payload.plId) {
          pl.push(action.payload.item);
          return pl;
        } else {
          return pl;
        }
      });
    },
    setLikedSongs(state, action) {
      state.likedSongs = action.payload.data;
    },
  },
});

export const {
  setProfileData,
  setArtists,
  addArtist,
  removeArtist,
  setPlalists,
  addPlaylist,
  removePlaylist,
  addItemToPlaylist,
  setLikedSongs,
} = profileSlice.actions;

export default profileSlice.reducer;
