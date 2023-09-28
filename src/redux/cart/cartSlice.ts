import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICartItems, ISneakers } from "../../App";
import axios from "axios";

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
      const updateCartItem = actions.payload;
      // const index = state.cart.findIndex(
      //   (cartItem) => cartItem.id === updateCartItem.id
      // );
      state.cart.push(updateCartItem);
      state.status = "success";
    });
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
