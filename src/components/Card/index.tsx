import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import heartLikeImg from "../../assets/img/heart-liked.svg";
import heartUnLikeImg from "../../assets/img/heart-unliked.svg";
import btnPlusImg from "../../assets/img/btn-plus.svg";
import btnDoneImg from "../../assets/img/btn-checked.svg";

type CardProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  loading?: boolean;
  favorited?: boolean;

  onPlus?: (obj: any) => Promise<void>;
  onFavorite?: (obj: any) => Promise<void>;
};

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited,
}) => {
  const loading = false;
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    !!onPlus && onPlus({ id, parentId: id, title, price, imageUrl });
  };

  const onClickFavorite = () => {
    !!onFavorite && onFavorite({ id, parentId: id, title, price, imageUrl });
    setFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="164" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="186" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            {!!onFavorite && (
              <img
                src={isFavorite ? heartLikeImg : heartUnLikeImg}
                alt="Unlicked"
              />
            )}
          </div>
          <img width={160} height={150} src="/sneakers/1.jpg" alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {!!onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? btnDoneImg : btnPlusImg}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
