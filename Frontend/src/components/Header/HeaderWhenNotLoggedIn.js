import React from 'react';
import HeaderButton from './HeaderButton';
import logo from '../../assets/images/baselogo.png'

const HeaderWhenNotLoggedIn = () => {
  
  return(
    <div className="flex flex-jc-flex-end"><div className="logoImg"><img src={logo} alt="logo"></img></div>
      <div id="header-logged-out-button-box">
        <HeaderButton path="/login" innerText="Log in"/>
        <HeaderButton path="/register" innerText="Sign up"/>
      </div>
    </div>
  )
};

export default HeaderWhenNotLoggedIn;