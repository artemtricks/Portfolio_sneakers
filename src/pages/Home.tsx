import React from "react";
import Card from "../components/Card";
import SwiperSlider from "../components/Swiper";
import btnRemoveSvg from "../assets/img/btnRemove.svg";
import searchSvg from "../assets/img/search.svg";
import { ICartItems, ISneakers } from "../App";

type HomeProps = {
  items: ISneakers[] | [];
  serchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onAddToCart: (obj: ICartItems) => Promise<void>;
  isLoading: boolean;
};

const Home: React.FC<HomeProps> = ({
  items,
  serchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(serchValue.toLowerCase())
    );

    return (isLoading ? [...Array(10).fill({})] : filteredItems).map(
      (item, index) => (
        <Card
          key={index}
          id={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          loading={isLoading}
          onPlus={(obj) => onAddToCart(obj)}
          isFavorite={item.isFavorite}
        />
      )
    );
  };

  return (
    <>
      <SwiperSlider />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>
            {serchValue ? `Поиск по запросу: "${serchValue}"` : `Все кроссовки`}
          </h1>
          <div className="search-block d-flex">
            <img src={searchSvg} alt="Search" />
            {serchValue && (
              <img
                className="clear cu-p"
                src={btnRemoveSvg}
                alt="Clear"
                onClick={() => setSearchValue("")}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={serchValue}
              placeholder="Поиск"
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
    </>
  );
};

export default Home;
