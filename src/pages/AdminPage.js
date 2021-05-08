import React, { useContext, useEffect, useState } from "react";
import Header from "../components/headerBar/Header";

import { AuthContext } from "../contexts/AuthContextProvider";
import axios from "../configs/axios";

import ProductList from "../components/adminPage/ProductList";
import BankAccList from "../components/adminPage/BankAccList";
import { getToken } from "../services/localStorageService";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import Modal from "react-modal";

function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    await roleIsAdmin();
  }, []);

  async function roleIsAdmin() {
    try {
      const decodedUserData = await jwt_decode(getToken());
      // console.log(decodedUserData.roleAdmin)
      if (decodedUserData.roleAdmin === "ADMIN") {
        setIsAdmin(true);
      } else {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="root">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      {isAdmin && (
        <div className="content-outside">
          <div className="content-left"></div>

          <div className="content-center-admin">
            <ProductList />
            <BankAccList />
          </div>

          <div className="content-right"></div>
        </div>
      )}

      <div className="footer"></div>
    </div>
  );
}

export default AdminPage;
