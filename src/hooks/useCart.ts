import { useSelector } from "react-redux";
import { selectSneakerData } from "../redux/sneaker/selector";

export const useCart = () => {
  const { items } = useSelector(selectSneakerData);
  const cartItems = items.filter((item) => item.isAddToCart === true);
  const totalPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  return { cartItems, totalPrice };
};
