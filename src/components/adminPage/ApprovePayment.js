import React, { useEffect, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import axios from "../../configs/axios";

import Modal from "react-modal";

const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "max-content",
  },
};

function ApprovePayment() {
  const [paymentDetail, setPaymentDetail] = useState();

  useEffect(async () => {
    await getAllPayments();
  }, []);

  async function getAllPayments() {
    try {
      const allPaymentsRes = await axios.get("payment/");
      // console.log(allPaymentsRes.data.payments);
      setPaymentDetail(allPaymentsRes.data.payments);
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(paymentDetail);

  return (
    <div className="content-center-admin-thirdBox">
      <div className="content-center-profile-admin-thirdBox-inside">
        <h2>ตรวจสอบการโอนเงิน</h2>
        <hr className="loginPage-form-div-hr" />

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

            {paymentDetail?.map((item, index) => {
              // console.log(item);
              // console.log(item.Order?.id);
              // console.log(item.img);
              // console.log(item.dateTime);
              // console.log(item.BankAccount?.bankName);
              // console.log(item.transactionNumber);
              // console.log(item.Order?.paymentStatus);
              return (
                <tr
                  className="content-center-profile-admin-thirdBox-table-tr"
                  key={item.id}
                >
                  <td className="content-center-profile-admin-thirdBox-table-row1">
                    {index + 1}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row2">
                    {item.Order?.id}
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row3">
                    <div className="content-center-profile-admin-firstBox-table-row2-div">
                      <img
                        onClick={(e) => console.log("click" + item.id)}
                        src={item.img}
                        alt={"img error"}
                        className="content-center-profile-admin-firstBox-table-row2-div-img"
                      />
                    </div>
                  </td>
                  <td className="content-center-profile-admin-thirdBox-table-row4">
                    {item.dateTime}
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
                    <div className="content-center-profile-admin-thirdBox-table-btn-group">
                      <button
                        className="content-center-profile-admin-thirdBox-table-btn-accept"
                        // onClick={"(e) => handlerDeleteBank(e, item.id)"}
                      >
                        <CheckOutlined />
                      </button>
                      <button
                        className="content-center-profile-admin-thirdBox-table-btn-cancel"
                        // onClick={"(e) => handlerDeleteBank(e, item.id)"}
                      >
                        <CloseOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <Modal
          isOpen={modalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="AddBankAcc Modal"
          ariaHideApp={false}
        >
          <div className="modal-box">
            <div className="modal-box-header">
              <h2>เพิ่มบัญชีธนาคาร</h2>
              <CloseSquareOutlined
                onClick={closeModal}
                className="modal-box-header-close-btn"
              />
            </div>

            <form className="modal-box-form">
              <table className="modal-box-form-table-input">
                <tbody>
                  <tr>
                    <td className="modal-box-form-table-text">
                      <label htmlFor="bank-name">ชื่อธนาคาร</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="bank-name"
                        className="modal-box-form-table-input"
                        name="bankName"
                        value={input.bankName}
                        onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="modal-box-form-table-text">
                      <label htmlFor="acc-name">ชื่อบัญชี</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="acc-name"
                        className="modal-box-form-table-input"
                        name="accountName"
                        value={input.accountName}
                        onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="modal-box-form-table-text">
                      <label htmlFor="acc-number">เลขที่บัญชี</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="acc-number"
                        className="modal-box-form-table-input"
                        name="accountNumber"
                        value={input.accountNumber}
                        onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {errorBankAcc.err && (
                <span className="modal-box-error-box">
                  <h4>{errorBankAcc.err}</h4>
                </span>
              )}
              <button
                type="submit"
                className="modal-box-form-submit-btn"
                onClick={handlerSubmit}
              >
                + เพิ่มบัญชีธนาคาร
              </button>
            </form>
          </div>
        </Modal> */}
      </div>
    </div>
  );
}

export default ApprovePayment;
