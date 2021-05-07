import React, { useEffect, useState } from 'react';
import { getToken } from '../../services/localStorageService';
import jwt_decode from "jwt-decode";

function EditProfile() {
  const [email, setEmail] = useState(" ");

  useEffect(async () => {
    await decodeToken();
  }, []);

  async function decodeToken() {
    try {
      const decodedUserData = await jwt_decode(getToken());
      setEmail(decodedUserData.email);
    } catch(err) {
      console.log("decodedError: " + err)
    }
  };  
  
  return (
    <div className="content-center-profile-editBox-insideBox">
      <h2>Profile</h2>
      <hr className="loginPage-form-div-hr"/>
        <form>
          <label htmlFor="profile-email" >
            <h4>
              {"Email"}
            </h4>
          </label>
        
        <input type="text" id="profile-email" value={email} readOnly={true} className="content-center-profile-editBox-input-withSaveBtn-cantEdit" />
        <button className="content-center-profile-editBox-btn-withSaveBtn" onClick={(e) => e.preventDefault()}>บันทึก</button>
        </form>
    </div>
  )
}

export default EditProfile
