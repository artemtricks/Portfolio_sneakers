import React from "react";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import btnRemove from "../../assets/img/btnRemove.svg";
import arrowSvg from "../../assets/img/arrow.svg";
import { ISneakers } from "../../App";
import styles from "./Drawer.module.scss";

type DrawerProps = {
  onRemove: (id: number) => void;
  onClose: (value: React.SetStateAction<boolean>) => void;
  opened: boolean;
};

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer: React.FC<DrawerProps> = ({ onRemove, onClose, opened }) => {
  const items: [] = [];
  const [isOrderComplite, setIsOrderComplite] = React.useState(false);
  const [orderId, setOrderId] = React.useState<ISneakers[] | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { cartItems, setCartItems, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://7c51c28aa165f47d.mokky.dev/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item: ISneakers = cartItems[i];
        await axios.delete(
          "https://7c51c28aa165f47d.mokky.dev/Cart/" + item.id
        );
        await delay(1000);
      }
    } catch {
      alert("Ошибка при создании заказа");
      setIsLoading(false);
    }
  };

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
                    onClick={() => onRemove(obj.id)}
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
                onClick={onClickOrder}
                disabled={isLoading}
                className="greenButton"
              >
                Оформить заказ <img src={arrowSvg} alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info isOrderComplite={isOrderComplite} orderId={orderId} />
        )}
      </div>
    </div>
  );
};

export default Drawer;
