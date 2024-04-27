import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISneakers } from "../../App";
import axios from "axios";

interface SneakersSliceState {
  items: ISneakers[];
  status: "loading" | "success" | "error" | "";
}

export interface FavoriteSneakerParam {
  isFavorite: boolean;
  id: number;
}

export interface CartSneakerParam {
  id: number;
}

export const fetchSneakers = createAsyncThunk<ISneakers[]>(
  "sneakers/fetchSneakers",
  async () => {
    const response = await axios.get<ISneakers[]>(
      "https://1047012a1579016a.mokky.dev/items"
    );
    return response.data as ISneakers[];
  }
);

const initialState: SneakersSliceState = {
  items: [],
  status: "",
};

const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, isFavorite: !action.payload.isFavorite };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSneakers.pending, (state) => {
      state.status = "loading";
      console.log(state.status);
      state.items = [];
    });
    builder.addCase(
      fetchSneakers.fulfilled,
      (state, action: PayloadAction<ISneakers[]>) => {
        state.items = action.payload;
        state.status = "success";
        console.log(state.status);
      }
    );
    builder.addCase(fetchSneakers.rejected, (state) => {
      state.status = "error";
      state.items = [];
      console.log(state.status);
    });
  },
});

export const { toggleFavorite } = sneakerSlice.actions;
export default sneakerSlice.reducer;
