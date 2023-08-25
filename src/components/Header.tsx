import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import logoSvg from "../assets/img/logo1.png";
import cartSvg from "../assets/img/cart.svg";
import favoriteSvg from "../assets/img/favorite.svg";
import userSvg from "../assets/img/user.svg";
import AppContext from "../context";

type HeaderProps = {
  setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ setCartOpened }) => {
  const { favorites } = React.useContext(AppContext);
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src={logoSvg} alt="logo" />
          <div>
            <h3 className="text-uppercase">MY SNEAKERS</h3>
            <p className="opacity-5">Магазин кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li
          className="mr-30 cu-p d-flex align-center"
          onClick={() => setCartOpened(true)}
        >
          <img width={18} height={18} src={cartSvg} alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to="/favorites" className="d-flex align-center">
            <img
              className="cu-p"
              width={18}
              height={18}
              src={favoriteSvg}
              alt="Закладки"
            />
            <span className="mr-20">{`${favorites.length} шт.`}</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src={userSvg} alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
