import { configureStore } from "@reduxjs/toolkit";
import sneaker from "./sneaker/sneakerSlice";
import order from "./order/orderSlice";
import cart from "./cart/cartSlice";
import favorite from "./favorite/sliceFavorite";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    sneaker,
    order,
    cart,
    favorite,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
