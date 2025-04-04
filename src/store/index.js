import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice.js";
import profileReducer from "../slice/profileSlice.js";
import songDetailReducer from "../slice/songDetailSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    songDetail: songDetailReducer,
  },
});

export default store;
