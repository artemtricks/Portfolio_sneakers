import React from 'react';
import Drawer from './components/Drawer/index';
import axios from 'axios';
import { Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


import AppContext from './context';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [serchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
 async function fetchData(){

  try {
    const [cartResponse, itemsResponse, favoritesResponse ] = await Promise.all([
      axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart'),
      axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/items'),
      axios.get('https://63f36531fe3b595e2ee0f355.mockapi.io/favorite'),
    ]);

   
    setIsLoading(false)
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data);

  } catch(error) {
    alert('Ошибка при запросе данных')
  }
  
  
  
 }
 
    fetchData()
  }, []);

  const onAddToCart  = async (obj) => {
   
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    if (findItem) {
      setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
      await axios.delete(`https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart/${findItem.id}`)
    } else {
      setCartItems((prev) => [...prev, obj])
      const {data} = await axios.post('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart', obj);
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
   } catch(error) {
    alert('Не удалось добавить в корзину')
   }
  }

  
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart/${id}`)
      setCartItems((prev) => prev.filter((item) => item.id !== id)); // number
    } catch(error) {
      alert('Не удалсось удалить кроссовки из корзины')
    }
    
  }


  const onAddToFavorite = async (obj) => {
   try {
     if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
    axios.delete(`https://63f36531fe3b595e2ee0f355.mockapi.io/favorite/${obj.id}`)
    setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
  } else {
    const {data} = await axios.post(`https://63f36531fe3b595e2ee0f355.mockapi.io/favorite`, obj)
  setFavorites(prev => [...prev, data])
  
}} 
  catch(error) {
  alert('не удалось добавить в закладки')
}
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }



  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded,  onAddToFavorite, setCartItems, onAddToCart, setCartOpened}/*Теперь нам не нужно эти триобъекта прокидывать в пропсы они доступны везде */ }> 
    <div className="wrapper clear">
    <Drawer 
      onClose={()=> setCartOpened(false)} 
      items={cartItems} 
      onRemove={onRemoveItem}
      opened={cartOpened}
    />
     
      <Header onClickCart={()=> setCartOpened(true)} />
   
      

     <Routes>
	  <Route path="/" element={
    <Home
     items={items}
     cartItems={cartItems}
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
	  <Route path="/favorites" element={
    <Favorites />
    }
     />
  </Routes>
  <Routes>
	  <Route path="/orders" element={
    <Orders />
    }
     />
  </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
