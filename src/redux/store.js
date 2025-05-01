import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slice
import loginReducer from "./loginSlice.js";
import profileReducer from "./profileSlice.js";
import songDetailReducer from "./songDetailSlice.js";
import refreshReducer from "./refreshSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    songDetail: songDetailReducer,
    refresh: refreshReducer,
  },
});

export default store;
