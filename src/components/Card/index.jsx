import React from 'react';
import styles from './Card.module.scss'

function Card({id ,imageUrl, title, price, onPlus, onFavorite, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setFavorite] = React.useState(favorited);
   
    const onClickPlus = () => {
        onPlus({id, title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, title, price, imageUrl})
        setFavorite(!isFavorite);
    }

    
    React.useEffect(() => {
        console.log('Изменение');
    }, [isAdded])

    return (
    <div className={styles.card}>
        <div className={styles.favorite}  onClick={onClickFavorite} >
        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg" } alt="Unlicked"/>
        </div>
        
        <img width={160} height={150} src={imageUrl} alt="sneakers" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
            </div>
            <img className={styles.plus} onClick={onClickPlus}  src={isAdded ? `/img/btn-checked.svg` : `/img/btn-plus.svg`} alt="Plus" />
        </div>
        </div>
    );
}

export default Card;