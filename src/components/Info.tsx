import React from "react";
import AppContext from "../context";
import arrowSvg from "../assets/img/arrow.svg";
import orderDoneImg from "../assets/img/order-done.jpg";
import cartDrawerImg from "../assets/img/cart-drawer.jpg";
import { ISneakers } from "../App";

type InfoProps = {
  isOrderComplite: boolean;
  orderId: [] | ISneakers[];
};

const Info: React.FC<InfoProps> = ({ isOrderComplite, orderId }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-between flex-column flex">
      <img
        className="mb-20"
        src={isOrderComplite ? orderDoneImg : cartDrawerImg}
        width={120}
        alt=""
      />
      <h2>{isOrderComplite ? "Заказ оформлен!" : "Корзина пуста"}</h2>
      <p className="opacity-6">
        {isOrderComplite
          ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
          : "Добавьте хотябы одну пару кроссовок"}
      </p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src={arrowSvg} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
