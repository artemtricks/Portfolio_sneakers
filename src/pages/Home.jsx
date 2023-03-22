import Card from '../components/Card';

function Home({items,
    serchValue,
    cartItems,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading}) {
    
    const renderItems = () => {
      const fakeArr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      const filteredItems = items.filter((item) => item.title.toLowerCase().includes(serchValue.toLowerCase())
     
     );
      return (isLoading ? fakeArr : filteredItems).map((item, index) => (
        <Card
       key={index}
       id={item.id}
       title={item.title} 
       price={item.price}
       imageUrl={item.imageUrl}
       loading = {isLoading}
       onFavorite={(obj) => onAddToFavorite(obj)}
       onPlus={(obj) => onAddToCart(obj)}
       added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
       
        />
     ))
    }
      return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between" >
        <h1 >{serchValue ? `Поиск по запросу: "${serchValue}"` : `Все кроссовки`}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {serchValue && <img 
          className="clear cu-p" 
          src="/img/btn-remove.svg" 
          alt="Clear"
          onClick={() => setSearchValue('')} 
          />}
          <input onChange={onChangeSearchInput} value={serchValue} placeholder="Поиск" />
        </div>
        </div>
       {console.log(items, cartItems)} 
        <div className="d-flex flex-wrap">
          {renderItems()}
          </div>
      </div>
    );
}

export default Home;