import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { selectOrderData } from "../redux/order/selector";
import { fetchOrders } from "../redux/order/orderSlice";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { order, status } = useSelector(selectOrderData);

  const ordersArr = order.map((item) => item.items).flat();

  React.useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(status === "loading" ? [...Array(10).fill({})] : ordersArr).map(
          (item, index) => (
            <Card
              key={index}
              id={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              loading={status === "loading"}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
