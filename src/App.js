import Drawer from './components/Drawer';
import axios from 'axios';
import { Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import React from 'react';
import Favorites from './pages/Favorites';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [serchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
 async function fetchData(){
  
  const cartResponse = await axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart');
  const itemsResponse = await axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/items');
  const favoritesResponse = await axios.get('https://63f36531fe3b595e2ee0f355.mockapi.io/favorite');
  
  setIsLoading(false)
  setCartItems(cartResponse.data);
  setFavorites(favoritesResponse.data);
  setItems(itemsResponse.data);
  
 }
 
    fetchData()
  }, []);

  const onAddToCart  = async (obj) => {
   console.log(obj);
    try {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart/${obj.id}`)
   setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      const {data} = await axios.post('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart', obj)
     setCartItems(prev => [...prev, data])
    }
   } catch(error) {
    alert('Не удалось добавить в корзину')
   }
  }

  
  const onRemoveItem = (id) => {
    axios.delete(`https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }


  const onAddToFavorite = async (obj) => {
   try {
     if(favorites.find(favObj => favObj.id === obj.id)) {
    axios.delete(`https://63f36531fe3b595e2ee0f355.mockapi.io/favorite/${obj.id}`)
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

  return (
    <div className="wrapper clear">
      
      {cartOpened && <Drawer onClose={()=> setCartOpened(false)} items={cartItems} onRemove={onRemoveItem} />}
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
    <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
    }
     />
  </Routes>
    </div>
  );
}

export default App;


// я изменил яйтем в мокапи добавил айди каждому объекту 