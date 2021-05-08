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

import Loading from "../item/Loading";

import ModalAddCardCode from "./ModalAddCardCode";

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

  // Fn Delete Product
  const handlerDeleteProduct = async (e, productId) => {
    e.preventDefault();
    // console.log(productId);
    try {
      const confirmDeleteProduct = window.confirm("Delete this Product?");
      if (confirmDeleteProduct) {
        await axios.patch("card-products/delete/" + productId, {
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

  // Add CardCode
  // Modal Add CardCode
  const [modalAddCardCodeOpen, setModalAddCardCodeOpen] = useState(false);
  const [productIdForCardCode, setProductIdForCardCode] = useState({});

  function openAddCardCodeModal(e, productId, productName) {
    setProductIdForCardCode({ productId, productName });
    setModalAddCardCodeOpen(true);
  }
  // console.log(productIdForCardCode);

  function closeAddCardCodeModal() {
    setProductIdForCardCode({});
    setModalAddCardCodeOpen(false);
  }

  const [inputAddCardCode, setInputAddCardCode] = useState({
    cardNumber: "",
  });

  const handlerInputChange = (e) => {
    setInputAddCardCode({
      cardNumber: e.target.value,
    });
  };
  // console.log(inputAddCardCode);

  const [errorAddCardCode, setErrorAddCardCode] = useState({});

  const handlerSubmitAddCardCode = async (e) => {
    e.preventDefault();
    try {
      //validate
      if (!inputAddCardCode.cardNumber || !inputAddCardCode.cardNumber.trim()) {
        throw new Error("กรุณา กรอกรหัสของ CardCode ลงในช่อง");
      }

      const addCardCodeRes = await axios.post(
        "/card-code/" + productIdForCardCode.productId,
        {
          codeNumbers: [{ codeNumber: inputAddCardCode.cardNumber }],
        }
      );
      // console.log(addCardCodeRes);
      window.alert(addCardCodeRes.data.message);
      closeAddCardCodeModal();
      location.reload();
    } catch (err) {
      console.log(err);
      // console.dir(err.response.data.message);
      if (err.response) {
        setErrorAddCardCode((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorAddCardCode((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  // Edit CardCode
  // Modal Edit CardCode
  const [modalEditCardCodeOpen, setModalEditCardCodeOpen] = useState(false);
  const [uploadImageEdit, setUploadImageEdit] = useState(null);
  const [inputEditCardCode, setInputEditCardCode] = useState({
    editName: "",
    editPrice: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorEditCardCode, setErrorEditCardCode] = useState({});

  const handlerUploadImageEdit = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setUploadImageEdit(e.target.files[0]);
    } else {
      setUploadImageEdit(null);
    }
  };

  function openEditCardCodeModal(e, item) {
    // console.log(item);
    setProductIdForCardCode({
      productId: item.id,
      productImg: item.img,
      productName: item.name,
      productPrice: item.price,
    });
    setModalEditCardCodeOpen(true);
  }
  // console.log(productIdForCardCode);

  function closeEditCardCodeModal() {
    setProductIdForCardCode({});
    setModalEditCardCodeOpen(false);
    setUploadImageEdit(null);
    setInputEditCardCode({
      editName: "",
      editPrice: "",
    });
    setErrorEditCardCode({});
  }

  const handlerEditInputChange = (e) => {
    const { name, value } = e.target;
    setInputEditCardCode((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(inputEditCardCode);

  const handlerSubmitEditCardCode = async (e) => {
    e.preventDefault();
    try {
      // return;
      // console.log(uploadImageEdit);
      // console.log(inputEditCardCode);

      //validate
      if (!uploadImageEdit) {
        throw Error("กรุณาอัพโหลด รูปภาพ");
      }
      if (!inputEditCardCode.editName || !inputEditCardCode.editName.trim()) {
        throw Error("กรุณากรอก ชื่อสินค้า");
      }
      if (!inputEditCardCode.editPrice || !inputEditCardCode.editPrice.trim()) {
        throw Error("กรุณากรอก ราคาสินค้า");
      }

      setIsLoading(true);

      const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
      formData.append("image", uploadImageEdit);
      const uploadEditImage = await axios
        .post("upload/product", formData)
        .then(async (res) => {
          // console.log(res);
          // console.log(res.data.cardProductImg);
          const editCardProduct = await axios
            .patch("card-products/edit/" + productIdForCardCode.productId, {
              img: res.data.cardProductImg,
              name: inputEditCardCode.editName,
              price: inputEditCardCode.editPrice,
            })
            .then((editCardProduct) => {
              console.log(editCardProduct);
              if (editCardProduct) {
                setErrorEditCardCode({});
              }
              setIsLoading(false);
              window.alert("แก้ไขสินค้าสำเร็จ");
              location.reload();
            });
        });
    } catch (err) {
      console.log(err);
      // console.dir(err.response.data.message);
      setIsLoading(false);
      if (err.response) {
        setErrorEditCardCode((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorEditCardCode((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

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
                          onClick={(e) =>
                            openAddCardCodeModal(e, item.id, item.name)
                          }
                        >
                          <PlusOutlined /> Add CardCode
                        </button>
                        <button
                          className="content-center-profile-admin-firstBox-table-btn-edit"
                          onClick={(e) => openEditCardCodeModal(e, item)}
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

      <ModalAddCardCode modalAddCardCodeOpen={modalAddCardCodeOpen} />

      <Modal
        isOpen={modalEditCardCodeOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeEditCardCodeModal}
        style={customModalStyles}
        contentLabel="AddBankAcc Modal"
        ariaHideApp={false}
      >
        <div className="modal-box">
          <div className="modal-box-header">
            <div>
              <h2>แก้ไขสินค้า</h2>
            </div>
            <CloseSquareOutlined
              onClick={closeEditCardCodeModal}
              className="modal-box-header-close-btn"
            />
          </div>
          <hr className="loginPage-form-div-hr" />
          <h3>ข้อมูลเดิม</h3>
          <table className="modal-box-form-editCardProduct-table">
            <tbody>
              <tr>
                <td>
                  <h4>รูปภาพสินค้าเดิม</h4>
                </td>
                <td>
                  <h4>ชื่อสินค้าเดิม</h4>
                </td>
                <td>
                  <h4>ราคาสินค้าเดิม</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    src={productIdForCardCode.productImg}
                    className="modal-box-form-editCardProduct-table-img"
                  />
                </td>
                <td>{productIdForCardCode.productName}</td>
                <td>{productIdForCardCode.productPrice} บาท</td>
              </tr>
            </tbody>
          </table>

          <form className="modal-box-form">
            <table className="modal-box-form-payment-table-input">
              <tbody>
                <tr>
                  <td className="modal-box-form-payment-table-text">
                    <div className="modal-box-form-payment-table-imgPre-box">
                      {uploadImageEdit === null ? (
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
                          uploadImageEdit === null
                            ? ""
                            : URL.createObjectURL(uploadImageEdit)
                        }
                        className="modal-box-form-payment-table-imgPre-box-img"
                      />
                    </div>
                  </td>
                  <td>
                    <label htmlFor="edit-image">เปลี่ยนรูปภาพสินค้า</label>
                    <input
                      type="file"
                      id="edit-image"
                      className="modal-box-form-payment-table-input-img"
                      name="editImage"
                      onChange={handlerUploadImageEdit}
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
                      name="editName"
                      onChange={handlerEditInputChange}
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
                      name="editPrice"
                      onChange={handlerEditInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {errorEditCardCode.err && (
              <span className="modal-box-error-box">
                <h4>{errorEditCardCode.err}</h4>
              </span>
            )}
            {isLoading && <Loading />}
            <button
              type="submit"
              className="modal-box-form-submit-btn"
              onClick={handlerSubmitEditCardCode}
            >
              ยืนยันการแก้ไขสินค้า
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProductList;
