import { createSlice } from '@reduxjs/toolkit';

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
  name: 'profile',
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
      state.artists = state.artists.filter((art) => art.id !== action.payload.id);
    },
    setPlalists(state, action) {
      state.playlists = action.payload.data;
    },
    addPlaylist(state, action) {
      state.playlists.push(action.payload.data);
    },
    removePlaylist(state, action) {
      state.playlists = state.playlists.filter((pl) => pl.id !== action.payload.id);
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
    removeItemToPlaylist(state, action) {
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
    addLikeSong(state, action) {
      state.likedSongs.push(action.payload.item);
    },
    removeLikeSong(state, action) {
      state.likedSongs = state.likedSongs.filter(
        (track) => (track.track.id || track.id) !== action.payload.id
      );
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
  addLikeSong,
  removeLikeSong,
  removeItemToPlaylist,
} = profileSlice.actions;

export default profileSlice.reducer;
