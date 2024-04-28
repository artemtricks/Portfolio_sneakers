import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/img/logo1.png";
import cartSvg from "../assets/img/cart.svg";
import userSvg from "../assets/img/user.svg";
import { useSelector } from "react-redux";
import { selectSneakerData } from "../redux/sneaker/selector";
import heartSvg from "../assets/img/favorite.svg";
import { useCart } from "../hooks/useCart";
import { selectFavoriteData } from "../redux/favorite/selectors";

type HeaderProps = {
  setCartOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ setCartOpened }) => {
  const { items } = useSelector(selectSneakerData);
  const { totalPrice, cartItems } = useCart();
  const { favorite } = useSelector(selectFavoriteData);
  console.log(favorite, "dwdwdwdwdwdw");

  const totalCountFavoriteItem = items.filter(
    (item) => item.isFavorite === true
  );

  const cartRef = React.useRef(false);
  const favoriteRef = React.useRef(false);

  React.useEffect(() => {
    if (cartRef.current) {
      const data = JSON.stringify(cartItems);
      window.localStorage.setItem("cart", data);
    }

    cartRef.current = true;
  }, [favorite]);

  React.useEffect(() => {
    if (favoriteRef.current) {
      const data = JSON.stringify(favorite);
      window.localStorage.setItem("favorite", data);
    }

    favoriteRef.current = true;
  }, [favorite]);

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
        <li className="mr-10 cu-p d-flex align-center">
          <Link className="d-flex" to="/favorites">
            <img width={18} height={18} src={heartSvg} alt="Пользователь" />
            {favorite.length > 0 && <span>{favorite.length} шт.</span>}
          </Link>
        </li>
        <li
          className="mr-10 cu-p d-flex align-center"
          onClick={() => setCartOpened(true)}
        >
          <img width={18} height={18} src={cartSvg} alt="Корзина" />
          {totalPrice > 0 && <span>{totalPrice} руб.</span>}
        </li>

        <li>
          <Link to="/orders">
            <img
              className="mt-5"
              width={18}
              height={18}
              src={userSvg}
              alt="Пользователь"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
