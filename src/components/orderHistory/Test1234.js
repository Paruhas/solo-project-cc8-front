import React, { useState } from "react";
import { CloseSquareOutlined } from "@ant-design/icons";

function Test1234(props) {
  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="AddBankAcc Modal"
      ariaHideApp={false}
    >
      <div className="modal-box">
        <div className="modal-box-header">
          <div>
            <h2>อัพโหลดหลักฐานการโอนเงิน</h2>
            <h2>Order ID: {props.orderId}</h2>
          </div>
          <CloseSquareOutlined
            onClick={closeModal}
            className="modal-box-header-close-btn"
          />
        </div>

        <table className="modal-box-form-payment-table-adminBank">
          <tbody>
            <tr>
              <td className="modal-box-form-payment-table-adminBank-text">
                <h3>ชื่อบัญชี</h3>
              </td>
              <td className="modal-box-form-payment-table-adminBank-text">
                <h3>ธนาคาร</h3>
              </td>
              <td className="modal-box-form-payment-table-adminBank-text">
                <h3>เลขที่บัญชี</h3>
              </td>
            </tr>
            {adminBank?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="modal-box-form-payment-table-adminBank-text">
                    <h4>{item.accountName}</h4>
                  </td>
                  <td className="modal-box-form-payment-table-adminBank-text">
                    <h4>{item.bankName}</h4>
                  </td>
                  <td className="modal-box-form-payment-table-adminBank-text">
                    <h4>{item.accountNumber}</h4>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <form className="modal-box-form">
          <table className="modal-box-form-payment-table-input">
            <tbody>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <div className="modal-box-form-payment-table-imgPre-box">
                    {paymentImagePre.file === null ? (
                      <div className="modal-box-form-payment-table-imgPre-box-text">
                        ภาพตัวอย่างจะแสดงตรงนี้
                      </div>
                    ) : (
                      <div className="modal-box-form-payment-table-imgPre-box-text-zIndex">
                        ภาพตัวอย่างจะแสดงตรงนี้
                      </div>
                    )}
                    <img
                      src={paymentImagePre.file}
                      className="modal-box-form-payment-table-imgPre-box-img"
                    />
                  </div>
                </td>
                <td>
                  <label htmlFor="payment-image">รูปภาพ</label>
                  <input
                    type="file"
                    id="payment-image"
                    className="modal-box-form-payment-table-input-img"
                    name="paymentImage"
                    onChange={handlerPaymentImage}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="payment-date">วันที่ที่โอนตามSLIP</label>
                </td>
                <td>
                  <input
                    type="date"
                    id="payment-date"
                    className="modal-box-form-payment-table-input"
                    name="paymentDate"
                    onChange={handlerPaymentDate}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="payment-time">เวลาที่โอนตามSLIP</label>
                </td>
                <td>
                  <input
                    type="time"
                    id="payment-time"
                    className="modal-box-form-payment-table-input"
                    name="paymentTime"
                    onChange={handlerPaymentTime}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="">บัญชีที่โอนมา</label>
                </td>
                <td>
                  <Dropdown
                    className="modal-box-form-payment-table-dropdown"
                    options={options}
                    value={defaultOption}
                    placeholder="เลือกบัญชีธนาคารที่ทำการโอน"
                    name="paymentBank"
                    onChange={handlerPaymentBankChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="payment-number">เลขที่รายการ</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="payment-number"
                    className="modal-box-form-payment-table-input"
                    name="paymentNumber"
                    onChange={handlerPaymentNumberChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {errorPayment.err && (
            <span className="modal-box-error-box">
              <h4>{errorPayment.err}</h4>
            </span>
          )}
          <button
            type="submit"
            className="modal-box-form-submit-btn"
            onClick={handlerSubmit}
          >
            อัพโหลดหลักฐานการโอนเงิน
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Test1234;
