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

const songDetailPersist = {
  key: "songDetail",
  storage,
  whitelist: ["songDetail", "songLike"],
};
const persistUserReducer = persistReducer(userPersistConfig, profileReducer);
const persistSongDetailReducer = persistReducer(
  songDetailPersist,
  songDetailReducer
);
const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: persistUserReducer,
    songDetail: persistSongDetailReducer,
    refresh: refreshReducer,
  },
});

export default store;

export const persistor = persistStore(store);
