import React from "react";

import { CloseSquareOutlined } from "@ant-design/icons";

import Modal from "react-modal";

const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "max-content",
  },
};

function ModalAddCardCode(props) {
  return (
    <Modal
      isOpen={props.modalAddCardCodeOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.closeAddCardCodeModal}
      style={customModalStyles}
      contentLabel="AddBankAcc Modal"
      ariaHideApp={false}
    >
      <div className="modal-box">
        <div className="modal-box-header">
          <div>
            <h2>เพิ่มรหัสบัตร</h2>
            <h2>CardProduct Name: {props.productIdForCardCode?.productName}</h2>
          </div>
          <CloseSquareOutlined
            onClick={props.closeAddCardCodeModal}
            className="modal-box-header-close-btn"
          />
        </div>

        <form className="modal-box-form">
          <input
            type="text"
            className="modal-box-form-addCardCode-table-input"
            name="cardNumber"
            onChange={props.handlerInputChange}
          />

          {props.errorAddCardCode?.err && (
            <span className="modal-box-error-box">
              <h4>{props.errorAddCardCode?.err}</h4>
            </span>
          )}
          <button
            type="submit"
            className="modal-box-form-submit-btn"
            onClick={props.handlerSubmitAddCardCode}
          >
            ยืนยันการเพิ่มรหัสบัตร
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddCardCode;
