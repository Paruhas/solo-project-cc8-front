import React from "react";

import { CloseSquareOutlined } from "@ant-design/icons";

import Modal from "react-modal";

const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "80%",
  },
};

function ModalOpenSlip(props) {
  return (
    <Modal
      isOpen={props.modalSlipOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModalSlip}
      style={customModalStyles}
      contentLabel="Slip Modal"
      ariaHideApp={false}
    >
      <div className="modal-box-header">
        <div>
          <h2>Slip OrderId: {props.slipImage?.Order?.id}</h2>
        </div>
        <CloseSquareOutlined
          onClick={props.closeModalSlip}
          className="modal-box-header-close-btn"
        />
      </div>

      <img
        src={props.slipImage?.img}
        alt={"img error"}
        className="modal-box-approvePayment-table-img"
      />
    </Modal>
  );
}

export default ModalOpenSlip;
