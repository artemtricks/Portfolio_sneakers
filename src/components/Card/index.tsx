import React from "react";
import styles from "./Card.module.scss";
import heartLikeImg from "../../assets/img/heart-liked.svg";
import heartUnLikeImg from "../../assets/img/heart-unliked.svg";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "../../hooks/useCart";
import { toggleFavorite } from "../../redux/favorite/sliceFavorite";
import { ISneakers } from "../../App";
import { deleteCart } from "../../redux/cart/cartSlice";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  loading?: boolean;
  isFavorite: boolean;
  isAddToCardBtnGroup?: boolean;
  ordered?: boolean;
  count?: number;
};

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  price,
  loading,
  isFavorite,
  isAddToCardBtnGroup = true,
  ordered = false,
  count = 1,
}) => {
  const dispatch = useDispatch();

  const { cartItems, handleCart, minusCartItem, deleteCartItem } = useCart();
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
          <img
            width={160}
            height={150}
            src={process.env.PUBLIC_URL + `/sneakers/${id}.jpg`}
            alt="sneakers"
          />
          <span>{title}</span>
          <div className={styles.info}>
            <div className="d-flex ">
              <span style={{ marginRight: 5, marginBottom: 5 }}>Цена:</span>
              <b>{ordered ? price * count : price} руб.</b>
              {ordered && count > 1 && (
                <span style={{ marginRight: 5, marginLeft: 10 }}>x{count}</span>
              )}
            </div>

            {isAddToCardBtnGroup && (
              <div className={styles.groupBtnCounter}>
                {!!itemCount && itemCount >= 1 ? (
                  <button
                    className={styles.btnCounter}
                    onClick={() => handleCart(id)}
                  >
                    pls
                  </button>
                ) : (
                  <button
                    className={styles.btnCounter}
                    onClick={() => handleCart(id)}
                  >
                    add
                  </button>
                )}
                <span className={styles.count}>
                  {!!itemCount && itemCount >= 1 && itemCount}
                </span>
                {!!itemCount && itemCount >= 1 && (
                  <>
                    {!!itemCount && itemCount > 1 ? (
                      <button
                        className={styles.btnCounter}
                        onClick={() => minusCartItem(id)}
                      >
                        min
                      </button>
                    ) : (
                      <button
                        className={styles.btnCounter}
                        onClick={() => deleteCartItem(id)}
                      >
                        del
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
