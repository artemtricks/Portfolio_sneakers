import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISneakers } from "../../App";

import { getFavoriteFromLocalStorage } from "../../utils/getFavoriteFromLocalStorage";

export interface CartSneakerState {
  favorite: Omit<ISneakers, "count">[];
}

const items = getFavoriteFromLocalStorage();

const initialState: CartSneakerState = {
  favorite: items,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Omit<ISneakers, "count">>) {
      const findItem = state.favorite.find(
        (item) => item.id === action.payload.id
      );
      if (!findItem) {
        state.favorite.push({ ...action.payload, isFavorite: true });
      } else {
        state.favorite = state.favorite.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
