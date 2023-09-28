import { RootState } from "../store";

export const selectCartData = (state: RootState) => state.cart;
export const selectCartAdd = (state: RootState) => state.cart.cart;
