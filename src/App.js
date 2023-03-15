import Drawer from './components/Drawer'
import Header from './components/Header';
import Card from './components/Card';
import React from 'react';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://6411eb8b6e3ca3175301c8a9.mockapi.io/items').then(res => {
    return res.json()
  })
  .then(json => {
    setItems(json);
  })
  }, []);

  const onAddToCart = (obj) => {
    
    setCartItems(prev => [...prev, obj])  // крайне рекомендуется делать так (это запрос предидущих данных) [...cartItems, obj] - так делать не рекомендуется
  }



  return (

    <div className="wrapper clear">

      {cartOpened && <Drawer onCloseCart={()=> setCartOpened(false)} items={cartItems} />}
      <Header onClickCart={()=> setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between" >
        <h1 >Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input placeholder="Поиск" />
        </div>
        </div>
        <div className="d-flex flex-wrap">
          {
            items.map((item) => (
              <Card
              title={item.title} 
              price={item.price}
              imageUrl={item.imageUrl}
              onClickFavorite={ () => console.log('Добавили в закдладки')}
              onPlus={onAddToCart}
               />
            ))
          }
          
          </div>
         
      </div>
    </div>
  );
}

export default App;
