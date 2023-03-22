function Drawer({items =[], onRemove, onClose}) {
    return (
        <div className="overlay">
        <div className="drawer">
        <h2 className="d-flex mb-30 justify-between">Корзина 
        <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {
           items.length > 0 ? 
   ( <div className="d-flex flex-column flex cartNotEpty">
           <div className="items">
          {
            items.map((obj)=> (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
           <div 
           style={{backgroundImage: `url(${obj.imageUrl})`}}
           className="cartItemImg"></div>

          <div className="mr-20 flex">
            <p className="mb-5">{obj.title}</p>
            <b>{obj.price} руб.</b>
          </div>
          <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
        </div>
        ))}
         </div> 
         <div className="cartTotalBlock">
         <ul>
           <li className="d-flex">
             <span>Итого:</span>
             <div></div>
             <b>21 498 руб.</b>
           </li>
           <li className="d-flex">
             <span>Налог 5%:</span>
             <div></div>
             <b>1074 руб.</b>
           </li>
         </ul>
         <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
     </div>   
     </div> 
    ) : (

          <div className="cartEmpty d-flex align-center justify-between flex-column flex">
          <img  className="mb-20" src="/img/cart-drawer.jpg" width={120} height={120} alt="" />
          <h2>Корзина пуста</h2>
          <p className="opacity-6">Добавьте хотябы одну пару кроссовок</p>
          <button  onClick={onClose} className="greenButton">
            <img src="/img/arrow.svg" alt="Arrow" />Вернуться назад
          </button>
        </div> )
        
        }
        

    </div>
     </div>
      
  );
}

export default Drawer;