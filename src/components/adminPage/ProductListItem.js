import React from "react";
import { PlusOutlined, ToolFilled, DeleteFilled } from "@ant-design/icons";

function ProductListItem(props) {
  return (
    <tr>
      <td className="content-center-profile-admin-firstBox-table-row1">
        {props.index + 1}
      </td>
      <td className="content-center-profile-admin-firstBox-table-row2">
        <div className="content-center-profile-admin-firstBox-table-row2-div">
          <img
            src={props.img}
            alt={"item"}
            className="content-center-profile-admin-firstBox-table-row2-div-img"
          />
        </div>
      </td>
      <td className="content-center-profile-admin-firstBox-table-row3">
        {props.name}
      </td>
      <td className="content-center-profile-admin-firstBox-table-row4">
        {props.price + " บาท"}
      </td>
      <td className="content-center-profile-admin-firstBox-table-row5">
        {
          props.cardCodeLists?.cardCodes.filter((item1, index1) => {
            return item1.cardProductId == props.id;
          }).length
        }
      </td>
      <td className="content-center-profile-admin-firstBox-table-row6">
        <div className="content-center-profile-admin-firstBox-table-btn-group">
          <button
            className="content-center-profile-admin-firstBox-table-btn-add"
            onClick={(e) => props.openAddCardCodeModal(e, props.id, props.name)}
          >
            <PlusOutlined /> Add CardCode
          </button>
          <button
            className="content-center-profile-admin-firstBox-table-btn-edit"
            onClick={(e) => props.openEditCardCodeModal(e, props.item)}
          >
            <ToolFilled /> Edit
          </button>
          <button
            className="content-center-profile-admin-firstBox-table-btn-delete"
            onClick={(e) => props.handlerDeleteProduct(e, props.id)}
          >
            <DeleteFilled /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductListItem;
