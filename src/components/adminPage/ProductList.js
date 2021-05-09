import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "../../configs/axios";

import ProductListItem from "./ProductListItem";

const isNumbers = /^\d*$/;

import ModalAddCardCode from "../Modal/ModalAddCardCode";
import ModalEditCardCode from "../Modal/ModalEditCardProduct";
import ModalAddCardProduct from "../Modal/ModalAddCardProduct";

function ProductList() {
  const [productLists, setProductLists] = useState();
  const [cardCodeLists, setCardCodeLists] = useState();
  const [errorProduct, setErrorProduct] = useState({});

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
        setErrorProduct({});
        window.alert("ลบสินค้าเรียบร้อย");
        location.reload();
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        setErrorProduct((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorProduct((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  // Modal Add CardCode
  const [modalAddCardCodeOpen, setModalAddCardCodeOpen] = useState(false);
  const [cardProductDetail, setCardProductDetail] = useState({});

  const [input, setInput] = useState({});
  const [errorModal, setErrorModal] = useState({});

  function openAddCardCodeModal(e, item) {
    // console.log(e);
    // console.log(item);
    setCardProductDetail({ productId: item.id, productName: item.name });
    setModalAddCardCodeOpen(true);
  }
  // console.log(cardProductDetail);

  function closeAddCardCodeModal() {
    setCardProductDetail({});
    setInput({});
    setErrorModal({});
    setModalAddCardCodeOpen(false);
  }

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(input, "input");

  const handlerSubmitAddCardCode = async (e) => {
    e.preventDefault();
    try {
      //validate
      if (!input.cardNumber || !input.cardNumber.trim()) {
        throw new Error("กรุณา กรอกรหัสของ CardCode ลงในช่อง");
      }

      const addCardCodeRes = await axios.post(
        "/card-code/" + cardProductDetail.productId,
        {
          codeNumbers: [{ codeNumber: input.cardNumber }],
        }
      );
      // console.log(addCardCodeRes);
      setErrorModal({});
      window.alert(addCardCodeRes.data.message);
      closeAddCardCodeModal();
      location.reload();
    } catch (err) {
      console.log(err);
      // console.dir(err.response.data.message);
      if (err.response) {
        setErrorModal((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorModal((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  // Modal Edit CardCode
  const [modalEditCardProductOpen, setModalEditCardProductOpen] = useState(
    false
  );
  const [uploadImage, setUploadImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlerUploadImage = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setUploadImage(e.target.files[0]);
    } else {
      setUploadImage(null);
    }
  };
  // console.log(uploadImage, "uploadImage");

  function openEditCardProductModal(e, item) {
    // console.log(e);
    // console.log(item);
    setCardProductDetail({
      productId: item.id,
      productImg: item.img,
      productName: item.name,
      productPrice: item.price,
    });
    setModalEditCardProductOpen(true);
  }
  // console.log(cardProductDetail);

  function closeEditCardProductModal() {
    setCardProductDetail({});
    setUploadImage(null);
    setInput({});
    setErrorModal({});
    setModalEditCardProductOpen(false);
  }

  const handlerSubmitEditCardProduct = async (e) => {
    e.preventDefault();
    try {
      // console.log(uploadImage);
      // console.log(input);

      //validate
      if (!uploadImage) {
        throw Error("กรุณาอัพโหลด รูปภาพ");
      }
      if (!input.editName || !input.editName.trim()) {
        throw Error("กรุณากรอก ชื่อสินค้า");
      }
      if (!input.editPrice || !input.editPrice.trim()) {
        throw Error("กรุณากรอก ราคาสินค้า");
      }
      if (!isNumbers.test(input.editPrice)) {
        throw Error("กรุณากรอก ราคาสินค้าแค่ตัวเลขเท่านั้น");
      }

      setIsLoading(true);

      const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
      formData.append("image", uploadImage);
      const uploadEditImage = await axios
        .post("upload/product", formData)
        .then(async (res) => {
          // console.log(res);
          // console.log(res.data.cardProductImg);
          const editCardProduct = await axios
            .patch("card-products/edit/" + cardProductDetail.productId, {
              img: res.data.cardProductImg,
              name: input.editName,
              price: input.editPrice,
            })
            .then((editCardProduct) => {
              // console.log(editCardProduct);
              if (editCardProduct) {
                setErrorModal({});
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
        setErrorModal((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorModal((prev) => ({
          ...prev,
          err: err.message,
        }));
      }
    }
  };

  // Modal Add CardProduct
  const [modalAddCardProductOpen, setModalAddCardProductOpen] = useState(false);

  function openAddCardProductModal() {
    // console.log("click");
    setModalAddCardProductOpen(true);
  }

  function closeAddCardProductModal() {
    setUploadImage(null);
    setInput({});
    setErrorModal({});
    setModalAddCardProductOpen(false);
  }

  const handlerSubmitAddCardProduct = async (e) => {
    e.preventDefault();
    try {
      // console.log(uploadImage);
      // console.log(input);

      //validate
      if (!uploadImage) {
        throw Error("กรุณาอัพโหลด รูปภาพ");
      }
      if (!input.addName || !input.addName.trim()) {
        throw Error("กรุณากรอก ชื่อสินค้า");
      }
      if (!input.addPrice || !input.addPrice.trim()) {
        throw Error("กรุณากรอก ราคาสินค้า");
      }
      if (!isNumbers.test(input.addPrice)) {
        throw Error("กรุณากรอก ราคาสินค้าแค่ตัวเลขเท่านั้น");
      }

      setIsLoading(true);
      setErrorModal({});

      const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
      formData.append("image", uploadImage);
      const uploadAddCardProductImage = await axios
        .post("upload/product", formData)
        .then(async (res) => {
          // console.log(res);
          // console.log(res.data.cardProductImg);
          const addCardProduct = await axios
            .post("card-products", {
              img: res.data.cardProductImg,
              name: input.addName,
              price: input.addPrice,
            })
            .then((addCardProduct) => {
              // console.log(editCardProduct);
              if (addCardProduct) {
                setErrorModal({});
              }
              setIsLoading(false);
              window.alert("เพิ่มสินค้าสำเร็จ");
              location.reload();
            });
        });
    } catch (err) {
      console.log(err);
      // console.dir(err.response.data.message);
      setIsLoading(false);
      if (err.response) {
        setErrorModal((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      } else {
        setErrorModal((prev) => ({
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
                  <ProductListItem
                    key={item.id}
                    index={index}
                    item={item}
                    id={item.id}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    cardCodeLists={cardCodeLists}
                    openAddCardCodeModal={openAddCardCodeModal}
                    openEditCardProductModal={openEditCardProductModal}
                    handlerDeleteProduct={handlerDeleteProduct}
                  />
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
            <button
              className="content-center-profile-admin-firstBox-footer-btn-add"
              onClick={openAddCardProductModal}
            >
              <PlusOutlined /> Add CardProduct
            </button>
          </div>
        </div>
      </div>

      <ModalAddCardCode
        modalAddCardCodeOpen={modalAddCardCodeOpen}
        closeAddCardCodeModal={closeAddCardCodeModal}
        cardProductDetail={cardProductDetail}
        errorModal={errorModal}
        handlerSubmitAddCardCode={handlerSubmitAddCardCode}
        handlerInputChange={handlerInputChange}
      />

      <ModalEditCardCode
        modalEditCardProductOpen={modalEditCardProductOpen}
        closeEditCardProductModal={closeEditCardProductModal}
        cardProductDetail={cardProductDetail}
        uploadImage={uploadImage}
        errorModal={errorModal}
        handlerUploadImage={handlerUploadImage}
        handlerInputChange={handlerInputChange}
        handlerSubmitEditCardProduct={handlerSubmitEditCardProduct}
        isLoading={isLoading}
      />

      <ModalAddCardProduct
        modalAddCardProductOpen={modalAddCardProductOpen}
        closeAddCardProductModal={closeAddCardProductModal}
        uploadImage={uploadImage}
        errorModal={errorModal}
        handlerUploadImage={handlerUploadImage}
        handlerInputChange={handlerInputChange}
        handlerSubmitAddCardProduct={handlerSubmitAddCardProduct}
        isLoading={isLoading}
      />
    </>
  );
}

export default ProductList;
