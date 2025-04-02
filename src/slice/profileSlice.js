import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
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
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
