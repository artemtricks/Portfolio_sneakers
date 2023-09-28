import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISneakers } from "../../App";
import axios from "axios";

export interface Orders {
  items: ISneakers[];
  id?: number;
}

export interface OrderSneakerState {
  order: Orders[];
  status: "loading" | "success" | "error" | "";
  isAddNewOrder: boolean;
}

export interface NewOrderParam {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  isFavorite: boolean;
  isAddToCart: boolean;
  parentId: number;
}

export const fetchOrders = createAsyncThunk<Orders[]>(
  "order/fetchOrder",
  async () => {
    const response = await axios.get(
      "https://1047012a1579016a.mokky.dev/order"
    );
    return response.data as Orders[];
  }
);

export const addNewOrder = createAsyncThunk<
  Orders[],
  NewOrderParam,
  { state: OrderSneakerState }
>("order/addNewOrders", async (CartItems, { getState }) => {
  const state = getState();
  const response = await axios.post(
    `https://1047012a1579016a.mokky.dev/order`,
    { items: CartItems }
  );
  const createOrder = {
    items: [...(state.order[0] as any), response.data],
  };
  return createOrder as any;
});

const initialState: OrderSneakerState = {
  order: [],
  status: "",
  isAddNewOrder: false,
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
    builder.addCase(
      fetchOrders.fulfilled,
      (state, actions: PayloadAction<Orders[]>) => {
        state.order = actions.payload;
        state.status = "success";
        console.log(state.status);
      }
    );
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = "error";
      console.log(state.status);
      state.order = [];
    });
    builder.addCase(addNewOrder.pending, (state) => {
      state.isAddNewOrder = true;
    });
    builder.addCase(
      addNewOrder.fulfilled,
      (state, actions: PayloadAction<any>) => {
        state.order[0] = actions.payload;
        state.isAddNewOrder = false;
      }
    );
    builder.addCase(addNewOrder.rejected, (state) => {
      state.isAddNewOrder = false;
    });
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
