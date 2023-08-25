import React from "react";
import AppContext from "../context";
import { ICartItems } from "../App";
interface F {
  setCartItems: React.Dispatch<React.SetStateAction<[] | ICartItems[]>>;
  cartItems: [] | ICartItems[];
}
export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext<any>(AppContext);
  const totalPrice: number = cartItems.reduce(
    (sum: number, obj: ICartItems) => obj.price + sum,
    0
  );
  return { cartItems, setCartItems, totalPrice };
};
