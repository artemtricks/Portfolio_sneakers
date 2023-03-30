import React from "react";
import Card from "../components/Card";
import axios from "axios";
//import AppContext from "../context";




function Orders() {
  //const  {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    (async () => {
      
      try {

        const { data } = await axios.get('https://641c231ab556e431a8666273.mockapi.io/order');
        setOrders(data.map(obj => obj.items).flat());
        setIsLoading(false);

      } catch (error) {
        alert('Ошибка при запросе заказов');
      }
      
    })();
    
  },[])
  
    
    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between" >
        <h1>Мои заказы</h1>
        
        </div>
        <div className="d-flex flex-wrap">
        {
            (isLoading ? [...Array(10).fill({})] : orders).map((item, index) => (
              <Card
              key={index}
              id={item.id}
              title={item.title} 
              price={item.price}
              imageUrl={item.imageUrl}
              loading = {isLoading}
              

               />
            ))}
          </div>
      </div>
    );
}

export default Orders;