import React, { useEffect, useState } from 'react'
import { PlusOutlined , DeleteFilled , CloseSquareOutlined } from '@ant-design/icons';
import axios from "../../configs/axios";

import Modal from 'react-modal';

const customModalStyles = {
  content : {
    width: 'max-content',
    margin: "auto",
    height: "max-content"
  }
};

function BankAccList() {
  const [bankAccList, setBankAccList] = useState();
  
  useEffect( async () => {
    await getBankAccounts();
  }, []);

  async function getBankAccounts() {
    try {
      const resProductList = await axios.get("bank-acc/in-use");
      setBankAccList(resProductList.data.availableBankAccounts);
    } catch(err) {
      console.log(err);
    }
  }; 
  
  
  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  function openModal() {
    // console.log(modalOpen)
    setModalOpen(true);
  };

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // };

  function closeModal(){
    // console.log(modalOpen)
    setModalOpen(false);
    setInput({
      bankName:"",
      accountName:"",
      accountNumber:""
    });
  };


  // Fn Add BankAcc
  const [input, setInput] = useState({
    bankName:"",
    accountName:"",
    accountNumber:""
  });
  const [errorBankAcc, setErrorBankAcc] = useState({});

  const handlerInputChange = (e) => {
    const { name, value } = e.target
    setInput( (prev) => (
        { ...prev, [name]:value }
      )
    );
  };

  // console.log(input)

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      const addBankRes = await axios.post('/bank-acc', {
        bankName:input.bankName,
        accountName:input.accountName,
        accountNumber:input.accountNumber
      });
      if (addBankRes) {
        setErrorBankAcc({});
      }
      getBankAccounts();
      location.reload();
    } catch(err) {
      // console.log(err)
      // console.log(errorBankAcc)
      if (!input.bankName) {
        setErrorBankAcc(prev => ({ ...prev, err: "bankName is required"})); 
      } else if (!input.accountName) {
        setErrorBankAcc(prev => ({ ...prev, err: "accountName is required"})); 
      } else if (!input.accountNumber) {
        setErrorBankAcc(prev => ({ ...prev, err: "accountNumber is required"})); 
      } else if (err.response) {
        setErrorBankAcc((prev) => ({ ...prev, err: err.response.data.message}))
      };
    }
  };


  // Fn Delete BankAcc 
  const handlerDeleteBank = async (e ,bankAccId) => {
    e.preventDefault();
    console.log(bankAccId)
    try {
      const confirmDeleteBankAcc = window.confirm("Delete this BankAcc?");
      if (confirmDeleteBankAcc) {
        await axios.patch("bank-acc/" + bankAccId,{
          isDeleted:"DELETED"
        });
        getBankAccounts();
        // location.reload();
      };
    } catch(err) {
      if (err.response) {
        setErrorBankAcc((prev) => ({ ...prev, err: err.response.data.message}))
      };
    }
  };

  return (
    <div className="content-center-admin-secondBox">
      <div className="content-center-profile-admin-secondBox-inside">
        <h2>บัญชีธนาคาร</h2>
        <hr className="loginPage-form-div-hr"/>

        <table className="content-center-profile-admin-secondBox-table">
          <tbody>
            <tr>
              <th  className="content-center-profile-admin-secondBox-table-row1">
                ลำดับ
              </th>
              <th  className="content-center-profile-admin-secondBox-table-row2">
                ชื่อธนาคาร
              </th>
              <th  className="content-center-profile-admin-secondBox-table-row3">
                ชื่อบัญชี
              </th>
              <th  className="content-center-profile-admin-secondBox-table-row4">
                เลขที่บัญชี
              </th>
              <th  className="content-center-profile-admin-secondBox-table-row5">
                ปุ่ม
              </th>
            </tr>

            {bankAccList?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="content-center-profile-admin-secondBox-table-row1">
                    {index + 1}
                  </td>
                  <td className="content-center-profile-admin-secondBox-table-row2">
                    {item.bankName}
                  </td>
                  <td className="content-center-profile-admin-secondBox-table-row3">
                    {item.accountName}
                  </td>
                  <td className="content-center-profile-admin-secondBox-table-row4">
                    {item.accountNumber}
                  </td>
                  <td className="content-center-profile-admin-secondBox-table-row5">
                    <div className="content-center-profile-admin-secondBox-table-btn-group">
                      <button className="content-center-profile-admin-secondBox-table-btn-delete"
                        onClick={(e) => handlerDeleteBank(e, item.id)}
                      ><DeleteFilled /> Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
            
            
          </tbody>
        </table>

        <div className="content-center-profile-admin-secondBox-footer">
          <button  className="content-center-profile-admin-secondBox-footer-btn-add" onClick={openModal}><PlusOutlined /> Add BankAccount</button>
        </div>

        <Modal
          isOpen={modalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="AddBankAcc Modal"
          ariaHideApp={false}
        >
          <div className="modal-box" >
            <div className="modal-box-header" >
              <h2>เพิ่มบัญชีธนาคาร</h2>
              <CloseSquareOutlined onClick={closeModal} className="modal-box-header-close-btn" />
            </div>
            
            <form className="modal-box-form" >
              <table className="modal-box-form-table-input" >
                <tbody>
                  <tr>
                    <td className="modal-box-form-table-text" >
                      <label htmlFor="bank-name">ชื่อธนาคาร</label>
                    </td>
                    <td>
                      <input type="text" id="bank-name" className="modal-box-form-table-input" 
                        name="bankName" value={input.bankName} onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="modal-box-form-table-text" >
                      <label htmlFor="acc-name">ชื่อบัญชี</label>
                    </td>
                    <td>
                      <input type="text" id="acc-name" className="modal-box-form-table-input" 
                        name="accountName" value={input.accountName} onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="modal-box-form-table-text" >
                      <label htmlFor="acc-number">เลขที่บัญชี</label>
                    </td>
                    <td>
                      <input type="text" id="acc-number" className="modal-box-form-table-input" 
                        name="accountNumber" value={input.accountNumber} onChange={handlerInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {errorBankAcc.err && <span className="modal-box-error-box"><h4>{errorBankAcc.err}</h4></span>} 
              <button type="submit" className="modal-box-form-submit-btn"
                onClick={handlerSubmit}
              >
                + เพิ่มบัญชีธนาคาร
              </button>

            </form>
          </div>
        </Modal>

      </div>
    </div>
  )
}

export default BankAccList
