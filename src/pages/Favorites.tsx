import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { selectSneakerData } from "../redux/sneaker/selector";

function Favorites() {
  const { items: sneakers } = useSelector(selectSneakerData);
  const isAddFavorite = sneakers.filter((item) => item.isFavorite === true);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {isAddFavorite.map((item, index) => (
          <Card
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
