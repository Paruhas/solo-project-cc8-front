import React from "react";

import Modal from "react-modal";
import { CloseSquareOutlined } from "@ant-design/icons";

const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "max-content",
  },
};

function ModalViewCardCode(props) {
  return (
    <Modal
      isOpen={props.viewCardCodeModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.closeViewCardCodeModal}
      style={customModalStyles}
      contentLabel="ViewCardCodeModal Modal"
      ariaHideApp={false}
    >
      <div className="modal-box-header">
        <div>
          <h2>รหัสบัตรเติมเงินของคุณ</h2>
          <h2>OrderId: {props.orderId}</h2>
        </div>
        <CloseSquareOutlined
          onClick={props.closeViewCardCodeModal}
          className="modal-box-header-close-btn"
        />
      </div>
      <hr className="loginPage-form-div-hr" />
      <table className="modal-box-viewCardCode-table">
        <tbody>
          <tr>
            <th className="modal-box-viewCardCode-table-th-row1">ลำดับ</th>
            <th className="modal-box-viewCardCode-table-th-row2">ชื่อสินค้า</th>
            <th className="modal-box-viewCardCode-table-th-row3">รหัสบัตร</th>
          </tr>
          {props.viewProduct?.OrderDetails?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="modal-box-viewCardCode-table-th-row1">
                  {index + 1}
                </td>
                <td className="modal-box-viewCardCode-table-th-row2">
                  {item.cardCodeProductName}
                </td>
                <td className="modal-box-viewCardCode-table-th-row3">
                  {"'" + item.CardCode.codeNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
}

export default ModalViewCardCode;
