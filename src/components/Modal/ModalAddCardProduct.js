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

import Loading from "../item/Loading";

function ModalAddCardProduct(props) {
  return (
    <Modal
      isOpen={props.modalAddCardProductOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.closeAddCardProductModal}
      style={customModalStyles}
      contentLabel="AddCardProduct Modal"
      ariaHideApp={false}
    >
      <div className="modal-box">
        <div className="modal-box-header">
          <div>
            <h2>เพิ่มสินค้า</h2>
          </div>
          <CloseSquareOutlined
            onClick={props.closeAddCardProductModal}
            className="modal-box-header-close-btn"
          />
        </div>
        <form className="modal-box-form">
          <table className="modal-box-form-payment-table-input">
            <tbody>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <div className="modal-box-form-payment-table-imgPre-box">
                    {props.uploadImage === null ? (
                      <div className="modal-box-form-payment-table-imgPre-box-text">
                        ภาพตัวอย่างจะแสดงตรงนี้
                      </div>
                    ) : (
                      <div className="modal-box-form-payment-table-imgPre-box-text-zIndex">
                        ภาพตัวอย่างจะแสดงตรงนี้
                      </div>
                    )}
                    <img
                      src={
                        props.uploadImage === null
                          ? ""
                          : URL.createObjectURL(props.uploadImage)
                      }
                      className="modal-box-form-payment-table-imgPre-box-img"
                    />
                  </div>
                </td>
                <td>
                  <label htmlFor="edit-image">รูปภาพสินค้า</label>
                  <input
                    type="file"
                    id="edit-image"
                    className="modal-box-form-payment-table-input-img"
                    name="editImage"
                    onChange={props.handlerUploadImage}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="edit-name">ชื่อสินค้า</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="edit-name"
                    className="modal-box-form-payment-table-input"
                    name="addName"
                    onChange={props.handlerInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="modal-box-form-payment-table-text">
                  <label htmlFor="edit-price">ราคา</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="edit-price"
                    className="modal-box-form-payment-table-input"
                    name="addPrice"
                    onChange={props.handlerInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {props.errorModal.err && (
            <span className="modal-box-error-box">
              <h4>{props.errorModal.err}</h4>
            </span>
          )}
          {props.isLoading && <Loading />}
          <button
            type="submit"
            className="modal-box-form-submit-btn"
            onClick={props.handlerSubmitAddCardProduct}
          >
            ยืนยันการเพิ่มสินค้า
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddCardProduct;
