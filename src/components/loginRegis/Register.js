import React, { useContext, useState } from 'react'
import axios from '../../configs/axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { setToken } from '../../services/localStorageService';
import { EyeOutlined , EyeInvisibleOutlined } from "@ant-design/icons"

function Register() {
  const [inputRegis, setInputRegis] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errorRegis, setErrorRegis] = useState({});

  const { setIsAuthenticated } = useContext(AuthContext);

  const history = useHistory();

  const handlerInputRegisChange = (e) => {
    const { name, value } = e.target
    setInputRegis( (prev) => (
        { ...prev, [name]:value }
      )
    );
  };

  const handlerSubmitRegis = async (e) => {
    try {
      e.preventDefault();

      if (!inputRegis.email) return setErrorRegis(prev => ({ ...prev, err: "email is required"})) 
      if (!inputRegis.password) return setErrorRegis(prev => ({ ...prev, err: "password is required"})); 
      if (!inputRegis.confirmPassword) return setErrorRegis(prev => ({ ...prev, err: "confirmPassword is required"}));

      const regisRes = await axios.post('/register', {
        email: inputRegis.email,
        password: inputRegis.password,
        confirmPassword: inputRegis.confirmPassword
      });
      setToken(regisRes.data.token);
      setIsAuthenticated(true);
      history.push("/");
    } catch(err) {
      console.log(err);
      console.log(err.response)
      if (err.response) {
        setErrorRegis((prev) => ({ ...prev, err: err.response.data.message}));
      };
    }
  };

  const [changeTextType, setChangeTextType ] = useState({
    password: "password",
    confirmPassword: "password"
  });

  const handlerChangeTextTypePassword = (e) => {
    e.preventDefault();
    (changeTextType.password === "password") ?
    setChangeTextType( prev => ({ ...prev, password:"text"})) : 
    setChangeTextType( prev => ({ ...prev, password:"password"}));
  };

  const handlerChangeTextTypeConfirmPassword = (e) => {
    e.preventDefault();
    (changeTextType.confirmPassword === "password") ?
    setChangeTextType( prev => ({ ...prev, confirmPassword:"text"})) : 
    setChangeTextType( prev => ({ ...prev, confirmPassword:"password"}));
  };
  
  return (
    <div className="content-center-loginPage-form-div-outside">
      <form className="content-center-loginPage-form-div">
        <h2 className="loginPage-form-div-header-text">
          สมัครสมาชิก
        </h2>
        <hr className="loginPage-form-div-hr"/>
        <label htmlFor="register-email" className="loginPage-form-div-label-text">
          <h4>
            Email
          </h4>
        </label>
        <input type="text" id="register-email" className="loginPage-form-div-input" 
          name="email" value={inputRegis.email} onChange={handlerInputRegisChange} 
        /> 
        <label htmlFor="register-password" className="loginPage-form-div-label-text">
          <h4>
            Password
          </h4>
        </label>
        <input type={changeTextType.password} id="register-password"  className="loginPage-form-div-input" 
          name="password" value={inputRegis.password} onChange={handlerInputRegisChange}
        />
        {!(inputRegis.password === "") && (
          (changeTextType.password === "password") ? 
            <EyeOutlined className="change-input-type-text-password-login"
              onClick={handlerChangeTextTypePassword} /> :
            <EyeInvisibleOutlined className="change-input-type-text-password-login"
              onClick={handlerChangeTextTypePassword} />
          )
        }
        <label htmlFor="register-password-confirm" className="loginPage-form-div-label-text">
          <h4>
            Confirm Password
          </h4>
        </label>
        <input type={changeTextType.confirmPassword} id="register-password-confirm"  className="loginPage-form-div-input" 
          name="confirmPassword" value={inputRegis.confirmPassword} onChange={handlerInputRegisChange}
        />
        {!(inputRegis.confirmPassword === "") && (
          (changeTextType.confirmPassword === "password") ? 
            <EyeOutlined className="change-input-type-text-password-login"
              onClick={handlerChangeTextTypeConfirmPassword} /> :
            <EyeInvisibleOutlined className="change-input-type-text-password-login"
              onClick={handlerChangeTextTypeConfirmPassword} />
          )
        }
        {errorRegis.err && <span className="error-box"><h4>{errorRegis.err}</h4></span>}
        <button type="submit" className="loginPage-form-div-submit-btn" onClick={handlerSubmitRegis}>
          สมัครสมาชิก
        </button>
      </form>
    </div>
  )
}

export default Register
