import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'

function HomepageItem(props) {
  const { cartItem , setCartItem } = useContext(AuthContext)
  const [ itemNumber, setItemNumber] = useState(1)
  
  const handlerAddToCart = (e) => {
    e.preventDefault();
    setCartItem(cartItem + itemNumber);
  };

  const handlerItemNumberSubtract = () => {
    (itemNumber === 1) ? setItemNumber(1) : setItemNumber(itemNumber - 1);
  };

  const handlerItemNumberChange = (e) => {
    if (e.target.value > props.CardCodes.length) {
      setItemNumber(+props.CardCodes.length)
    } else {
      setItemNumber(+e.target.value)
    };
  };

  const handlerItemNumberIncrement = () => {
    (itemNumber === props.CardCodes.length) ? setItemNumber(props.CardCodes.length) : setItemNumber(itemNumber + 1)
  };

  return (
    <div className="content-center-home-item-wrap" > 
      <div className="content-center-home-item">
        <div className="content-center-home-item-img">
          <img src={props.img} alt="item" />
        </div>
        <h3 className="content-center-home-item-price">ราคา {props.price} บาท</h3>
        <div className="button-group-counter">
          <button className="button-group-subtract" onClick={handlerItemNumberSubtract}>-</button>
            <input className="button-group-number" value={itemNumber} onChange={handlerItemNumberChange} maxLength="2" />
          <button className="button-group-increment" onClick={handlerItemNumberIncrement}>+</button>
        </div>
        <div className="button-group-addToCart">
          <button className="button-addToCart" onClick={handlerAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div> 
  )
}

export default HomepageItem
