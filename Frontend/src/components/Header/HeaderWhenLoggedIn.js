import React from 'react';
import HeaderButton from './HeaderButton';
import logo from '../../assets/images/baselogo.png'

const HeaderWhenLoggedIn = () => {

  const handleLogOut = () => {
    console.log('remove token');
  }
  
  return(
    <div className="flex flex-jc-flex-end"><div className="logoImg"><img src={logo} alt="logo"></img></div>
      <div id="header-logged-in-button-box">
        <HeaderButton path="/create" innerText="Create MEME"/>
        <HeaderButton path="/myprofile" innerText="My profile"/>
        <HeaderButton path="/login" innerText="Log out" onClickEvent={handleLogOut}/>
      </div>
    </div>
  )
};

export default HeaderWhenLoggedIn;