import React, { useContext, useState } from "react";
import axios from "../../configs/axios";
import { useHistory } from "react-router-dom";
import {
  setToken,
  getToken,
  setRole,
} from "../../services/localStorageService";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const { setIsAuthenticated } = useContext(AuthContext);

  const history = useHistory();

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginRes = await axios.post("/login", {
        email: input.email,
        password: input.password,
      });
      setToken(loginRes.data.token);
      // const decodedUserData = jwt_decode(getToken());

      // setRole(decodedUserData.roleAdmin);

      setIsAuthenticated(true);
      // if (decodedUserData.roleAdmin === "ADMIN") {
      //   return history.push("/admin");
      // }
      // history.push("/");

      const checkRole = await axios.get("user");
      if (checkRole.data.user.roleAdmin === "ADMIN") {
        return history.push("/admin");
      }
      history.push("/");
    } catch (err) {
      if (!input.email) {
        setError((prev) => ({ ...prev, err: "email is required" }));
      } else if (!input.password) {
        setError((prev) => ({ ...prev, err: "password is required" }));
      } else if (err.response) {
        setError((prev) => ({ ...prev, err: err.response.data.message }));
      }
    }
  };

  const [changeTextType, setChangeTextType] = useState("password");

  const handlerChangeTextType = (e) => {
    e.preventDefault();
    changeTextType === "password"
      ? setChangeTextType("text")
      : setChangeTextType("password");
  };

  return (
    <div className="content-center-loginPage-form-div-outside">
      <form className="content-center-loginPage-form-div">
        <h2 className="loginPage-form-div-header-text">เข้าสู่ระบบ</h2>
        <hr className="loginPage-form-div-hr" />
        <label htmlFor="login-email" className="loginPage-form-div-label-text">
          <h4>Email/Username</h4>
        </label>
        <input
          type="text"
          id="login-email"
          name="email"
          className="loginPage-form-div-input"
          value={input.email}
          onChange={handlerInputChange}
        />

        <label
          htmlFor="login-password"
          className="loginPage-form-div-label-text"
        >
          <h4>Password</h4>
        </label>
        <input
          type={changeTextType}
          id="login-password"
          name="password"
          className="loginPage-form-div-input"
          value={input.password}
          onChange={handlerInputChange}
        />
        {!(input.password === "") &&
          (changeTextType === "password" ? (
            <EyeOutlined
              className="change-input-type-text-password-login"
              onClick={handlerChangeTextType}
            />
          ) : (
            <EyeInvisibleOutlined
              className="change-input-type-text-password-login"
              onClick={handlerChangeTextType}
            />
          ))}
        {error.err && (
          <span className="error-box">
            <h4>{error.err}</h4>
          </span>
        )}
        <button
          type="submit"
          className="loginPage-form-div-submit-btn"
          onClick={handlerSubmit}
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

export default Login;
