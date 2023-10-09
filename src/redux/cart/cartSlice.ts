import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICartItems } from "../../App";
import axios from "axios";
import { RootState } from "../store";

export interface CartSneakerState {
  cart: ICartItems[];
  status: "loading" | "success" | "error" | "";
}

export const fetchCart = createAsyncThunk<ICartItems[]>(
  "cart/fetchCart",
  async () => {
    const response = await axios.get<ICartItems[]>(
      "https://1047012a1579016a.mokky.dev/cart"
    );

    return response.data as ICartItems[];
  }
);

export const addNewCartItem = createAsyncThunk<ICartItems, ICartItems>(
  "cart/addNewCartItem",
  async (items) => {
    const { isAddToCart, id } = items;
    const response = await axios.post<ICartItems>(
      `https://1047012a1579016a.mokky.dev/cart`,
      { ...items, isAddToCart: !isAddToCart, parentId: id }
    );

    return response.data as ICartItems;
  }
);

export const deleteCartItem = createAsyncThunk<ICartItems[], ICartItems>(
  "cart/deleteCartItem",
  async (items, { getState }) => {
    await axios.delete<ICartItems>(
      `https://1047012a1579016a.mokky.dev/cart/${items.id}`
    );
    const state = getState() as RootState;
    const updatedCart = state.cart.cart.filter(
      (cartItem) => cartItem.id !== items.id
    );
    return updatedCart;
  }
);

const initialState: CartSneakerState = {
  cart: [],
  status: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts(state, actions) {
      state.cart = actions.payload;
    },
    deleteCart(state, action) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
      console.log(state.status);
      state.cart = [];
    });
    builder.addCase(
      fetchCart.fulfilled,
      (state, actions: PayloadAction<ICartItems[]>) => {
        state.cart = actions.payload;
        state.status = "success";
        console.log(state.status);
      }
    );
    builder.addCase(fetchCart.rejected, (state) => {
      state.status = "error";
      state.cart = [];
      console.log(state.status);
    });
    builder.addCase(addNewCartItem.fulfilled, (state, actions) => {
      state.cart.push(actions.payload);
      state.status = "success";
    });
    builder.addCase(
      deleteCartItem.fulfilled,
      (state, action: PayloadAction<ICartItems[]>) => {
        state.cart = action.payload;
        console.log(state.status);
      }
    );
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
