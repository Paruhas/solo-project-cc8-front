import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

import axios from "../../configs/axios";
import { useHistory } from "react-router";

// const isNumbers = /^\d*$/;

function HomepageItem(props) {
  const { cartItem, setCartItem } = useContext(AuthContext);
  const [itemNumber, setItemNumber] = useState(1);

  const history = useHistory();

  // const handlerAddToCart = (e) => {
  //   e.preventDefault();
  //   setCartItem(cartItem + +itemNumber);
  // };

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

  const handlerBuyNow = async (e, id, itemNumber) => {
    e.preventDefault();
    try {
      // console.log(id, "CardProductId");
      // console.log(itemNumber, "itemNumber");
      // console.log(props.loginUserId);

      if (!props.loginUserId) {
        window.alert("กรุณา Login หรือ Register ก่อนซื้อสินค้า");
        return history.push("/login-regis");
      }

      const checkRole = await axios.get("user");
      if (checkRole.data.user.roleAdmin === "ADMIN") {
        window.alert("User นี้ไม่สามารถซื้อสินค้าได้");
        return history.push("/admin");
      }

      const areYouSure = window.confirm("ต้องการซื้อสินค้าใช่หรือไม่?");
      if (!areYouSure) {
        return;
      }

      const resBuyNow = await axios.post("orders", {
        orderItems: [{ cardProductId: id, amount: itemNumber }],
      });
      // console.log(resBuyNow);

      window.alert("สั่งซื้อสินค้าสำเร็จ กรุณายืนยันการชำระเงิน");
      history.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(props);
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
          {/* <button className="button-addToCart" onClick={handlerAddToCart}>
            Add to Cart
          </button> */}
          <button
            className="button-addToCart"
            onClick={(e) => handlerBuyNow(e, props.id, itemNumber)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomepageItem;
