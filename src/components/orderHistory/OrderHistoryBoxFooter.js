import React, { useEffect, useState } from "react";
import { CloseSquareOutlined } from "@ant-design/icons";
import axios from "../../configs/axios";

import Modal from "react-modal";
const customModalStyles = {
  content: {
    width: "max-content",
    margin: "auto",
    height: "max-content",
  },
};

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function OrderHistoryBoxFooter(props) {
  const [paymentImagePre, setPaymentImagePre] = useState({
    file: null,
  });

  // Fn Add Payment
  const [paymentImage, setPaymentImage] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentTime, setPaymentTime] = useState("");
  const [paymentBank, setPaymentBank] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");

  const [errorPayment, setErrorPayment] = useState({});

  useEffect(async () => {
    await getAdminBank();
  }, []);

  async function getAdminBank() {
    try {
      const resAdminBank = await axios.get("/bank-acc/in-use");
      setAdminBank(resAdminBank.data.availableBankAccounts);
    } catch (err) {
      console.log(err);
    }
  }

  const handlerPaymentImage = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setPaymentImagePre({ file: URL.createObjectURL(e.target.files[0]) });
      setPaymentImage(e.target.files[0]);
    } else {
      setPaymentImagePre({
        file: null,
      });
      setPaymentImage("");
    }
  };

  const handlerPaymentDate = (e) => {
    // console.log(e.target.value);
    setPaymentDate(e.target.value);
  };

  const handlerPaymentTime = (e) => {
    // console.log(e.target.value);
    setPaymentTime(e.target.value);
  };

  const handlerPaymentBankChange = (e) => {
    // console.log(e.value);
    setPaymentBank(e.value);
  };

  const handlerPaymentNumberChange = (e) => {
    // console.log(e.target.value);
    setPaymentNumber(e.target.value);
  };

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(props);

      //validate
      if (!paymentImage) {
        throw Error("กรุณาอัพโหลด รูปภาพ");
      }
      if (!paymentDate || !paymentDate.trim()) {
        throw Error("กรุณาเลือก วันที่ที่โอนตามSLIP");
      }
      if (!paymentTime || !paymentTime.trim()) {
        throw Error("กรุณาเลือก เวลาที่โอนตามSLIP");
      }
      if (!paymentBank || !paymentBank.trim()) {
        throw Error("กรุณาเลือก บัญชีที่โอนมา");
      }
      if (!paymentNumber || !paymentNumber.trim()) {
        throw Error("กรุณาใส่ เลขที่รายการ");
      }

      const findIdSelectedBank = adminBank.filter((item, index) => {
        return item.bankName === paymentBank ? item.id : null;
      });
      // console.log(findIdSelectedBank[0].id);

      const formData = new FormData(); // ทำให้เป็น multipart from data เพื่อให้ axios ตรวจจับได้ง่ายๆ
      formData.append("image", paymentImage);
      const uploadPaymentImage = await axios
        .post("http://localhost:8000/upload/payment", formData)
        .then(async (res) => {
          // console.log(res);
          // console.log(res.data.paymentImg);
          // console.log(findIdSelectedBank);
          // console.log(findIdSelectedBank[0].id);
          const uploadPayment = await axios
            .patch("payment/upload/" + props.paymentId, {
              img: res.data.paymentImg,
              dateTime: paymentDate + " " + paymentTime,
              transactionNumber: paymentNumber,
              bankAccountId: String(findIdSelectedBank[0].id),
            })
            .then((uploadPayment) => {
              if (uploadPayment) {
                setErrorPayment({});
              }
              window.alert("อัพโหลดหลักฐานการโอนเงินสำเร็จ");
              location.reload();
            });
        });
    } catch (err) {
      console.log(err);
      // console.dir(err.message);
      if (err) {
        setErrorPayment((prev) => ({
          ...prev,
          err: err.message,
        }));
      } else {
        setErrorPayment((prev) => ({
          ...prev,
          err: err.response.data.message,
        }));
      }
    }
  };

  // Modal
  const [modalOpen, setModalOpen] = useState(false);

  async function openModal() {
    try {
      // console.log(props.paymentId);
      const resFindPayment = await axios.get("/payment/" + props.paymentId);
      // console.log(resFindPayment.data.payment.BankAccount);
      if (resFindPayment.data.payment.BankAccount) {
        const wantToUploadAgain = window.confirm(
          "คุณได้มีการอัพโหลดหลักฐานการโอนเงินไปก่อนหน้านี้แล้ว\nต้องการอัพโหลดซ้ำใช่หรือไม่?"
        );
        // console.log(wantToUploadAgain);
        if (wantToUploadAgain) {
          setModalOpen(true);
        }
      } else {
        setModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function closeModal() {
    // console.log(modalOpen)
    setModalOpen(false);
    setPaymentImagePre({ file: null });
    setPaymentImage("");
    setPaymentDate("");
    setPaymentTime("");
    setPaymentBank("");
    setPaymentNumber("");
    setErrorPayment({});
  }

  // Dropdown
  const [adminBank, setAdminBank] = useState([]);
  const options = [];
  const defaultOption = options[0];

  for (let item of adminBank) {
    options.push(item.bankName);
  }

  return (
    <>
      <div>
        <h3>Order Status: {props.paymentStatus}</h3>
      </div>
      <div>
        {props.paymentStatus === "PENDING" ? (
          <button
            className="content-center-profile-historyBox-orderDetail-footer-btn"
            onClick={openModal}
          >
            อัพโหลดหลักฐานการโอนเงิน
          </button>
        ) : (
          <button className="content-center-profile-historyBox-orderDetail-footer-btn-hidden">
            อัพโหลดหลักฐานการโอนเงิน
          </button>
        )}
      </div>
      <div>
        {props.paymentStatus === "COMPLETE" ? (
          <button className="content-center-profile-historyBox-orderDetail-footer-btn">
            ดูรหัสสินค้า
          </button>
        ) : (
          <button className="content-center-profile-historyBox-orderDetail-footer-btn-hidden">
            ดูรหัสสินค้า
          </button>
        )}
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
              <h2>อัพโหลดหลักฐานการโอนเงิน</h2>
              <h2>Order ID: {props.orderId}</h2>
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
              {adminBank?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="modal-box-form-payment-table-adminBank-text">
                      <h4>{item.accountName}</h4>
                    </td>
                    <td className="modal-box-form-payment-table-adminBank-text">
                      <h4>{item.bankName}</h4>
                    </td>
                    <td className="modal-box-form-payment-table-adminBank-text">
                      <h4>{item.accountNumber}</h4>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <form className="modal-box-form">
            <table className="modal-box-form-payment-table-input">
              <tbody>
                <tr>
                  <td className="modal-box-form-payment-table-text">
                    <div className="modal-box-form-payment-table-imgPre-box">
                      {paymentImagePre.file === null ? (
                        <div className="modal-box-form-payment-table-imgPre-box-text">
                          ภาพตัวอย่างจะแสดงตรงนี้
                        </div>
                      ) : (
                        <div className="modal-box-form-payment-table-imgPre-box-text-zIndex">
                          ภาพตัวอย่างจะแสดงตรงนี้
                        </div>
                      )}
                      <img
                        src={paymentImagePre.file}
                        className="modal-box-form-payment-table-imgPre-box-img"
                      />
                    </div>
                  </td>
                  <td>
                    <label htmlFor="payment-image">รูปภาพ</label>
                    <input
                      type="file"
                      id="payment-image"
                      className="modal-box-form-payment-table-input-img"
                      name="paymentImage"
                      onChange={handlerPaymentImage}
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
                      onChange={handlerPaymentDate}
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
                      onChange={handlerPaymentTime}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="modal-box-form-payment-table-text">
                    <label htmlFor="">บัญชีที่โอนมา</label>
                  </td>
                  <td>
                    <Dropdown
                      className="modal-box-form-payment-table-dropdown"
                      options={options}
                      value={defaultOption}
                      placeholder="เลือกบัญชีธนาคารที่ทำการโอน"
                      name="paymentBank"
                      onChange={handlerPaymentBankChange}
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
                      onChange={handlerPaymentNumberChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {errorPayment.err && (
              <span className="modal-box-error-box">
                <h4>{errorPayment.err}</h4>
              </span>
            )}
            <button
              type="submit"
              className="modal-box-form-submit-btn"
              onClick={handlerSubmit}
            >
              อัพโหลดหลักฐานการโอนเงิน
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default OrderHistoryBoxFooter;
