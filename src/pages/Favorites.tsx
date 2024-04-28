import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { selectSneakerData } from "../redux/sneaker/selector";
import { selectFavoriteData } from "../redux/favorite/selectors";

function Favorites() {
  const { favorite } = useSelector(selectFavoriteData);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorite.map((item, index) => (
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
