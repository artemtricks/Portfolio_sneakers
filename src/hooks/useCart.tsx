import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartData } from "../redux/cart/selector";
import { deleteCartItem } from "../redux/cart/cartSlice";
import { addNewCartItem } from "../redux/cart/cartSlice";
import { selectSneakerData } from "../redux/sneaker/selector";

export const useCart = () => {
  const dispatch = useDispatch();
  const { cart: cartItems } = useSelector(selectCartData);
  const { items: sneakers } = useSelector(selectSneakerData);

  const totalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const handleCart = React.useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((item) => item.id === id);
      if (sneakerItem) {
        //@ts-ignore
        dispatch(addNewCartItem(sneakerItem));
      }
    },
    [sneakers, dispatch]
  );

  const deleteCart = React.useCallback(
    (id: number) => {
      const sneakerItem = cartItems.find((item) => item.parentId === id);
      if (sneakerItem) {
        //@ts-ignore
        dispatch(deleteCartItem(sneakerItem));
      }
    },
    [cartItems, dispatch]
  );

  return { cartItems, totalPrice, deleteCart, handleCart };
};
