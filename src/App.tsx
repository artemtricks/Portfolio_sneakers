import React from "react";
import Drawer from "./components/Drawer/index";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/store";
import Orders from "./pages/Orders";
import AppContext from "./context";
import { NotFound } from "./pages/NotFound";
import { selectSneakerData } from "./redux/sneaker/selector";
import { fetchSnekers } from "./redux/sneaker/sneakerSlice";

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

  const [cartItems, setCartItems] = React.useState<ICartItems[] | []>([]);
  const [serchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchSnekers());
  }, [dispatch]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse] = await Promise.all([
          axios.get("https://7c51c28aa165f47d.mokky.dev/Cart"),
          // axios.get("https://7c51c28aa165f47d.mokky.dev/items"),
        ]);

        setCartItems(cartResponse.data);
        // setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj: ICartItems) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://7c51c28aa165f47d.mokky.dev/Cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://7c51c28aa165f47d.mokky.dev/Cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
    }
  };

  const onRemoveItem = (id: number) => {
    try {
      axios.delete(`https://7c51c28aa165f47d.mokky.dev/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id)); // number
    } catch (error) {
      alert("Не удалсось удалить кроссовки из корзины");
    }
  };

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id: number) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        isItemAdded,
        setCartItems,
        onAddToCart,
        setCartOpened,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpened(false)}
          items={sneakers}
          onRemove={onRemoveItem}
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
                onAddToCart={onAddToCart}
                isLoading={status === "loading"}
              />
            }
          />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
