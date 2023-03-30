
import Card from '../components/Card';
import Swip from '../components/Swiper';


function Home({items,
    serchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading,
    }) {
    
      
    const renderItems = () => {
      const filteredItems = items.filter((item) => item.title.toLowerCase().includes(serchValue.toLowerCase())
     
     );
      return (isLoading ? [...Array(10).fill({})] : filteredItems).map((item, index) => (
        <Card
       key={index}
       id={item.id}
       parentId={item.parentId}
       title={item.title} 
       price={item.price}
       imageUrl={item.imageUrl}
       loading = {isLoading}
       onFavorite={(obj) => onAddToFavorite(obj)}
       onPlus={(obj) => onAddToCart(obj)}
       
        />
     ))
    }
      return (
        <>
        <Swip/>
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
        
        <div className="d-flex flex-wrap">
          {renderItems()}
          </div>
      </div>
      </>
    );
}

export default Home;