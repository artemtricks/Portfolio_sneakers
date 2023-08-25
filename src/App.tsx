import React from "react";
import Drawer from "./components/Drawer/index";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

export interface ISneakers {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
}

export interface ICartItems extends ISneakers {
  parentId: number;
}

const App = () => {
  const [items, setItems] = React.useState<ISneakers[] | []>([]);
  const [cartItems, setCartItems] = React.useState<ICartItems[] | []>([]);
  const [favorites, setFavorites] = React.useState<ISneakers[] | []>([]);
  const [serchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse, favoritesResponse] =
          await Promise.all([
            axios.get("https://7c51c28aa165f47d.mokky.dev/Cart"),
            axios.get("https://7c51c28aa165f47d.mokky.dev/items"),
            axios.get("https://7c51c28aa165f47d.mokky.dev/favorite"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
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

  const onAddToFavorite = async (obj: ISneakers) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://7c51c28aa165f47d.mokky.dev/favorite/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://7c51c28aa165f47d.mokky.dev/favorite`,
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в закладки");
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
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartItems,
        onAddToCart,
        setCartOpened,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpened(false)}
          // items={cartItems}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header setCartOpened={setCartOpened} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                serchValue={serchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="favorites" element={<Favorites />} />
        </Routes>
        <Routes>
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
