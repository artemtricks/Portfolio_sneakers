import React from "react";
import styles from "./Card.module.scss";
import btnPlusImg from "../../assets/img/btn-plus.svg";
import btnDoneImg from "../../assets/img/btn-checked.svg";
import heartLikeImg from "../../assets/img/heart-liked.svg";
import heartUnLikeImg from "../../assets/img/heart-unliked.svg";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteData } from "../../redux/sneaker/selector";
import { useToggleSneakerOpt } from "../../hooks/useToggleSneakerOpt";
import { addNewCartItem, deleteCartItem } from "../../redux/cart/cartSlice";
import { selectCartAdd } from "../../redux/cart/selector";
import { useCart } from "../../hooks/useCart";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  loading?: boolean;
  isFavorite?: boolean;
  isAddToCart?: boolean;
  onPlus?: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  price,
  onPlus,
  loading,
  isFavorite,
  isAddToCart,
}) => {
  const sneakers = useSelector(selectFavoriteData);

  const handleToggleFavorite = useToggleSneakerOpt(sneakers);
  const { cartItems, deleteCart, handleCart } = useCart();
  // const cart = useSelector(selectCartAdd);

  // const handleCart = React.useCallback(
  //   (id: number) => {
  //     const sneakerItem = sneakers.find((item) => item.id === id);
  //     if (sneakerItem) {
  //       //@ts-ignore
  //       dispatch(addNewCartItem(sneakerItem));
  //     }
  //   },
  //   [sneakers, dispatch]
  // );

  // const deleteCart = React.useCallback(
  //   (id: number) => {
  //     const sneakerItem = cart.find((item) => item.parentId === id);
  //     if (sneakerItem) {
  //       //@ts-ignore
  //       dispatch(deleteCartItem(sneakerItem));
  //     }
  //   },
  //   [cart, dispatch]
  // );

  // const add = cart.find((item) => {
  //   if (item.parentId === id) {
  //     return item.isAddToCart;
  //   }
  // });

  return (
    <div className={styles.card}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div
            className={styles.favorite}
            onClick={() => handleToggleFavorite(id)}
          >
            <img
              src={isFavorite ? heartLikeImg : heartUnLikeImg}
              alt="Unlicked"
            />
          </div>
          <img width={160} height={150} src={""} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <>
                <img
                  className={styles.plus}
                  onClick={() => handleCart(id)}
                  src={btnPlusImg}
                  alt="Plus"
                />
                <button onClick={() => deleteCart(id)}>delete</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
