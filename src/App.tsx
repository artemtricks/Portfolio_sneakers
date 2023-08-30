import React from "react";
import Drawer from "./components/Drawer/index";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import Orders from "./pages/Orders";
import AppContext from "./context";
import { NotFound } from "./pages/NotFound";

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
  const [items, setItems] = React.useState<ISneakers[] | []>([]);
  const [cartItems, setCartItems] = React.useState<ICartItems[] | []>([]);
  const [serchValue, setSearchValue] = React.useState<string>("");
  const [cartOpened, setCartOpened] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [favorited, setFavorited] = React.useState<ISneakers[] | []>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get("https://7c51c28aa165f47d.mokky.dev/Cart"),
          axios.get("https://7c51c28aa165f47d.mokky.dev/items"),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }

    fetchData();
  }, [favorited]);

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

  // const onAddToCart = (obj: ISneakers) => {
  //   if (items.find((item) => item.id === obj.id && obj.isAddToCart === false)) {
  //     axios
  //       .patch(`https://7c51c28aa165f47d.mokky.dev/items/${obj.id}`, {
  //         isAddToCart: true,
  //       })
  //       .then((response) => {
  //         setCartItems(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(`не удалось добавить в избранное`, err);
  //       });
  //   } else {
  //     axios
  //       .patch(`https://7c51c28aa165f47d.mokky.dev/items/${obj.id}`, {
  //         isAddToCart: false,
  //       })
  //       .then((response) => {
  //         setFavorited(response.data);
  //       });
  //   }
  // };

  const onAddFavorite = (obj: ISneakers) => {
    if (items.find((item) => item.id === obj.id && obj.isFavorite === false)) {
      axios
        .patch(`https://7c51c28aa165f47d.mokky.dev/items/${obj.id}`, {
          isFavorite: true,
        })
        .then((response) => {
          setFavorited(response.data);
        })
        .catch((err) => {
          console.log(`не удалось добавить в избранное`, err);
        });
    } else {
      axios
        .patch(`https://7c51c28aa165f47d.mokky.dev/items/${obj.id}`, {
          isFavorite: false,
        })
        .then((response) => {
          setFavorited(response.data);
        });
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
        items,
        cartItems,
        isItemAdded,
        setCartItems,
        onAddToCart,
        setCartOpened,
        onAddFavorite,
        favorited,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpened(false)}
          items={cartItems}
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
                onAddToCart={onAddToCart}
                isLoading={isLoading}
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
