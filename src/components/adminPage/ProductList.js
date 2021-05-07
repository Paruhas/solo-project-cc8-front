import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  ToolFilled,
  DeleteFilled,
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

function ProductList() {
  const [productLists, setProductLists] = useState();
  const [cardCodeLists, setCardCodeLists] = useState();

  useEffect(async () => {
    await getProducts();
  }, []);

  async function getProducts() {
    try {
      const resAllNotDeleteProductList = await axios.get("card-products/not/");
      setProductLists(resAllNotDeleteProductList.data.notDeleteCardProducts);

      const resCountAvailableProduct = await axios.get(
        "card-code/" + "" + "?status=0"
      );
      setCardCodeLists(resCountAvailableProduct.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [errorProduct, setErrorProduct] = useState({});

  //Fn Add CardCode
  const handlerAddCardCode = async (e, productId) => {
    e.preventDefault();
    console.log(productId);
    openModal(productId);
  };
  //Fn Edit CardCode
  const handlerEditProduct = async (e, productId) => {
    e.preventDefault();
    console.log(productId);
  };

  // Fn Delete Product
  const handlerDeleteProduct = async (e, productId) => {
    e.preventDefault();
    // console.log(productId);
    try {
      const confirmDeleteProduct = window.confirm("Delete this Product?");
      if (confirmDeleteProduct) {
        await axios.patch("card-products/" + productId, {
          isDeleted: "DELETED",
        });
        getProducts();
        location.reload();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        // console.log(err.response)
        setErrorProduct((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      }
    }
  };

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="content-center-admin-firstBox">
        <div className="content-center-profile-admin-firstBox-inside">
          <h2>แก้ไขสินค้า</h2>
          <hr className="loginPage-form-div-hr" />

          <table className="content-center-profile-admin-firstBox-table">
            <tbody>
              <tr>
                <th className="content-center-profile-admin-firstBox-table-row1">
                  ลำดับ
                </th>
                <th className="content-center-profile-admin-firstBox-table-row2">
                  img
                </th>
                <th className="content-center-profile-admin-firstBox-table-row3">
                  ชื่อสินค้า
                </th>
                <th className="content-center-profile-admin-firstBox-table-row4">
                  ราคา
                </th>
                <th className="content-center-profile-admin-firstBox-table-row5">
                  สต็อค
                </th>
                <th className="content-center-profile-admin-firstBox-table-row6">
                  ปุ่ม
                </th>
              </tr>

              {productLists?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="content-center-profile-admin-firstBox-table-row1">
                      {index + 1}
                    </td>
                    <td className="content-center-profile-admin-firstBox-table-row2">
                      <div className="content-center-profile-admin-firstBox-table-row2-div">
                        <img
                          src={item.img}
                          alt={"item"}
                          className="content-center-profile-admin-firstBox-table-row2-div-img"
                        />
                      </div>
                    </td>
                    <td className="content-center-profile-admin-firstBox-table-row3">
                      {item.name}
                    </td>
                    <td className="content-center-profile-admin-firstBox-table-row4">
                      {item.price + " บาท"}
                    </td>
                    <td className="content-center-profile-admin-firstBox-table-row5">
                      {
                        cardCodeLists?.cardCodes.filter((item1, index1) => {
                          return item1.cardProductId == item.id;
                        }).length
                      }
                    </td>
                    <td className="content-center-profile-admin-firstBox-table-row6">
                      <div className="content-center-profile-admin-firstBox-table-btn-group">
                        <button
                          className="content-center-profile-admin-firstBox-table-btn-add"
                          onClick={(e) => handlerAddCardCode(e, item.id)}
                        >
                          <PlusOutlined /> Add CardCode
                        </button>
                        <button
                          className="content-center-profile-admin-firstBox-table-btn-edit"
                          onClick={(e) => handlerEditProduct(e, item.id)}
                        >
                          <ToolFilled /> Edit
                        </button>
                        <button
                          className="content-center-profile-admin-firstBox-table-btn-delete"
                          onClick={(e) => handlerDeleteProduct(e, item.id)}
                        >
                          <DeleteFilled /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {errorProduct.err && (
            <div className="modal-box-error-box">
              <h4>{errorProduct.err}</h4>
            </div>
          )}

          <div className="content-center-profile-admin-firstBox-footer">
            <button className="content-center-profile-admin-firstBox-footer-btn-add">
              <PlusOutlined /> Add CardProduct
            </button>
          </div>
        </div>
      </div>

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
              <h2>เพิ่มรหัสบัตร</h2>
              <h2>CardProduct ID: {"productId"}</h2>
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
              <tr key={"item.id"}>
                <td className="modal-box-form-payment-table-adminBank-text">
                  <h4>{"item.accountName"}</h4>
                </td>
                <td className="modal-box-form-payment-table-adminBank-text">
                  <h4>{"item.bankName"}</h4>
                </td>
                <td className="modal-box-form-payment-table-adminBank-text">
                  <h4>{"item.accountNumber"}</h4>
                </td>
              </tr>
            </tbody>
          </table>

          <form className="modal-box-form">
            <table className="modal-box-form-payment-table-input">
              <tbody>
                <tr>
                  <td className="modal-box-form-payment-table-text">
                    <div className="modal-box-form-payment-table-imgPre-box">
                      <div className="modal-box-form-payment-table-imgPre-box-text">
                        ภาพตัวอย่างจะแสดงตรงนี้
                      </div>
                    </div>
                  </td>
                  <td>
                    <label htmlFor="payment-image">รูปภาพ</label>
                    <input
                      type="file"
                      id="payment-image"
                      className="modal-box-form-payment-table-input-img"
                      name="paymentImage"
                      onChange={"handlerPaymentImage"}
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
                      onChange={"handlerPaymentDate"}
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
                      onChange={"handlerPaymentTime"}
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
                      onChange={"handlerPaymentNumberChange"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* {errorPayment.err && (
              <span className="modal-box-error-box">
                <h4>{errorPayment.err}</h4>
              </span>
            )} */}
            <button
              type="submit"
              className="modal-box-form-submit-btn"
              onClick={"handlerSubmit"}
            >
              อัพโหลดหลักฐานการโอนเงิน
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProductList;
