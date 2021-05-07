import React, { useEffect, useState } from "react";

import axios from "../../configs/axios";
import { getToken } from "../../services/localStorageService";
import jwt_decode from "jwt-decode";

function OrderHistoryBox() {
  const [orderHistory, setOrderHistory] = useState();
  // const [orderItem, setOrderItem] = useState()

  useEffect(async () => {
    await decodeToken();
  }, []);

  async function decodeToken() {
    try {
      const decodedUserData = await jwt_decode(getToken());
      const resOrderHistory = await axios.get(
        "/orders/user/" + decodedUserData.id
      );
      // console.log(resOrderHistory.data.allOrdersByUserId[0].createdAt)
      setOrderHistory(resOrderHistory.data.allOrdersByUserId);
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(orderHistory)

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

            {/* reduce ซ้อน reduce */}
            {/* {orderHistory?.reduce((acc2, item2, index) => {
      const test = item2.OrderDetails.reduce((acc3, item3, index) => {
        // console.log(item3.CardCode.CardProduct.price)
        // acc3 + +item3.CardCode.CardProduct.price
        // console.log(a)
        return acc3 + +item3.CardCode.CardProduct.price
      }, 0)
        

      return (
      <div className="content-center-profile-historyBox-orderDetail-pre-footer">
        <div><h3>ราคารวม</h3></div>
        <div><h3>{test} บาท</h3></div>
      </div>
      )
      }, 0)
    } */}

            {/* เจาะ reduce หาค่า acc ที่แท้จริง เอามาทำผลรวมของOrderแต่ละ Order */}
            {item.OrderDetails.reduce((acc2, item2, index) => {
              // console.log(+item2.CardCode.CardProduct.price)
              // {(acc2.props) ? console.log(acc2.props.children[1].props.children.props.children[0]) : console.log("no")}
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

            {/* แบบยังไม่ได้ทำอะไรเลย */}
            {/* <div className="content-center-profile-historyBox-orderDetail-pre-footer">
    <div><h3>ราคารวม</h3></div>
    <div><h3>{75/1.5*1 + 135/1.5*5} บาท</h3></div>
  </div> */}

            <div className="content-center-profile-historyBox-orderDetail-footer">
              <div>
                <h3>Order Status: {item.paymentStatus}</h3>
              </div>
              <div>
                <button className="content-center-profile-historyBox-orderDetail-footer-btn">
                  อัพโหลดหลักฐานการโอนเงิน
                </button>
              </div>
              <div>
                <button className="content-center-profile-historyBox-orderDetail-footer-btn">
                  ดูรหัสสินค้า
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>

    // // แบบไม่ทำอะไรไว้เลย static web
    // <div className="content-center-profile-historyBox-orderDetail">

    //   <div className="content-center-profile-historyBox-orderDetail-header">
    //     <div><h3>Order Id: {"1"}</h3></div>
    //     <div><h3>Order Date: {"XX-XX-20XX"}</h3></div>
    //   </div>

    //     <table className="content-center-profile-historyBox-orderDetail-table">
    //       <tbody>
    //         <tr>
    //           <td>
    //             <div className="content-center-profile-historyBox-orderDetail-table-left">
    //               <img  alt="item1" className="content-center-profile-historyBox-orderDetail-table-itemImg" />
    //             </div>
    //           </td>
    //           <td>{"75 shell"}</td>
    //           <td>จำนวน x {"1"}</td>
    //           <td>
    //             <div className="content-center-profile-historyBox-orderDetail-table-right">
    //               ราคา {75/1.5*1} บาท
    //             </div>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //     <table className="content-center-profile-historyBox-orderDetail-table">
    //       <tbody>
    //         <tr>
    //           <td>
    //             <div className="content-center-profile-historyBox-orderDetail-table-left">
    //               <img  alt="item1" className="content-center-profile-historyBox-orderDetail-table-itemImg" />
    //             </div>
    //           </td>
    //           <td>{"75 shell"}</td>
    //           <td>จำนวน x {"1"}</td>
    //           <td>
    //             <div className="content-center-profile-historyBox-orderDetail-table-right">
    //               ราคา {75/1.5*1} บาท
    //             </div>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>

    //   <div className="content-center-profile-historyBox-orderDetail-pre-footer">
    //     <div><h3>ราคารวม</h3></div>
    //     <div><h3>{75/1.5*1 + 135/1.5*5} บาท</h3></div>
    //   </div>

    //   <div className="content-center-profile-historyBox-orderDetail-footer">
    //     <div><h3>Order Status: {"COMPLETE"}</h3></div>
    //     <div><button className="content-center-profile-historyBox-orderDetail-footer-btn">อัพโหลดหลักฐานการโอนเงิน</button></div>
    //     <div><button className="content-center-profile-historyBox-orderDetail-footer-btn">ดูรหัสสินค้า</button></div>
    //   </div>

    // </div>
  );
}

export default OrderHistoryBox;
