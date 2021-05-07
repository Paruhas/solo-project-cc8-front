import axios from '../../configs/axios';
import React, { useContext, useRef, useState } from 'react';
import jwt_decode from "jwt-decode";
import { getToken , removeToken } from '../../services/localStorageService';
import { EyeOutlined , EyeInvisibleOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContextProvider';

function EditPassword() {
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const decodedUserData = jwt_decode(getToken());

  const [errorChangeP, setErrorChangeP] = useState({});

  const { setIsAuthenticated } = useContext(AuthContext)

  const handlerChangePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setInput( prev => (
        { ...prev, [name]: value }
      )
    );
  };

  const handlerChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!input.oldPassword) return setErrorChangeP(prev => ({ ...prev, err: "oldPassword is required"})) 
      if (!input.newPassword) return setErrorChangeP(prev => ({ ...prev, err: "newPassword is required"})); 
      if (!input.confirmNewPassword) return setErrorChangeP(prev => ({ ...prev, err: "confirmNewPassword is required"}));

      const changePasswordRes = await axios.patch('/user/' + decodedUserData.id, {
        oldPassword: input.oldPassword,
        newPassword: input.newPassword,
        confirmNewPassword: input.confirmNewPassword
      });
      window.alert(changePasswordRes.data.message);
      removeToken("token");
      setIsAuthenticated(false);
    } catch(err) {  
      console.log(err);
      if (err.response) {
        setErrorChangeP((prev) => ({ ...prev, err: err.response.data.message}));
      };
    }
  };

  // show-hide type: password > text
  const [changeTextType, setChangeTextType ] = useState({
    oldPassword: "password",
    newPassword: "password",
    confirmNewPassword: "password",
  });

  const handlerChangeTextTypeOldP = (e) => {
    e.preventDefault();
    (changeTextType.oldPassword === "password") ?
    setChangeTextType( prev => ({ ...prev, oldPassword:"text"})) : 
    setChangeTextType( prev => ({ ...prev, oldPassword:"password"}));
  };

  const handlerChangeTextTypeNewP = (e) => {
    e.preventDefault();
    (changeTextType.newPassword === "password") ?
    setChangeTextType( prev => ({ ...prev, newPassword:"text"})) : 
    setChangeTextType( prev => ({ ...prev, newPassword:"password"}));
  };

  const handlerChangeTextTypeConfirmNewP = (e) => {
    e.preventDefault();
    (changeTextType.confirmNewPassword === "password") ?
    setChangeTextType( prev => ({ ...prev, confirmNewPassword:"text"})) : 
    setChangeTextType( prev => ({ ...prev, confirmNewPassword:"password"}));
  };

  return (
    <div className="content-center-profile-editBox-insideBox">
      <h2>Change Password</h2>
      <hr className="loginPage-form-div-hr"/>
      <form>
        <div>
          <input type={changeTextType.oldPassword} id="profile-changePassword-oldPassword" placeholder="รหัสผ่านปัจจุบัน" className="content-center-profile-editBox-input" 
            name="oldPassword" value={input.oldPassword} onChange={handlerChangePasswordInputChange}
          />
          {!(input.oldPassword === "") && (
            (changeTextType.oldPassword === "password") ? 
              <EyeOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeOldP} /> :
              <EyeInvisibleOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeOldP} />
            )
          }
        </div>
        <div>
          <input type={changeTextType.newPassword} id="profile-changePassword-newPassword" placeholder="รหัสผ่านใหม่" className="content-center-profile-editBox-input" 
            name="newPassword" value={input.newPassword} onChange={handlerChangePasswordInputChange}
          />
          {!(input.newPassword === "") && (
            (changeTextType.newPassword === "password") ? 
              <EyeOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeNewP} /> :
              <EyeInvisibleOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeNewP} />
            )
          }
        </div>
        <div>
          <input type={changeTextType.confirmNewPassword} id="profile-changePassword-confirmNewPassword" placeholder="ยืนยันรหัสผ่านใหม่" className="content-center-profile-editBox-input" 
            name="confirmNewPassword" value={input.confirmNewPassword} onChange={handlerChangePasswordInputChange}
          />
          {!(input.confirmNewPassword === "") && (
            (changeTextType.confirmNewPassword === "password") ? 
              <EyeOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeConfirmNewP} /> :
              <EyeInvisibleOutlined className="change-input-type-text-profile" 
                onClick={handlerChangeTextTypeConfirmNewP} />
            )
          }
        </div>
        {errorChangeP.err && <span className="error-box"><h4>{errorChangeP.err}</h4></span>}
        <button className="loginPage-form-div-submit-btn"
          onClick={handlerChangePasswordSubmit}
        >
          เปลี่ยนรหัสผ่าน
        </button>
      </form>
    </div>
  )
}

export default EditPassword
