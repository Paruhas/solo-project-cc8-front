import React, { useContext, useEffect, useState } from "react";
import Header from "../components/headerBar/Header";

// import { AuthContext } from "../contexts/AuthContextProvider";
// import axios from "../configs/axios";

import ProductList from "../components/adminPage/ProductList";
import BankAccList from "../components/adminPage/BankAccList";
import ApprovePayment from "../components/adminPage/ApprovePayment";

import { getToken } from "../services/localStorageService";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRes, setLoadingRes] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    await roleIsAdmin();
  }, []);

  async function roleIsAdmin() {
    try {
      // ท่า decode หา role
      const decodedUserData = await jwt_decode(getToken());
      // console.log(decodedUserData.roleAdmin)
      if (decodedUserData.roleAdmin === "ADMIN") {
        setIsAdmin(true);
        setLoadingRes(true);
      } else {
        history.push("/");
      }

      // // ท่าแบบ getUser หา role
      // const userRes = await axios.get("user");
      // // console.log(userRes.data.user.roleAdmin);
      // if (userRes.data.user.roleAdmin === "ADMIN") {
      //   setIsAdmin(true);
      //   setLoadingRes(true);
      // } else {
      //   history.push("/");
      // }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="root">
      {loadingRes && <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}

      <div className="content-outside">
        <div className="content-left"></div>
        {isAdmin && (
          <div className="content-center-admin">
            <ProductList />
            <BankAccList />
            <ApprovePayment />
          </div>
        )}
        <div className="content-right"></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default AdminPage;
