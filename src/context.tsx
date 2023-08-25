import React from "react";
import { ICartItems, ISneakers } from "./App";

export interface IContext {
  items: [] | ISneakers[];
  cartItems: [] | ICartItems[];
  favorites: [] | ISneakers[];
  isItemAdded: (id: number) => boolean;
  onAddToFavorite: (obj: ISneakers) => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<[] | ICartItems[]>>;
  onAddToCart: (obj: ICartItems) => Promise<void>;
  setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<any>({});

export default AppContext;
