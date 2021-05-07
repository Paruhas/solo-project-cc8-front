import React, { useContext } from 'react'
import { ShoppingCartOutlined , UserOutlined , LoginOutlined , LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { getToken , removeToken } from '../../services/localStorageService'
import { AuthContext } from '../../contexts/AuthContextProvider';
import jwt_decode from "jwt-decode";

function HeaderRight(props) {
  const { setIsAuthenticated , isAuthenticated} = useContext(AuthContext)
  const { cartItem , setCartItem } = useContext(AuthContext)
  // const { isAdmin , setIsAdmin } = useContext(AuthContext)

  const handlerLogout = (e) => {
    e.preventDefault();
    removeToken("token");
    // removeToken("role");
    setIsAuthenticated(false);
    // setIsAdmin(false);
  };

  return (
    <div>
      <ul className="navbar-right">
          { ((!props.isAdmin) && isAuthenticated) && (
            <li>
              <div className="navbar-right-shopping-cartAndNumber">
                <ShoppingCartOutlined className="navbar-right-shopping-cart"/> 
                <span className="navbar-right-shopping-cart-border" >
                  <p>{cartItem}</p>
                </span>
              </div>
            </li>
          )}
          { ((!props.isAdmin) && isAuthenticated) &&  (
            <li>
              <Link to="/profile" className="navbar-right-user-link-tag">
                <UserOutlined className="navbar-right-user"/>
              </Link>
            </li>
          )}
          {!isAuthenticated && !(window.location.href === "http://localhost:3000/login-regis") &&(
            <li>
              <Link to="/login-regis" className="navbar-right-user-link-tag">
                <LoginOutlined className="navbar-right-user"/>
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/home" onClick={handlerLogout} className="navbar-right-user-link-tag">
                <LogoutOutlined className="navbar-right-user"/>
              </Link>
            </li>
          )}
        </ul>
    </div>
  )
}

export default HeaderRight
