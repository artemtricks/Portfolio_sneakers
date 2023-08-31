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

export const fetchSnekers = createAsyncThunk<ISneakers[]>(
  "sneakers/fetchSneakers",
  async () => {
    const response = await axios.get<ISneakers[]>(
      "https://7c51c28aa165f47d.mokky.dev/items"
    );
    return response.data as ISneakers[];
  }
);

export const updateFavoriteSneaker = createAsyncThunk<
  ISneakers,
  FavoriteSneakerParam
>("sneakers/updateFavoriteStatus", async (params) => {
  const { id, isFavorite } = params;
  const response = await axios.patch<ISneakers>(
    `https://7c51c28aa165f47d.mokky.dev/items/${id}`,
    { isFavorite: !isFavorite }
  );
  return response.data as ISneakers;
});

const initialState: SneakersSliceState = {
  items: [],
  status: "",
};

const sneakerSlice = createSlice({
  name: "sneaker",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSnekers.pending, (state) => {
      state.status = "loading";
      console.log(state.status);
      state.items = [];
    });
    builder.addCase(
      fetchSnekers.fulfilled,
      (state, action: PayloadAction<ISneakers[]>) => {
        state.items = action.payload;
        state.status = "success";
        console.log(state.status);
      }
    );
    builder.addCase(fetchSnekers.rejected, (state) => {
      state.status = "error";
      state.items = [];
      console.log(state.status);
    });
    builder.addCase(updateFavoriteSneaker.fulfilled, (state, action) => {
      const updatedSneaker = action.payload;
      console.log(action.payload);
      const index = state.items.findIndex(
        (sneaker: ISneakers) => sneaker.id === updatedSneaker.id
      );

      state.items[index] = updatedSneaker;
    });
  },
});

export const { setItems } = sneakerSlice.actions;
export default sneakerSlice.reducer;
