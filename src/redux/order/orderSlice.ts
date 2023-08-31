import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISneakers } from "../../App";
import axios from "axios";
import sneakerSlice from "../sneaker/sneakerSlice";

interface Orders {
  items: ISneakers[];
  id?: number;
}

interface OrderSneakerState {
  order: Orders[];
  status: "loading" | "success" | "error" | "";
}

export const fetchOrders = createAsyncThunk<ISneakers[]>(
  "order/fetchOrder",
  async () => {
    const response = await axios.get(
      "https://7c51c28aa165f47d.mokky.dev/orders"
    );
    return response.data as ISneakers[];
  }
);

const initialState: OrderSneakerState = {
  order: [],
  status: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
      console.log(state.status);
      state.order = [];
    });
    builder.addCase(fetchOrders.fulfilled, (state, actions: any) => {
      state.order = actions.payload;
      state.status = "success";
      console.log(state.order);
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = "error";
      console.log(state.status);
      state.order = [];
    });
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
