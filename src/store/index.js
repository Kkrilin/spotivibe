import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice.js";
import profileReducer from "../slice/profileSlice.js";

const store = configureStore({
  reducer: { login: loginReducer, profile: profileReducer },
});

export default store;
