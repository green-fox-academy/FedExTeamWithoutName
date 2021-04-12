import React from 'react';
import HeaderButton from './HeaderButton';

const HeaderWhenLoggedIn = () => {

  const handleLogOut = () => {
    console.log('remove token');
  }
  
  return(
    <div className="flex flex-jc-flex-end">
      <div id="header-logged-in-button-box">
        <HeaderButton path="/login" innerText="Log out" onClickEvent={handleLogOut}/>
      </div>
    </div>
  )
};

export default HeaderWhenLoggedIn;