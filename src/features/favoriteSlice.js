import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favoriteFilm",
  initialState,

  reducers: {
    addToFavoritesFilm: (state, action) => {
      if (!state.favorites) {
        console.log("favoriteFilm array is undefined or null");
        return;
      }

      const existingFilm = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (!existingFilm) {
        state.favorites.push(action.payload);
      }
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToFavoritesFilm, removeFromFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
