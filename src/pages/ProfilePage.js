import React, { useEffect } from "react";
import axios from "../configs/axios";

import Header from "../components/headerBar/Header";
import EditProfile from "../components/profilePage/EditProfile";
import EditPassword from "../components/profilePage/EditPassword";
import OrderHistoryBox from "../components/orderHistory/OrderHistoryBox";

import { useHistory } from "react-router";
import { getToken } from "../services/localStorageService";
import jwt_decode from "jwt-decode";

function ProfilePage() {
  const history = useHistory();

  useEffect(async () => {
    await roleIsAdmin();
  }, []);

  async function roleIsAdmin() {
    try {
      // ท่า decode หา role
      const decodedUserData = await jwt_decode(getToken());
      // console.log(decodedUserData.roleAdmin);
      if (decodedUserData.roleAdmin === "ADMIN") {
        history.push("/admin");
      }

      // // ท่าแบบ getUser หา role
      // const userRes = await axios.get("user");
      // // console.log(userRes.data.user.roleAdmin);
      // if (userRes.data.user.roleAdmin === "ADMIN") {
      //   history.push("/admin");
      // }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="root">
      <Header />

      <div className="content-outside">
        <div className="content-left"></div>

        <div className="content-center-profile">
          <div className="content-center-profile-editBox">
            <EditProfile />
            <EditPassword />
          </div>

          <div className="content-center-profile-historyBox">
            <div className="content-center-profile-historyBox-inside">
              <h2>ประวัติการทำรายการ</h2>
              <hr className="loginPage-form-div-hr" />

              <OrderHistoryBox />
            </div>
          </div>
        </div>

        <div className="content-right"></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default ProfilePage;
