import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "../../configs/axios";

import moment from "moment";

import ModalOpenSlip from "../Modal/ModalOpenSlip";
import ModalOrderDetailAdmin from "../Modal/ModalOrderDetailAdmin";

function ApprovePayment() {
  const [paymentDetail, setPaymentDetail] = useState();
  const [getPaymentOption, setGetPaymentOption] = useState("");

  useEffect(async () => {
    await getAllPayments();
  }, [getPaymentOption]);

  async function getAllPayments() {
    try {
      const paymentsRes = await axios.get("payment?sort=" + getPaymentOption);
      // console.log(paymentsRes.data.payments);
      setPaymentDetail(paymentsRes.data.payment);
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(paymentDetail);

  // get SORT Option
  const [classForSortBtn, setClassForSortBtn] = useState({
    all:
      "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button-active",
    pending: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
    approve: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
    cancel: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
  });
  const handlerSortPayment = async (e, sortOption) => {
    // console.log(sortOption);
    // console.log(e.target.style);
    // console.log(e.target.classList.value);
    e.preventDefault();
    setGetPaymentOption(sortOption);
    if (sortOption === "") {
      setClassForSortBtn({
        all:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button-active",
        pending:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        approve:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        cancel:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
      });
    } else if (sortOption === "0") {
      setClassForSortBtn({
        all: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        pending:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button-active",
        approve:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        cancel:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
      });
    } else if (sortOption === "1") {
      setClassForSortBtn({
        all: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        pending:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        approve:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button-active",
        cancel:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
      });
    } else if (sortOption === "2") {
      setClassForSortBtn({
        all: "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        pending:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        approve:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button",
        cancel:
          "content-center-profile-admin-thirdBox-sortGroup-btnGroup-button-active",
      });
    }
    setError({});
  };

  // Fn Approve Payment
  const [error, setError] = useState({});

  const handlerAcceptPayment = async (e, paymentId) => {
    e.preventDefault();
    // console.log(paymentId);
    try {
      const confirmAccept = window.confirm(
        "ยอมรับการโอนเงิน และส่งรหัสสินค้าให้กับลูกค้า?"
      );
      if (!confirmAccept) {
        return;
      }
      const acceptPaymentRes = await axios.patch("/payment/approve", {
        paymentId: paymentId,
      });
      // console.log(acceptPaymentRes);
      setError({});
      getAllPayments();
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  // Fn Cancel Payment
  const handlerCancelPayment = async (e, paymentId) => {
    e.preventDefault();
    // console.log(paymentId);
    try {
      const confirmCancel = window.confirm(
        "ปฏิเสธการโอนเงิน และยกเลิกการสั่งซื้อของลูกค้า?"
      );
      if (!confirmCancel) {
        return;
      }
      const cancelPaymentRes = await axios.patch("/payment/cancel", {
        paymentId: paymentId,
      });
      // console.log(cancelPaymentRes);
      setError({});
      getAllPayments();
    } catch (err) {
      console.log(err);
      if (err.response) {
        setError((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  //Modal Slip
  const [modalSlipOpen, setModalSlipOpen] = useState(false);
  const [slipImage, setSlipImage] = useState("");

  function openModalSlip(e, item) {
    // console.log(item);
    // console.log(e.target.src);
    setModalSlipOpen(true);
    setSlipImage(item);
  }
  // console.log(slipImage);
  // console.log(slipImage.img);

  function closeModalSlip(e) {
    setError({});
    setSlipImage("");
    setModalSlipOpen(false);
  }

  //Modal Order
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderHis, setOrderHis] = useState();
  const [orderDetail, setOrderDetail] = useState([]);

  async function openModalOrder(e, item) {
    // console.log(e);
    // console.log(item);
    // console.log(item.Order.id, "orderId");
    // console.log(item.Order.userId, "user_id");
    try {
      const orderRes = await axios.get(
        "orders/order-user/" + item.Order.userId + "?orderId=" + item.Order.id
      );
      if (!orderRes) {
        throw new Error("order not found");
      }
      const userRes = await axios.get(
        "user/" + orderRes.data.orderByUserAndOrderId.userId
      );
      if (!userRes) {
        throw new Error("user not found");
      }

      // console.log(orderRes);
      // console.log(orderRes.data.orderByUserAndOrderId);
      // console.log(orderRes.data.orderByUserAndOrderId.createdAt, "createdAt");
      // console.log(orderRes.data.orderByUserAndOrderId.id, "orderId");
      // console.log(orderRes.data.orderByUserAndOrderId.userId, "userId");
      // console.log(orderRes.data.orderByUserAndOrderId.OrderDetails, "map");
      // console.log(userRes.data.user.email, "userEmail");

      setOrderHis({
        createdAt: orderRes.data.orderByUserAndOrderId.createdAt,
        orderId: orderRes.data.orderByUserAndOrderId.id,
        userId: orderRes.data.orderByUserAndOrderId.userId,
        userEmail: userRes.data.user.email,
      });
      setOrderDetail(orderRes.data.orderByUserAndOrderId.OrderDetails);
      setOrderModalOpen(true);
    } catch (err) {
      console.log(err);
      console.dir(err);
    }
  }
  // console.log(orderHis);
  // console.log(orderDetail);

  function closeModalOrder() {
    setOrderModalOpen(false);
    setOrderHis();
    setOrderDetail();
  }

  return (
    <div className="content-center-admin-thirdBox">
      <div className="content-center-profile-admin-thirdBox-inside">
        <h2>ตรวจสอบการโอนเงิน</h2>
        <hr className="loginPage-form-div-hr" />

        {error.err && (
          <div className="modal-box-error-box">
            <h4>{error.err}</h4>
          </div>
        )}

        <div className="content-center-profile-admin-thirdBox-sortGroup">
          <div className="content-center-profile-admin-thirdBox-sortGroup-text">
            <h4>SORT OPTION</h4>
            <h5>( กดที่เลข OrderId เพื่อดูข้อมูลการทำรายการของUser )</h5>
          </div>
          <div className="content-center-profile-admin-thirdBox-sortGroup-btnGroup">
            <button
              className={classForSortBtn.all}
              onClick={(e) => handlerSortPayment(e, "")}
            >
              ALL
            </button>
            <button
              className={classForSortBtn.pending}
              onClick={(e) => handlerSortPayment(e, "0")}
            >
              PENDING
            </button>
            <button
              className={classForSortBtn.approve}
              onClick={(e) => handlerSortPayment(e, "1")}
            >
              APPROVE
            </button>
            <button
              className={classForSortBtn.cancel}
              onClick={(e) => handlerSortPayment(e, "2")}
            >
              CANCEL
            </button>
          </div>
        </div>

        <table className="content-center-profile-admin-thirdBox-table">
          <tbody>
            <tr className="content-center-profile-admin-thirdBox-table-tr">
              <th className="content-center-profile-admin-thirdBox-table-row1">
                ลำดับ
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row2">
                OrderId
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row3">
                รูปภาพ
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row4">
                วันที่และเวลา
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row5">
                บัญชีที่โอนเข้า
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row6">
                เลขที่รายการ
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row7">
                สถานะ
              </th>
              <th className="content-center-profile-admin-thirdBox-table-row8">
                ปุ่ม
              </th>
            </tr>
          </tbody>
        </table>

        {paymentDetail?.map((item, index) => {
          return (
            <table
              className="content-center-profile-admin-thirdBox-table"
              key={item.id}
            >
              <tbody>
                <tr className="content-center-profile-admin-thirdBox-table-tr">
                  <td className="content-center-profile-admin-thirdBox-table-row1">
                    {index + 1}
                  </td>
                  <td
                    className="content-center-profile-admin-thirdBox-table-row2"
                    onClick={(e) => openModalOrder(e, item)}
                  >
                    {item.Order?.id}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row3">
                    <div className="content-center-profile-admin-firstBox-table-row2-div">
                      {item.img && (
                        <img
                          onClick={(e) => openModalSlip(e, item)}
                          src={item.img}
                          alt={"img error"}
                          className="content-center-profile-admin-firstBox-table-row2-div-img"
                        />
                      )}
                    </div>
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row4">
                    {item.dateTime &&
                      moment(item.dateTime).format("DD/MM/YYYY")}{" "}
                    &nbsp;
                    {item.dateTime && moment(item.dateTime).format("HH:mm")}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row5">
                    {item.BankAccount?.bankName}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row6">
                    {item.transactionNumber}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row7">
                    {item.Order?.paymentStatus}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row8">
                    {item.Order?.paymentStatus === "PENDING" && (
                      <div className="content-center-profile-admin-thirdBox-table-btn-group">
                        <button
                          className="content-center-profile-admin-thirdBox-table-btn-accept"
                          onClick={(e) => handlerAcceptPayment(e, item?.id)}
                        >
                          <CheckOutlined />
                        </button>
                        <button
                          className="content-center-profile-admin-thirdBox-table-btn-cancel"
                          onClick={(e) => handlerCancelPayment(e, item?.id)}
                        >
                          <CloseOutlined />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}

        <ModalOpenSlip
          modalSlipOpen={modalSlipOpen}
          closeModalSlip={closeModalSlip}
          slipImage={slipImage}
        />

        <ModalOrderDetailAdmin
          orderModalOpen={orderModalOpen}
          closeModalOrder={closeModalOrder}
          orderHis={orderHis}
          orderDetail={orderDetail}
        />
      </div>
    </div>
  );
}

export default ApprovePayment;
