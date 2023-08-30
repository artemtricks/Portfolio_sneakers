import React from "react";
import { ICartItems, ISneakers } from "./App";

export interface IContext {
  items: [] | ISneakers[];
  cartItems: [] | ICartItems[];
  isItemAdded: (id: number) => boolean;
  setCartItems: React.Dispatch<React.SetStateAction<[] | ICartItems[]>>;
  onAddToCart: (obj: ICartItems) => Promise<void>;
  setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<IContext | any>({});

export default AppContext;
