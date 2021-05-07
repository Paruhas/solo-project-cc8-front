import React, { useEffect, useState } from 'react';
import { PlusOutlined , ToolFilled , DeleteFilled } from '@ant-design/icons';
import axios from "../../configs/axios";

function ProductList() {
  const [productLists, setProductLists] = useState();
  const [cardCodeLists, setCardCodeLists] = useState();
  
  useEffect( async () => {
    await getProducts();
  }, []);

  async function getProducts() {
    try {
      const resAllNotDeleteProductList = await axios.get("card-products/not/");
      setProductLists(resAllNotDeleteProductList.data.notDeleteCardProducts);

      const resCountAvailableProduct = await axios.get("card-code/" + "" + "?status=0");
      setCardCodeLists(resCountAvailableProduct.data);
    } catch(err) {
      console.log(err);
    }
  };  

  const [errorProduct, setErrorProduct] = useState({})

  // Fn Delete Product 
  const handlerDeleteProduct = async (e ,productId) => {
    e.preventDefault();
    console.log(productId)
    try {
      const confirmDeleteProduct = window.confirm("Delete this Product?");
      if (confirmDeleteProduct) {
        await axios.patch("card-products/" + productId,{
          isDeleted:"DELETED"
      });
        getProducts();
        location.reload();
      };
    } catch(err) {
      console.log(err)
      if (err.response) {
        // console.log(err.response)
        setErrorProduct((prev) => ({ ...prev, err: err.response.data.message}))
      };
    }
  };


  return (
    <div className="content-center-admin-firstBox">
      <div className="content-center-profile-admin-firstBox-inside">
        <h2>แก้ไขสินค้า</h2>
        <hr className="loginPage-form-div-hr"/>

        <table className="content-center-profile-admin-firstBox-table">
          <tbody>
            <tr>
              <th  className="content-center-profile-admin-firstBox-table-row1">
                ลำดับ
              </th>
              <th  className="content-center-profile-admin-firstBox-table-row2">
                img
              </th>
              <th  className="content-center-profile-admin-firstBox-table-row3">
                ชื่อสินค้า
              </th>
              <th  className="content-center-profile-admin-firstBox-table-row4">
                ราคา
              </th>
              <th  className="content-center-profile-admin-firstBox-table-row5">
                สต็อค
              </th>
              <th  className="content-center-profile-admin-firstBox-table-row6">
                ปุ่ม
              </th>
            </tr>

            {productLists?.map((item, index) => {              
              return (<tr key={item.id}>
              <td className="content-center-profile-admin-firstBox-table-row1" >
                {index + 1}
              </td>
              <td className="content-center-profile-admin-firstBox-table-row2">
                <div className="content-center-profile-admin-firstBox-table-row2-div">
                  <img src={item.img} alt={"item"} className="content-center-profile-admin-firstBox-table-row2-div-img" />
                </div>
              </td>
              <td className="content-center-profile-admin-firstBox-table-row3">
                {item.name}
              </td>
              <td className="content-center-profile-admin-firstBox-table-row4">
                {item.price + " บาท"}
              </td>
              <td className="content-center-profile-admin-firstBox-table-row5">
                {(cardCodeLists?.cardCodes.filter((item1, index1) => {
                  return item1.cardProductId == item.id;
                }).length)}
              </td>
              <td className="content-center-profile-admin-firstBox-table-row6">
                <div className="content-center-profile-admin-firstBox-table-btn-group">
                  <button className="content-center-profile-admin-firstBox-table-btn-add"><PlusOutlined /> Add CardCode</button>
                  <button className="content-center-profile-admin-firstBox-table-btn-edit"><ToolFilled /> Edit</button>
                  <button className="content-center-profile-admin-firstBox-table-btn-delete"
                    onClick={(e) => handlerDeleteProduct(e, item.id)}
                  ><DeleteFilled /> Delete</button>
                </div>
              </td>
            </tr>)
              })}
           
          </tbody>
        </table>
        
        {errorProduct.err && <div className="modal-box-error-box"><h4>{errorProduct.err}</h4></div>}

        <div className="content-center-profile-admin-firstBox-footer">
          <button className="content-center-profile-admin-firstBox-footer-btn-add"><PlusOutlined /> Add CardProduct</button>
        </div>

      </div>
    </div>
  )
}

export default ProductList
