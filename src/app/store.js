import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteSlice from "../features/favoriteSlice";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/userSlice";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
};
const reducer = combineReducers({
  user: userReducer,
  favoriteFilm: favoriteSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
