import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: true,
  },
  reducers: {
    toggleFav: (state) => {
      state.favorite = true;
    },
    toggleRemoveFav: (state) => {
      state.favorite = false;
    },
  },
});
export const { toggleFav, toggleRemoveFav } = favSlice.actions;
export default favSlice.reducer;
