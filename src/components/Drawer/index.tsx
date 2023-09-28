import React from "react";
import Info from "../Info";

import { useCart } from "../../hooks/useCart";
import btnRemove from "../../assets/img/btnRemove.svg";
import arrowSvg from "../../assets/img/arrow.svg";
import { ISneakers } from "../../App";
import styles from "./Drawer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addNewOrder } from "../../redux/order/orderSlice";
import { NewOrderParam } from "../../redux/order/orderSlice";
import { selectOrderData } from "../../redux/order/selector";
import { useToggleSneakerOpt } from "../../hooks/useToggleSneakerOpt";
import { selectSneakerData } from "../../redux/sneaker/selector";

type DrawerProps = {
  onClose: (value: React.SetStateAction<boolean>) => void;
  opened: boolean;
  items: ISneakers[];
};

const Drawer: React.FC<DrawerProps> = ({ onClose, opened, items }) => {
  const [orderId, setOrderId] = React.useState<ISneakers[] | []>([]);

  const { totalPrice } = useCart();

  const { order, isAddNewOrder } = useSelector(selectOrderData);
  const dispatch = useDispatch();
  const { items: sneakers } = useSelector(selectSneakerData);
  const handleAddNewCart = useToggleSneakerOpt(sneakers, true);

  const handleNewOrder = React.useCallback(
    (cartItems: NewOrderParam) => {
      if (cartItems) {
        //@ts-ignore
        dispatch(addNewOrder(cartItems));
      }
    },
    [dispatch, order]
  );

  console.log(isAddNewOrder);
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex mb-30 justify-between">
          Корзина
          <img
            onClick={() => onClose(false)}
            className="cu-p"
            src={btnRemove}
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex cartNotEpty">
            <div className={styles.items}>
              {items.map((obj: ISneakers) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => handleAddNewCart(obj.id)}
                    className="removeBtn"
                    src={btnRemove}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                onClick={() => handleNewOrder(items as any)}
                className="greenButton"
              >
                Оформить заказ <img src={arrowSvg} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            isAddNewOrder={isAddNewOrder}
            orderId={orderId}
            onClose={() => onClose(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
