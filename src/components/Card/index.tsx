import React, { useCallback } from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import btnPlusImg from "../../assets/img/btn-plus.svg";
import btnDoneImg from "../../assets/img/btn-checked.svg";
import imageImg from "../../assets/sneakers/10.jpg";
import heartLikeImg from "../../assets/img/heart-liked.svg";
import heartUnLikeImg from "../../assets/img/heart-unliked.svg";
import Skeleton from "./Skeleton";

import { useDispatch, useSelector } from "react-redux";
import {
  addNewFavoriteSneaker,
  addNewCartItem,
} from "../../redux/sneaker/sneakerSlice";

import { selectFavoriteData } from "../../redux/sneaker/selector";
import { selectCartData } from "../../redux/cart/selector";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  loading?: boolean;
  isFavorite?: boolean;
  isAddToCart?: boolean;

  onPlus?: (obj: any) => Promise<void>;
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
  const { isItemAdded } = React.useContext(AppContext);
  const onClickPlus = () => {
    !!onPlus && onPlus({ id, parentId: id, title, price, imageUrl });
  };

  const dispatch = useDispatch();
  const sneakers = useSelector(selectFavoriteData);
  const { cart } = useSelector(selectCartData);
  // const isItemAdded = (id: number) => {
  //   return cart.some((obj) => Number(obj.parentId) === Number(id));
  // };

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((sneaker) => sneaker.id === id);
      if (sneakerItem) {
        //@ts-ignore
        dispatch(addNewFavoriteSneaker(sneakerItem));
      }
    },
    [dispatch, sneakers]
  );

  const handleAddNewCart = useCallback(
    (id: number) => {
      const cartItem = sneakers.find((sneaker) => sneaker.id === id);
      if (cartItem) {
        //@ts-ignore
        dispatch(addNewCartItem(cartItem));
      }
    },
    [sneakers, dispatch]
  );

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
            {!!onPlus && (
              <img
                className={styles.plus}
                onClick={() => handleAddNewCart(id)}
                src={isAddToCart ? btnDoneImg : btnPlusImg}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
