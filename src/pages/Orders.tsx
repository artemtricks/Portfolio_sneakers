import React from "react";
import Card from "../components/Card";
import axios from "axios";
import { ICartItems } from "../App";

const Orders: React.FC = () => {
  const [orders, setOrders] = React.useState<ICartItems[] | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://7c51c28aa165f47d.mokky.dev/orders"
        );
        setOrders(data.map((obj: any) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
      }
    })();
  }, []);

  console.log(orders, "orders");

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10).fill({})] : orders).map((item, index) => (
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
