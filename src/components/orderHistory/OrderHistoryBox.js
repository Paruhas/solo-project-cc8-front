import React, { useEffect, useState } from "react";

import axios from "../../configs/axios";
import { getToken } from "../../services/localStorageService";
import jwt_decode from "jwt-decode";

import OrderHistoryBoxFooter from "./OrderHistoryBoxFooter";

function OrderHistoryBox() {
  const [orderHistory, setOrderHistory] = useState();

  useEffect(async () => {
    await decodeToken();
  }, []);

  async function decodeToken() {
    try {
      const decodedUserData = await jwt_decode(getToken());
      const resOrderHistory = await axios.get(
        "/orders/user/" + decodedUserData.id
      );
      setOrderHistory(resOrderHistory.data.allOrdersByUserId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {orderHistory?.map((item, index) => {
        var dateString =
          new Date(item.createdAt).getDate() +
          "-" +
          (new Date(item.createdAt).getMonth() + 1) +
          "-" +
          new Date(item.createdAt).getFullYear();
        return (
          <div
            className="content-center-profile-historyBox-orderDetail"
            key={item.id}
          >
            <div className="content-center-profile-historyBox-orderDetail-header">
              <div>
                <h3>Order Id: {item.id}</h3>
              </div>
              <div>
                <h3>Order Date: {dateString}</h3>
              </div>
            </div>

            {item.OrderDetails.map((item1, index) => {
              return (
                <table
                  className="content-center-profile-historyBox-orderDetail-table"
                  key={item1.id}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div className="content-center-profile-historyBox-orderDetail-table-left">
                          <img
                            src={item1.CardCode.CardProduct.img}
                            alt="item1"
                            className="content-center-profile-historyBox-orderDetail-table-itemImg"
                          />
                        </div>
                      </td>
                      <td>{item1.CardCode.CardProduct.name}</td>
                      {/* <td>จำนวน x {"1"}</td> */}
                      <td>
                        <div className="content-center-profile-historyBox-orderDetail-table-right">
                          ราคา {item1.CardCode.CardProduct.price} บาท
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}

            {/* เจาะ reduce หาค่า acc ที่แท้จริง เอามาทำผลรวมของOrderแต่ละ Order */}
            {item.OrderDetails.reduce((acc2, item2, index) => {
              return (
                <div className="content-center-profile-historyBox-orderDetail-pre-footer">
                  <div>
                    <h3>ราคารวม</h3>
                  </div>
                  <div>
                    <h3>
                      {acc2.props
                        ? (acc2 =
                            acc2.props.children[1].props.children.props
                              .children[0] + +item2.CardCode.CardProduct.price)
                        : +item2.CardCode.CardProduct.price}{" "}
                      บาท
                    </h3>
                  </div>
                </div>
              );
            }, 0)}

            <div className="content-center-profile-historyBox-orderDetail-footer">
              <OrderHistoryBoxFooter
                orderId={item.id}
                paymentStatus={item.paymentStatus}
                paymentId={item.paymentId}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderHistoryBox;
