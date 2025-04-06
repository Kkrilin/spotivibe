import { createSlice } from "@reduxjs/toolkit";

const loginState = {
  myClientId: "",
  loading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: loginState,
  reducers: {
    error(state, action) {
      state.error = action.payload;
    },
    setMyClientId(state, action) {
      state.myClientId = action.payload.clientId;
    },
  },
});

export const { setMyClientId } = loginSlice.actions;

export default loginSlice.reducer;
