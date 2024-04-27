import { createSlice } from "@reduxjs/toolkit";
import { ISneakers } from "../../App";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";

export interface CartSneakerState {
  cart: ISneakers[];
  status: "loading" | "success" | "error" | "";
}

const items = getCartFromLocalStorage();

const initialState: CartSneakerState = {
  cart: items,
  status: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const findItem = state.cart.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
    minusCart(state, action) {
      const findItem = state.cart.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
    },
    deleteCart(state, action) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addCart, deleteCart, clearCart, minusCart } = cartSlice.actions;
export default cartSlice.reducer;
