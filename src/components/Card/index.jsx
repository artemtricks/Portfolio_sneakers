import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";

function Card({id ,imageUrl, title, price, onPlus, onFavorite, favorited = false, added = false, loading = false}) {
    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setFavorite] = React.useState(favorited);
   
    const onClickPlus = () => {
        onPlus({id, title,imageUrl, price})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price})
        setFavorite(!isFavorite);
    }

    
    React.useEffect(() => {
        console.log('Изменение');
    }, [isAdded])

    return (

    <div className={styles.card}>
       {
        loading ?   (<ContentLoader 
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
      </ContentLoader>) :   

        (<>
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
         </>)
       }
        </div>
    );
}

export default Card;