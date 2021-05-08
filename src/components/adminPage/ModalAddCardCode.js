import React from "react";

import Modal from "react-modal";

const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "max-content",
  },
};

function ModalAddCardCode(props) {
  function closeAddCardCodeModal() {
    setProductIdForCardCode({});
    setModalAddCardCodeOpen(false);
  }

  return (
    <Modal
      isOpen={props.modalAddCardCodeOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeAddCardCodeModal}
      style={customModalStyles}
      contentLabel="AddBankAcc Modal"
      ariaHideApp={false}
    >
      <div className="modal-box">
        <div className="modal-box-header">
          <div>
            <h2>เพิ่มรหัสบัตร</h2>
            <h2>CardProduct Name: {productIdForCardCode.productName}</h2>
          </div>
          <CloseSquareOutlined
            onClick={closeAddCardCodeModal}
            className="modal-box-header-close-btn"
          />
        </div>

        <form className="modal-box-form">
          <input
            type="text"
            className="modal-box-form-addCardCode-table-input"
            name="cardNumber"
            onChange={handlerInputChange}
          />

          {errorAddCardCode.err && (
            <span className="modal-box-error-box">
              <h4>{errorAddCardCode.err}</h4>
            </span>
          )}
          <button
            type="submit"
            className="modal-box-form-submit-btn"
            onClick={handlerSubmitAddCardCode}
          >
            ยืนยันการเพิ่มรหัสบัตร
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddCardCode;
