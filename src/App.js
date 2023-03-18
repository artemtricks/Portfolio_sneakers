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

  React.useEffect(() => {
    /*fetch('https://6411eb8b6e3ca3175301c8a9.mockapi.io/items').then(res => {
    return res.json()
  })
  .then(json => {
    setItems(json);
  });*/

  axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/items').then(res => {
    setItems(res.data);
  });

  axios.get('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart').then(res => {
    setCartItems(res.data);
  });

  axios.get('https://63f36531fe3b595e2ee0f355.mockapi.io/favorite').then(res => {
    setFavorites(res.data);
  });


  }, []);

  const onAddToCart = async (obj) => {
    const {data} = await axios.post('https://6411eb8b6e3ca3175301c8a9.mockapi.io/Cart', obj)
    setCartItems(prev => [...prev, data])  // добавил асинк и аваит если сломается убрать и конст дата убрать
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
  console.log(obj);
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
     serchValue={serchValue}
     setSearchValue={setSearchValue}
     onChangeSearchInput={onChangeSearchInput}
     onAddToFavorite={onAddToFavorite}
     onAddToCart={onAddToCart}
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