import React from "react";
// import { useHistory } from "react-router";
// import { Link } from "react-router-dom";

import Header from "../components/headerBar/Header";
import Login from "../components/loginRegis/Login";
import Register from "../components/loginRegis/Register";

function LoginPage() {
  return (
    <div className="root">
      <Header />

      <div className="content-outside">
        <div className="content-left"></div>

        <div className="content-center-loginPage">
          <Login />

          <Register />
        </div>

        <div className="content-right"></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export default LoginPage;
