import React, { useContext } from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../services/localStorageService'
import { AuthContext } from '../../contexts/AuthContextProvider';
import jwt_decode from "jwt-decode";

function HomeButton(props) {
  const history = useHistory();
  const handleHome = () => history.push("/");

  // if (getToken() !== null) {
  //   try {
  //     const decodedUserData = jwt_decode(getToken());
  //   } catch(err) {
  //     console.log(err)
  //   }
  // };

  return (
      <div className="navbar-header">
        {(!props.isAdmin) && <HomeOutlined className="navbar-header-home" onClick={handleHome}/>}
      </div>
  )
}

export default HomeButton
