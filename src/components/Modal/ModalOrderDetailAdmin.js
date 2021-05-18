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

import moment from "moment";

function ModalOrderDetailAdmin(props) {
  return (
    <Modal
      isOpen={props.orderModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModalOrder}
      style={customModalStyles}
      contentLabel="ShowOrderDetailForAdmin Modal"
      ariaHideApp={false}
    >
      <div className="modal-box-header">
        <div>
          <h2>ประวัติข้อมูลการทำรายการของUser</h2>
        </div>
        <CloseSquareOutlined
          onClick={props.closeModalOrder}
          className="modal-box-header-close-btn"
        />
      </div>
      <div className="modal-box-approvePayment-table-orderHis">
        <div className="content-center-profile-historyBox-orderDetail-header">
          <div>
            <h3>Order Id: {props.orderHis?.orderId}</h3>
            <h3>User Email:</h3>
          </div>
          <div>
            <h3>
              Order Date:
              {props.orderHis?.createdAt &&
                moment(props.orderHis?.createdAt).format("DD/MM/YYYY")}
            </h3>
            <h3>{props.orderHis?.userEmail}</h3>
          </div>
        </div>
        {props.orderDetail?.map((item, index) => {
          return (
            <table
              className="content-center-profile-historyBox-orderDetail-table"
              key={item.id}
            >
              <tbody>
                <tr>
                  <td>
                    <div className="modal-box-approvePayment-table-orderHis-img">
                      <img
                        src={item.cardCodeProductImg}
                        alt="productImg"
                        className="content-center-profile-historyBox-orderDetail-table-itemImg"
                      />
                    </div>
                  </td>
                  <td>{item.cardCodeProductName}</td>
                  <td>
                    <div className="content-center-profile-historyBox-orderDetail-table-right">
                      ราคา {item.cardCodeProductPrice} บาท
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}

        <div className="content-center-profile-historyBox-orderDetail-pre-footer">
          <div>
            <h3>ราคารวม</h3>
          </div>
          <div>
            <h3>
              {props.orderDetail?.reduce((acc, item) => {
                return (acc = acc + +item.cardCodeProductPrice);
              }, 0)}{" "}
              บาท
            </h3>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalOrderDetailAdmin;
