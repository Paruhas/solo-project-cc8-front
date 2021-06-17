import React from 'react'

import HeaderRight from './HeaderRight';
import HomeButton from './HomeButton';

function Header(props) {

  return (
    <div className="navbar-outside">
      <div className="navbar-container">
        <HomeButton isAdmin={props.isAdmin} setIsAdmin={props.setIsAdmin}/>
        <HeaderRight isAdmin={props.isAdmin} setIsAdmin={props.setIsAdmin}/>
      </div>
    </div>
  )
}

export default Header
