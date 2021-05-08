import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

const isNumbers = /^\d*$/;

function HomepageItem(props) {
  const { cartItem, setCartItem } = useContext(AuthContext);
  const [itemNumber, setItemNumber] = useState(1);

  const handlerAddToCart = (e) => {
    e.preventDefault();
    setCartItem(cartItem + +itemNumber);
  };

  const handlerItemNumberSubtract = () => {
    itemNumber === 1 ? setItemNumber(1) : setItemNumber(itemNumber - 1);
  };

  // ปิดไว้ เพราะไม่สามารถ validate ถ้าใส่ไม่ใช่ตัวเลข, ใส่ 0, ใส่ . แล้วค่าห้ามเปลี่ยนได้
  const handlerItemNumberChange = (e) => {
    // console.log(e);
    // console.log(e.target.value);
    // if (e.target.value == 0) {
    //   console.log("equal 0");
    //   setItemNumber(+e.target.value + 1);
    // }
    // const value = e.target.value.replace(/[^\d]/, "");
    // if (e.target.value > props.CardCodes.length) {
    //   console.log("1");
    //   setItemNumber(+props.CardCodes.length);
    // } else if (parseInt(value) !== 0) {
    //   console.log("2");
    //   setItemNumber(value);
    // } else {
    //   setItemNumber(+e.target.value);
    // }
  };

  const handlerItemNumberIncrement = () => {
    itemNumber === props.CardCodes.length
      ? setItemNumber(props.CardCodes.length)
      : setItemNumber(itemNumber + 1);
  };

  return (
    <div className="content-center-home-item-wrap">
      <div className="content-center-home-item">
        <div className="content-center-home-item-img">
          <img src={props.img} alt="item" />
        </div>
        <h3 className="content-center-home-item-price">
          ราคา {props.price} บาท
        </h3>
        <div className="button-group-counter">
          <button
            className="button-group-subtract"
            onClick={handlerItemNumberSubtract}
          >
            -
          </button>
          <input
            type="text"
            // min="1"
            // step="0.01"
            // onKeyPress={(e) => {
            //   return e.charCode >= 48 && e.charCode <= 57;
            // }}
            className="button-group-number"
            value={itemNumber}
            onChange={handlerItemNumberChange}
            maxLength="2"
          />
          <button
            className="button-group-increment"
            onClick={handlerItemNumberIncrement}
          >
            +
          </button>
        </div>
        <div className="button-group-addToCart">
          <button className="button-addToCart" onClick={handlerAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomepageItem;
