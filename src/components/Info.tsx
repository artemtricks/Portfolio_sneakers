import React from "react";

import arrowSvg from "../assets/img/arrow.svg";
import orderDoneImg from "../assets/img/order-done.jpg";
import cartDrawerImg from "../assets/img/cart-drawer.jpg";
import { ISneakers } from "../App";

type InfoProps = {
  isAddNewOrder: boolean;
  orderId: [] | ISneakers[];
  onClose: any;
};

const Info: React.FC<InfoProps> = ({ isAddNewOrder, orderId, onClose }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-between flex-column flex">
      <img
        className="mb-20"
        src={isAddNewOrder ? orderDoneImg : cartDrawerImg}
        width={120}
        alt=""
      />
      <h2>{isAddNewOrder ? "Заказ оформлен!" : "Корзина пуста"}</h2>
      <p className="opacity-6">
        {isAddNewOrder
          ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
          : "Добавьте хотябы одну пару кроссовок"}
      </p>
      <button onClick={onClose} className="greenButton">
        <img src={arrowSvg} alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
