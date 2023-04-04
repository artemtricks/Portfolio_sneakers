import React from "react";
import Info from "../Info";

import axios from "axios";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onRemove, onClose, opened }) {
  const [isOrderComplite, setIsOrderComplite] = React.useState(false);
  //const { cartItems, setCartItems} = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  const { cartItems, setCartItems, totalPrice } = useCart(); // кастомный хук юзкарт

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://641c231ab556e431a8666273.mockapi.io/order",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart/" + item.id
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
            onClick={onClose}
            className="cu-p"
            src="img/btnRemove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex cartNotEpty">
            <div className={styles.items}>
              {items.map((obj) => (
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
                    src="img/btnRemove.svg"
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
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplite ? "Заказ оформлен!" : "Корзина пуста"}
            description={
              isOrderComplite
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотябы одну пару кроссовок"
            }
            image={
              isOrderComplite ? "img/order-done.jpg" : "img/cart-drawer.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
