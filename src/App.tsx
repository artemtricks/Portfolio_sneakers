import React from "react";
import Drawer from "./components/Drawer/index";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/store";
import Orders from "./pages/Orders";
import { NotFound } from "./pages/NotFound";
import { selectSneakerData } from "./redux/sneaker/selector";
import { fetchSnekers } from "./redux/sneaker/sneakerSlice";
import { fetchCart } from "./redux/cart/cartSlice";

export interface ISneakers {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  isFavorite: boolean;
  isAddToCart: boolean;
}

export interface ICartItems extends ISneakers {
  parentId: number;
}

const App = () => {
  const { items: sneakers, status } = useSelector(selectSneakerData);
  const dispatch = useAppDispatch();
  const [serchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);
  const cartSneaker = sneakers.filter((item) => {
    if (item.isAddToCart === true) {
      return item;
    }
  });

  React.useEffect(() => {
    dispatch(fetchSnekers());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      <Drawer
        onClose={() => setCartOpened(false)}
        items={cartSneaker}
        opened={cartOpened}
      />
      <Header setCartOpened={setCartOpened} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={sneakers}
              serchValue={serchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              isLoading={status === "loading"}
            />
          }
        />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
