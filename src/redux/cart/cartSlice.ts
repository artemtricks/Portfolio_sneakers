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

// export const addNewCartItem = createAsyncThunk<ICartItems, ICartItems>(
//   "cart/addNewCartItem",
//   async (params) => {
//     const { id, isAddToCart } = params;
//     const response = await axios.patch<ICartItems>(
//       `https://1047012a1579016a.mokky.dev/items/${id}`,
//       { isAddToCart: !isAddToCart }
//     );

//     return response.data as ICartItems;
//   }
// );

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
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
