import { RootState } from "../store";

export const selectSneakerData = (state: RootState) => state.sneaker;
export const selectFavoriteData = (state: RootState) => state.sneaker.items;
