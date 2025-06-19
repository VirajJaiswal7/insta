// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);
