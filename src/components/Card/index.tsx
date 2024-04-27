import React from "react";
import styles from "./Card.module.scss";
import btnPlusImg from "../../assets/img/btn-plus.svg";
import btnDoneImg from "../../assets/img/btn-checked.svg";
import heartLikeImg from "../../assets/img/heart-liked.svg";
import heartUnLikeImg from "../../assets/img/heart-unliked.svg";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";

// import { addNewCartItem, deleteCartItem } from "../../redux/cart/cartSlice";
import { selectCartAdd } from "../../redux/cart/selector";
import { useCart } from "../../hooks/useCart";
import sneaker from "../../assets/sneakers/1.jpg";
import { addCart } from "../../redux/cart/cartSlice";
import { toggleFavorite } from "../../redux/sneaker/sneakerSlice";
import { ISneakers } from "../../App";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  loading?: boolean;
  isFavorite: boolean;
};

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  price,
  loading,
  isFavorite,
}) => {
  const dispatch = useDispatch();

  const { cartItems, handleCart, minusCartItem } = useCart();
  const itemCount = cartItems.find((item) => item.id === id)?.count;

  const handleToggleFavorite = (params: Omit<ISneakers, "count">) => {
    dispatch(toggleFavorite(params));
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div
            className={styles.favorite}
            onClick={() =>
              handleToggleFavorite({
                id,
                imageUrl,
                price,
                title,
                isFavorite,
              })
            }
          >
            <img
              src={isFavorite ? heartLikeImg : heartUnLikeImg}
              alt="Unlicked"
            />
          </div>
          <img width={160} height={150} src={sneaker} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
              <span>{itemCount}</span>
            </div>

            <div>
              <button onClick={() => handleCart(id)}>plus</button>
              <button onClick={() => minusCartItem(id)}>minus</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
