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
import { fetchSneakers } from "./redux/sneaker/sneakerSlice";
import Favorites from "./pages/Favorites";
import { selectCartData } from "./redux/cart/selector";

export interface ISneakers {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  isFavorite: boolean;
  count: number;
}

const App = () => {
  const { items: sneakers, status } = useSelector(selectSneakerData);
  const { cart } = useSelector(selectCartData);
  const dispatch = useAppDispatch();
  const [serchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchSneakers());
  }, [dispatch]);

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      <Drawer
        onClose={() => setCartOpened(false)}
        opened={cartOpened}
        items={cart}
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
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
