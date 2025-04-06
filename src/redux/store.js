import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slice
import loginReducer from "./loginSlice.js";
import profileReducer from "./profileSlice.js";
import songDetailReducer from "./songDetailSlice.js";
import refreshReducer from "./refreshSlice.js";

const userPersistConfig = {
  key: "profile",
  storage,
  whitelist: ["data"],
};
const persistUserReducer = persistReducer(userPersistConfig, profileReducer);
const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: persistUserReducer,
    songDetail: songDetailReducer,
    refresh: refreshReducer,
  },
});

export default store;

export const persistor = persistStore(store);
