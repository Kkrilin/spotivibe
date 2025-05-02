import { configureStore } from '@reduxjs/toolkit';

// slice
import profileReducer from './profileSlice.js';
import songDetailReducer from './songDetailSlice.js';
import refreshReducer from './refreshSlice.js';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    songDetail: songDetailReducer,
    refresh: refreshReducer,
  },
});

export default store;
