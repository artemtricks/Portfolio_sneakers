import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartData } from "../redux/cart/selector";
import { selectSneakerData } from "../redux/sneaker/selector";
import {
  addCart,
  deleteCart,
  clearCart,
  minusCart,
} from "../redux/cart/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const { cart: cartItems } = useSelector(selectCartData);
  const { items: sneakers } = useSelector(selectSneakerData);

  const totalPrice: number = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.count;
  }, 0);

  const handleCart = React.useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((item) => item.id === id);
      if (sneakerItem) {
        dispatch(addCart(sneakerItem));
      }
    },
    [sneakers, dispatch]
  );

  const minusCartItem = React.useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((item) => item.id === id);
      if (sneakerItem) {
        dispatch(minusCart(sneakerItem));
      }
    },
    [sneakers, dispatch]
  );

  const deleteCartItem = React.useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((item) => item.id === id);
      if (sneakerItem) {
        dispatch(deleteCart(sneakerItem.id));
      }
    },
    [cartItems, dispatch]
  );

  const clearCartItems = React.useCallback(() => {
    dispatch(clearCart());
  }, [cartItems, dispatch]);

  return {
    cartItems,
    totalPrice,
    handleCart,
    deleteCartItem,
    clearCartItems,
    minusCartItem,
  };
};
